const messages = [
    { role: "system", content: "..." },   // 1. System instructions
    ...conversationHistory,                // 2. Past messages
    { role: "user", content: prompt },     // 3. Current message
];


[
    // system prompt
    { role: "system", content: "Use search_web tool..." },

    //history context
    { role: "user", content: "What is React?" },
    { role: "assistant", content: "React is a JavaScript library..." },
    { role: "user", content: "How do hooks work?" },
    { role: "assistant", content: "Hooks are functions that..." },

    // Current prompt
    { role: "user", content: "Give me an example" },  
]



let response = await axios.post(
      GROQ_URL,
      {
        model: model,
        messages: [
          {
            role: "system",
            content:
              "Use search_web tool for recent events, weather, or unknown information.",
          },
          { role: "user", content: prompt },
        ],
        tools: tools,
        tool_choice: {
          type: "function",
          function: { name: "search_web" }, // Force this specific tool
        },
      },
      { headers },
    );