# Axon Server

[![Axon Server Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Axon+Server+Backend)](https://example.com/demo)  
*Backend for Axon: Powering secure auth, data persistence, and GenAI integrations. Built in Node/Express as part of my GenAI learning journey.*

---

## 🚀 Overview

This is the server-side (backend) of **Axon**, handling API logic, authentication, and database interactions for the AI chat app. Developed in 8 days alongside frontend, focusing on secure, scalable GenAI backend features.

- **Tagline**: "Think Faster. Create Smarter."
- **Focus**: Robust auth, session management, and LLM/tool integrations.
- **Status**: In active development — deployment soon!

---

## ✨ Key Backend Features

- **Authentication**: Local login + Google OAuth (Passport.js).
- **Data Management**: Chat history, pinned/saved items via MongoDB.
- **GenAI Support**: Multi-model handling, web search tool calling endpoints.
- **Security**: Bcrypt hashing, sessions, CORS.
- **API Endpoints**: Modular routes for chats, users, tools.
- **Scalability**: Ready for cloud deploys with env config.

---

## 🛠 Tech Stack

- **Core**: Express 5.2.
- **Auth**: Passport 0.7 (Local 1.0 + Google OAuth 2.0), BcryptJS 3.0, Express Session 1.18, Cookie Parser 1.4.
- **Database**: Mongoose 8.18, Connect-Mongo 6.0.
- **Utils**: Axios 1.13, CORS 2.8, Dotenv 17.2.
- **Dev Setup**: Modular middleware and routes for easy maintenance.

---

## 📸 Screenshots

*(API-focused visuals; replace with actuals like Postman shots!)*

| Auth Flow | DB Schema | API Endpoint |
|-----------|-----------|--------------|
| ![Auth](https://via.placeholder.com/300x200/1F2937/FFFFFF?text=OAuth+Flow) | ![DB](https://via.placeholder.com/300x200/0F766E/FFFFFF?text=Mongo+Schema) | ![API](https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Chat+Endpoint) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+.
- MongoDB (local/Atlas).
- Google OAuth keys.

### Installation
1. `cd /axon/server`
2. `cp .env.example .env` (fill MONGO_URI, GOOGLE_CLIENT_ID, etc.).
3. `npm install`
4. `npm start` (localhost:5000)

### Testing
Use Postman for endpoints like `/api/chats` or `/auth/google`.

---

## 🤝 Contributing

Fork, branch, PR! Suggest auth improvements or new tool APIs.

---

## 📄 License

MIT — See [LICENSE](../LICENSE).

---

## 🙌 Acknowledgments

Part of my GenAI deep dive. Connect: [LinkedIn](https://https://www.linkedin.com/in/thedevrahul/) | [GitHub](https://github.com/RahulSBytes/Axon)

*Version 0.1.0 | Jan 2026*