# Axon Client

[![Axon Client Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Axon+Client+Frontend)](https://example.com/demo)  
*Frontend for Axon: Your AI-powered assistant for instant answers, creative ideas, and intelligent conversations. Built in React 19 as part of my GenAI learning journey.*

---

## 🚀 Overview

This is the client-side (frontend) of **Axon**, a full-stack AI chat app. It handles the user interface, real-time interactions, and GenAI features like streaming responses and tool calling. Built rapidly in 8 days while learning LLMs, it's designed for responsiveness and modularity.

- **Tagline**: "Think Faster. Create Smarter."
- **Focus**: Seamless UX with markdown rendering, code highlighting, and voice features.
- **Status**: In active development — deployment soon!

---

## ✨ Key Frontend Features

- **Chat Interface**: Persistent history, pin chats, save messages.
- **GenAI Integrations**: Multi-model selector, web search tool calling (RAG-style), streaming responses.
- **Code Handling**: Syntax highlighting (Prism.js), copy buttons, export snippets.
- **Accessibility**: Read-aloud with speed/voice controls, theme toggler (dark/light).
- **Responsive Design**: Works flawlessly on mobile and desktop.
- **Other Polish**: PDF exports (html2pdf.js), smooth routing (React Router).

---

## 🛠 Tech Stack

- **Core**: React 19, React DOM 19.
- **Routing**: React Router DOM 7.12.
- **Styling**: Tailwind CSS, Lucide React icons, Tailwind Scrollbar.
- **Markdown/Code**: React Markdown 10.1, Remark GFM 4.0, React Syntax Highlighter 16.1, PrismJS 1.30.
- **API/Utils**: Axios 1.13, CORS 2.8, Moment 2.30, HTML2PDF.js 0.14.
- **Dev Setup**: Modular components for easy extension and testing.

---

## 📸 Screenshots

*(Replace with actual images!)*

| Chat UI (Dark) | Code Block | Read-Aloud |
|---------------|------------|------------|
| ![Dark Chat](https://via.placeholder.com/300x200/1F2937/FFFFFF?text=Dark+Mode+Chat) | ![Code](https://via.placeholder.com/300x200/0F766E/FFFFFF?text=Code+Highlight) | ![Voice](https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Read-Aloud) |

| Mobile View | Model Selector |
|-------------|----------------|
| ![Mobile](https://via.placeholder.com/300x200/059669/FFFFFF?text=Mobile+View) | ![Models](https://via.placeholder.com/300x200/EAB308/000000?text=Model+Switch) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+.
- Running backend (see /axon/server README).

### Installation
1. `cd /axon/client`
2. `npm install`
3. `npm start` (localhost:3000)

### Build for Production
`npm run build` — Outputs to `/build` for static hosting (e.g., Vercel/Netlify).

---

## 🤝 Contributing

Fork, branch, PR! Focus on UX enhancements or new GenAI tools.

---

## 📄 License

MIT — See [LICENSE](../LICENSE).

---

## 🙌 Acknowledgments

Part of my GenAI deep dive. Connect: [LinkedIn](https://linkedin.com/in/yourprofile) | [GitHub](https://github.com/yourusername/axon)

*Version 0.1.0 | Jan 2026*

---
