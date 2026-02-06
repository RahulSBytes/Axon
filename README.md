<div align="center">

# 🧠 Axon

### A Multi-Model AI Agent Powered by Cutting-Edge LLMs

**Seamlessly switch between models for coding, creativity, and complex reasoning**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Groq](https://img.shields.io/badge/Groq-Powered-FF6B6B?style=flat-square)](https://groq.com)

[🚀 Live Demo](https://your-app.vercel.app) • [📖 Documentation](#-documentation) • [🐛 Report Bug](https://github.com/yourusername/axon/issues)

</div>

---

## ✨ What is Axon?

Axon is a **full-stack AI chat application** that leverages the power of Groq's ultra-fast LLM inference and Tavily's real-time web search to deliver intelligent, context-aware conversations. Built with modern web technologies, Axon offers a seamless chat experience with advanced features like conversation management, message bookmarking, and export capabilities.

### 🎯 Key Highlights

- ⚡ **Lightning Fast** - Groq-powered inference for near-instant AI responses
- 🌐 **Real-Time Web Search** - Tavily integration for live, accurate information
- 🧠 **Context Memory** - AI remembers your entire conversation history
- 💾 **Persistent Sessions** - MongoDB-backed session management across devices
- 📤 **Advanced Exports** - Save chats as PDFs or code snippets as images
- 🔐 **Secure Authentication** - Google OAuth 2.0 and local email/password auth
- 📱 **Fully Responsive** - Beautiful UI on desktop, tablet, and mobile
- 🎨 **Modern Stack** - React 19, Node.js, Express 5, MongoDB

---

## 🎥 Demo & Screenshots

<div align="center">

### Chat Interface
*Real-time AI conversations with markdown support and syntax highlighting*

### Export Features
*Download conversations as PDFs or save code snippets as beautiful images*

### Mobile Experience
*Responsive design that works flawlessly on all devices*

</div>

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **🤖 Groq-Powered LLM** | Ultra-fast AI responses using Llama 3.3 70B model |
| **🔍 Live Web Search** | Tavily-powered search for real-time, accurate answers |
| **🛠️ AI Tool Calling** | Intelligent function execution for dynamic responses |
| **📄 Export as PDF** | Download entire conversations as formatted PDFs |
| **💻 Code Snippet Export** | Save code blocks as syntax-highlighted images |
| **🧠 Context Memory** | AI remembers your conversation for relevant responses |
| **🔖 Save Messages** | Bookmark important responses to build your knowledge base |
| **📌 Pin Conversations** | Keep important chats at the top for quick access |
| **📚 Chat History** | All conversations saved, searchable, and accessible |
| **🔐 Dual Authentication** | Google OAuth and traditional email/password login |

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Latest React with improved performance
- **React Router 7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering with syntax highlighting
- **html2pdf.js** - PDF export functionality
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Fast, minimalist web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Elegant MongoDB ODM
- **Passport.js** - Authentication middleware
  - Local Strategy (Email/Password)
  - Google OAuth 2.0 Strategy
- **Express Session** - Session management
- **Connect Mongo** - MongoDB session store
- **Bcrypt.js** - Password hashing

### AI & APIs
- **Groq SDK** - LLM inference (Llama 3.3 70B)
- **Tavily API** - Real-time web search

### DevOps & Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

---

## 📁 Project Structure

```
Axon/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layouts/      # Desktop & Mobile layouts
│   │   │   ├── Pages/        # Route components
│   │   │   └── minicomponents/ # Reusable UI components
│   │   ├── contexts/         # React Context (Auth)
│   │   ├── hooks/            # Custom hooks
│   │   ├── routes/           # Route configuration
│   │   ├── utils/            # Helper functions
│   │   └── constants/        # App constants
│   ├── public/               # Static assets
│   └── README.md             # Client documentation
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── llm.js        # Groq SDK setup
│   │   │   └── passport.js   # Auth strategies
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utilities
│   │   └── middlewares.js    # Custom middleware
│   └── README.md             # Server documentation
│
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** instance (Atlas or local)
- **Groq API Key** - [Get one here](https://console.groq.com)
- **Tavily API Key** - [Get one here](https://tavily.com)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/axon.git
cd axon
```

**2. Install dependencies for both client and server**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**3. Set up environment variables**

**Server (`.env` in `server/` directory)**
```env
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/axon
SESSION_SECRET=your-super-secret-key-minimum-32-characters
CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

GROQ_API_KEY=your-groq-api-key
TAVILY_API_KEY=your-tavily-api-key
```

**Client (`.env` in `client/` directory)**
```env
VITE_SERVER_URL=http://localhost:5000
```

**4. Run the application**

Open two terminal windows:

```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

**5. Open your browser**

Navigate to `http://localhost:5173` and start chatting! 🎉

---

## 📚 Documentation

Detailed documentation for each part of the application:

- **[Client Documentation](./client/README.md)** - Frontend setup, architecture, and development
- **[Server Documentation](./server/README.md)** - Backend API, authentication, and deployment

---

## 🌐 Deployment

### Frontend (Vercel)

**1. Connect Repository**
- Go to [Vercel](https://vercel.com)
- Import your GitHub repository
- Select the `client` directory as root

**2. Configure Environment Variables**
```env
VITE_SERVER_URL=https://your-backend.onrender.com
```

**3. Deploy**
- Vercel automatically deploys on push to main branch

### Backend (Render)

**1. Create Web Service**
- Go to [Render](https://render.com)
- Create new Web Service
- Connect your GitHub repository
- Set root directory to `server`

**2. Configure Build & Start**
- Build Command: `npm install`
- Start Command: `npm start`

**3. Set Environment Variables**
```env
NODE_ENV=production
MONGODB_URL=your-mongodb-atlas-connection-string
SESSION_SECRET=your-production-secret
CLIENT_URL=https://your-app.vercel.app
GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/api/auth/google/callback
GROQ_API_KEY=your-groq-api-key
TAVILY_API_KEY=your-tavily-api-key
```

**4. Deploy**
- Render automatically deploys on push to main branch

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://your-backend.onrender.com/api/auth/google/callback` (production)
6. Copy Client ID and Client Secret to your `.env` files

---

## 🔐 Security Features

- ✅ **Bcrypt Password Hashing** - Secure password storage
- ✅ **HTTP-Only Cookies** - Session cookies protected from XSS
- ✅ **CSRF Protection** - SameSite cookie policy
- ✅ **Environment Variables** - Sensitive data kept secure
- ✅ **MongoDB Session Store** - Persistent, scalable sessions
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Input Validation** - Protected against injection attacks

---

## 🎨 Key Features Implementation

### 1. Authentication System
- Dual authentication: Google OAuth 2.0 and Local Strategy
- Secure session management with MongoDB
- Protected routes and middleware
- Persistent login across devices

### 2. AI Conversation Engine
- Groq SDK integration for fast inference
- Context-aware conversations with full history
- Tool calling for web search functionality
- Streaming responses for real-time feel

### 3. Conversation Management
- Create, read, update, delete conversations
- Pin important chats to top
- Search through conversation history
- Bookmark individual messages

### 4. Export Capabilities
- Export entire conversations as formatted PDFs
- Save code snippets as syntax-highlighted images
- Maintain formatting and styling in exports

### 5. Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Optimized for performance

---

## 🐛 Troubleshooting

### Common Issues

**Session not persisting after login**
- Check that `trust proxy` is set to `1` in server
- Verify cookie settings: `secure: true` and `sameSite: 'none'` in production
- Ensure `withCredentials: true` in frontend Axios config

**CORS errors**
- Verify `CLIENT_URL` matches your frontend URL exactly
- Check `credentials: true` in CORS configuration
- Ensure no trailing slashes in URLs

**Google OAuth not working**
- Verify callback URL matches Google Console exactly
- Check that Google Client ID and Secret are correct
- Ensure authorized redirect URIs are properly set

**MongoDB connection fails**
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure network access is configured

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Groq](https://groq.com/) - For blazing-fast LLM inference
- [Tavily](https://tavily.com/) - For reliable web search API
- [Anthropic](https://anthropic.com/) - For AI inspiration
- [Vercel](https://vercel.com/) - For seamless frontend hosting
- [Render](https://render.com/) - For reliable backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For cloud database

---

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 20+
- **API Endpoints**: 15+
- **Tech Stack**: 15+ technologies
- **Development Time**: [Your timeline]

---

## 🗺️ Roadmap

- [ ] Voice input/output for conversations
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Conversation sharing via public links
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] File upload support for context
- [ ] Custom AI model selection
- [ ] Team collaboration features
- [ ] API rate limiting

---

## 💡 Why Axon?

Axon represents the intersection of **cutting-edge AI**, **modern web development**, and **user-centric design**. Built from the ground up with performance and scalability in mind, Axon showcases:

- Full-stack development expertise
- Modern JavaScript/React patterns
- Secure authentication implementation
- RESTful API design
- Database modeling and optimization
- Cloud deployment and DevOps
- AI/ML integration capabilities

Perfect for demonstrating technical skills to recruiters and potential employers! 🚀

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Made with ❤️ and ☕ by [Your Name]**

[⬆ Back to Top](#-axon)

</div>