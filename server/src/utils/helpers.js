export const areIdsEqual = (id1, id2) => id1?.toString() === id2?.toString();

// export async function LLM(prompt) {
//   return {
//     id: "chatcmpl-7dea8b27-1fd8-4286-866b-2421ed085474",
//     object: "chat.completion",
//     created: 1768797848,
//     model: "llama-3.1-8b-instant",
//     choices: [
//       {
//         index: 0,
//         message: {
//           role: "assistant",
//           content: "India has a total of 28 states and 8 union territories.",
//         },
//         logprobs: null,
//         finish_reason: "stop",
//       },
//     ],
//     usage: {
//       queue_time: 0.05626711,
//       prompt_tokens: 321,
//       prompt_time: 0.05329521,
//       completion_tokens: 77,
//       completion_time: 0.146268732,
//       total_tokens: 398,
//       total_time: 0.199563942,
//     },
//     usage_breakdown: null,
//     system_fingerprint: "fp_4387d3edbb",
//     x_groq: { id: "req_01kfa92gf9fvvvz8gq09w31w55", seed: 1588795942 },
//     service_tier: "on_demand",
//   };
// }




export function modifyMessage(response) {
  return {
    role: "assistant",
    text: response.choices[0].message.content,
    isSaved: false,
    metadata: {
      model: response.model,
      latency_ms: response.usage.total_time,
    },
  };
}
