import axios from "axios";
import dotenv from "dotenv";
import { customError } from "../utils/error.js";
dotenv.config();

// const GROQ_URL = process.env.GROQ_URL
// const TAVILY_URL = process.env.TAVILY_URL

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const TAVILY_URL = "https://api.tavily.com/search";
const MODEL_NAME = "llama-3.1-8b-instant";

const headers = {
  Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  "Content-Type": "application/json",
};

// Define the search tool
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
  const response = await axios.post(TAVILY_URL, {
    api_key: process.env.TAVILY_API_KEY,
    query: query,
    max_results: 3,
  });

  return response.data.results.map((r) => ({
    title: r.title,
    content: r.content,
  }));
}

// Main chat function
export async function LLM(prompt, model, conversationHistory = [], next) {
  let message;

  const messages = [
            {
                role: "system",
                content: "Use search_web tool for recent events, weather, or unknown information.",
            },
            ...conversationHistory,
            { role: "user", content: prompt },
        ];

  try {
    let response = await axios.post(
      GROQ_URL,
      {
        model: model,
        messages: messages,
        tools: tools,
        tool_choice: {
          type: "function",
          function: { name: "search_web" },
        },
      },
      { headers },
    );

    message = response.data.choices[0].message;

    // Check if LLM wants to use a tool else return message.content directly
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      const args = JSON.parse(toolCall.function.arguments);

      const searchResults = await search_web(args.query);

      // Second call: Send results back to LLM
      response = await axios.post(
        GROQ_URL,
        {
          model: model,
          messages: [
            { role: "user", content: prompt },
            message,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify(searchResults),
            },
          ],
        },
        { headers },
      );
      message = response.data;
    }
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
    return next(new customError("error on llm side", 503));
  }
  return message;
}
