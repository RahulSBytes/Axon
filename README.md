# Axon: Think Faster. Create Smarter.

[![Axon Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Axon+AI+Chat+Demo)](https://example.com/demo)  
*Your AI-powered assistant for instant answers, creative ideas, and intelligent conversations. Built from scratch in just 8 days while learning GenAI — and still evolving!*

---

## 🚀 Quick Overview

Axon is a modern, full-stack AI chat application that reimagines conversational AI with seamless GenAI integrations. Inspired by my hands-on journey into Large Language Models (LLMs), tool calling, and production-grade app development, Axon combines rapid prototyping with thoughtful features for developers, creators, and everyday users.

- **Built in**: 8 days (and counting) as a learning project in GenAI, full-stack MERN, and LLM integrations.
- **Status**: Actively in development — deployment imminent!
- **Why impactful?** Goes beyond basics: Real-time web search augmentation, multi-model support, voice synthesis, and modular code that scales.

Whether you're brainstorming code, querying the web, or exporting snippets — Axon accelerates your workflow.

---

## ✨ Key Features

Axon packs advanced capabilities into a responsive, intuitive interface. Here's what makes it stand out:

- **Intelligent Conversations**:
  - Persistent chat history with pin/favorite chats and save specific messages.
  - Multiple LLM model selection (e.g., switch between GPT-like models on-the-fly).
  - Real-time streaming responses for fluid UX.

- **GenAI Superpowers**:
  - **Web search tool calling**: Augment responses with live RAG-style web data.
  - Syntax-highlighted code blocks (via Prism.js & react-syntax-highlighter) with one-click copy.
  - Generate & export clean code snippets directly from AI outputs.

- **Accessibility & Polish**:
  - **Read-aloud** feature: Speed control + multiple voice options for immersive listening.
  - Dark/light theme toggler with local persistence.
  - Fully responsive: Optimized for desktop, tablet, and mobile.

- **Security & Usability**:
  - Robust authentication (local + Google OAuth via Passport.js).
  - Modular, clean architecture for easy extension.
  - PDF export for full chat sessions (html2pdf.js).

Future roadmap: Voice input, advanced prompting UI, more tool integrations (e.g., image gen), and API endpoints for external use.

---

## 🛠 Tech Stack

Axon leverages a modern, battle-tested stack for performance and maintainability. Client and server are separated for scalability.

| Component | Frontend (Client) | Backend (Server) |
|-----------|-------------------|------------------|
| **Framework** | React 19 + React Router DOM 7 | Express 5 |
| **Styling/UI** | Tailwind CSS + Lucide React icons + Tailwind Scrollbar | - |
| **State/Data** | Axios 1.13 + Moment 2.30 | Mongoose 8.18 + Connect-Mongo |
| **Auth/Security** | - | Passport 0.7 (Local + Google OAuth 2.0) + BcryptJS 3.0 + Express Session 1.18 + Cookie Parser 1.4 |
| **Markdown/Code** | React Markdown 10.1 + Remark GFM 4.0 + React Syntax Highlighter 16.1 + PrismJS 1.30 | - |
| **Utils/Other** | HTML2PDF.js 0.14 + CORS 2.8.5 | Axios 1.13 + CORS 2.8.6 + Dotenv 17.2 |

- **Database**: MongoDB (via Mongoose for schema flexibility).
- **Deployment Ready**: Structured for easy Vercel/Netlify (client) + Heroku/Render (server) deploys.
- **Dev Tools**: Modular code promotes testability and rapid iteration.

---

## 📸 Screenshots

*(Add your actual images here for visual impact!)*

| Dark Mode Chat | Code Snippet Export | Read-Aloud Controls |
|---------------|---------------------|---------------------|
| ![Dark Chat](https://via.placeholder.com/300x200/1F2937/FFFFFF?text=Dark+Mode+Chat) | ![Code Export](https://via.placeholder.com/300x200/0F766E/FFFFFF?text=Code+Snippet) | ![Voice](https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Read-Aloud) |

| Web Search Tool | Mobile Responsive | Model Selector |
|-----------------|-------------------|---------------|
| ![Web Search](https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Web+Search) | ![Mobile](https://via.placeholder.com/300x200/059669/FFFFFF?text=Mobile+View) | ![Models](https://via.placeholder.com/300x200/EAB308/000000?text=Model+Switch) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm/yarn.
- MongoDB instance (local or Atlas).
- Google OAuth credentials (for auth).

### Setup (Client: `/axon/client`)
1. `cd client`
2. `npm install`
3. `npm start` (runs on http://localhost:3000)

### Setup (Server: `/axon/server`)
1. `cd server`
2. `cp .env.example .env` (add your Mongo URI, Google OAuth keys).
3. `npm install`
4. `npm start` (runs on http://localhost:5000)

### Full Run
- Start server first.
- Client auto-proxies to server via Axios.
- Test auth: Visit `/auth/google` or use local login.

For production: Add env vars for API keys (e.g., OpenAI/Groq for LLMs).

---

## 🤝 Contributing

Axon is my passion project for GenAI learning — contributions welcome!  
1. Fork & clone.
2. Create a feature branch (`git checkout -b feature/amazing-tool`).
3. Commit changes (`git commit -m "Add web search tool"`).
4. Push & open a PR.

Feedback? Issues? Hit me up — let's build smarter together!

---

## 📄 License

MIT License — Free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

## 🙌 Acknowledgments

- Built while accelerating my GenAI skills: Prompt engineering, tool calling, voice APIs.
- Shoutout to React, Express, and the open-source community for making this possible.
- **Connect**: Let's chat about AI projects! [LinkedIn](https://https://www.linkedin.com/in/thedevrahul/) | [GitHub](https://github.com/RahulSBytes/Axon)

*Think Faster. Create Smarter. — Axon*  
*Version 0.1.0 | Last Updated: Jan 2026*

---

> **Pro Tip**: Star the repo if this sparks ideas! 🌟 What's your next AI build?