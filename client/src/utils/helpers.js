import axios from "axios";
import moment from "moment";

export function formatDateOrTime(date) {
  const m = moment(date);
  return m.isSame(moment(), "day")
    ? m.format("hh:mm a")
    : m.format("DD/MM/YYYY");
}


export const createNewChat = async (e, navigate) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chats`,
                { title: "New Conversation" }
            )
            if (data.success) {
                navigate(`/chat/${data.conversation._id}`)
            }
        } catch (error) {
        }
    }


export function getRandomPrompts(count = 3) {
  const prompts = [
    // Career & LinkedIn
    "Write a LinkedIn post about my new job.",
    "Help me negotiate a better salary.",

    // Coding & Tech
    "What's wrong with this code?",
    "Explain this like I'm 5.",
    "Convert this to TypeScript.",
    "Write unit tests for this function.",

    // AI & Trends
    "What are the latest trends in AI?",
    "Is AI coming for my job?",
    "Explain prompt engineering.",

    // Writing & Content
    "Make this email sound professional.",
    "Write a tweet that goes viral.",
    "Summarize this in 3 bullet points.",

    // Productivity
    "Create a study plan for this topic.",
    "Break this task into smaller steps.",
    "Help me prepare for an interview.",

    // Creative & Fun
    "Give me a startup idea for $100.",
    "Write a joke about programmers.",
    "Suggest a weekend project for me.",
    "Debate both sides of this topic.",
  ];

  const result = new Set();

  while (result.size < count) {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    result.add(prompts[randomIndex]);
  }

  return [...result];
}
