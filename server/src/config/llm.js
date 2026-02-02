// config/llm.js
import "dotenv/config";
import { Groq } from "groq-sdk";
import { customError } from "../utils/error.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const TAVILY_URL = "https://api.tavily.com/search";

const TOOL_CALLING_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "qwen/qwen3-32b",
  "openai/gpt-oss-safeguard-20b",
];

const tools = [
  {
    type: "function",
    function: {
      name: "search_web",
      description: "Search the web for current/recent information",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query",
          },
        },
        required: ["query"],
      },
    },
  },
];

// Tavily search function
async function search_web(query) {
  try {
    const response = await fetch(TAVILY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: query,
        max_results: 3,
      }),
    });

    const data = await response.json();

    return data.results.map((r) => ({
      title: r.title,
      content: r.content,
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export async function LLM(
  prompt,
  model,
  conversationHistory = [],
  next,
  isSearch = false,
) {
  try {
    const messages = [
      {
        role: "system",
        content: isSearch
          ? `Your name is Axon. You are a helpful AI assistant.

          TOOL USAGE RULES:
          - Use search_web tool for: current info, weather, news, recent events, real-time data
          - When using tools, ONLY make the tool call - no extra text
          - Never use <function> XML tags
          - Provide final answer only AFTER receiving tool results

          Be accurate, concise, and helpful.`
          : `Your name is Axon. You are a helpful AI assistant.

          Provide accurate, concise, and helpful responses based on your knowledge.
          If asked about real-time data (weather, news, current events), inform the user you don't have access to live information.`,
      },
      ...conversationHistory,
      { role: "user", content: prompt },
    ];

    const useTools = TOOL_CALLING_MODELS.includes(model) && isSearch;

    // First call
    let chatCompletion = await groq.chat.completions.create({
      model: model,
      messages: messages,
      ...(useTools && {
        tools: tools,
        tool_choice: "auto",
      }),
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
    });

    const responseMessage = chatCompletion.choices[0].message;

    if (
      useTools &&
      responseMessage.tool_calls &&
      responseMessage.tool_calls.length > 0
    ) {
      const toolCall = responseMessage.tool_calls[0];
      const functionArgs = JSON.parse(toolCall.function.arguments);

      console.log(
        `🔍 Tool called: ${toolCall.function.name} with query: "${functionArgs.query}"`,
      );

      const searchResults = await search_web(functionArgs.query);

      chatCompletion = await groq.chat.completions.create({
        model: model,
        messages: [
          ...messages,
          responseMessage,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: JSON.stringify(searchResults),
          },
        ],
        temperature: 1,
        max_tokens: 8192,
        top_p: 1,
      });
    }

    return {
      choices: [
        {
          message: {
            content: chatCompletion.choices[0].message.content,
          },
        },
      ],
      model: chatCompletion.model,
      usage: chatCompletion.usage,
    };
  } catch (error) {
    console.error("LLM Error:", error);
    return next(
      new customError(error.message || "Error communicating with LLM", 400),
    );
  }
}
