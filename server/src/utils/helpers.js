export const areIdsEqual = (id1, id2) => id1?.toString() === id2?.toString();


export function formatHistoryForLLM(messages, limit = 10) {
    return messages
        .slice(-limit)
        .map(({ role, text }) => ({
            role,
            content: text
        }));
}

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
