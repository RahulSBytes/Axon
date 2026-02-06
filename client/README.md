# Axon Client

React-based frontend for Axon - A multi-model AI agent with advanced conversation management.

## 🚀 Tech Stack

- **React 19.2** - Latest React with improved performance
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client with credentials support

## 📦 Key Dependencies

```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.12.0",
  "axios": "^1.13.2",
  "react-markdown": "^10.1.0",
  "react-syntax-highlighter": "^16.1.0",
  "html2pdf.js": "^0.14.0",
  "lucide-react": "^0.562.0",
  "prismjs": "^1.30.0",
  "moment": "^2.30.1"
}
```

## 🏗️ Project Structure

```
client/
├── public/              # Static assets
│   ├── Logo.png
│   ├── favicon.png
│   └── google.png
│
├── src/
│   ├── components/
│   │   ├── Layouts/         # Desktop/Mobile layouts
│   │   ├── Pages/           # Route components
│   │   └── minicomponents/  # Reusable UI components
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx  # Global auth state
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCopy.js
│   │   ├── useLoadingState.js
│   │   └── useTypingEffect.js
│   │
│   ├── routes/              # Route configuration
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   └── index.jsx
│   │
│   ├── utils/               # Helper functions
│   │   ├── exportPDF.js
│   │   └── helpers.js
│   │
│   ├── constants/
│   │   └── constant.js      # App constants
│   │
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
│
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── vercel.json             # Vercel deployment config
```

## ⚙️ Environment Variables

Create a `.env` file in the client directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

For production (Vercel):
```env
VITE_SERVER_URL=https://your-backend.onrender.com
```

## 🛠️ Installation & Setup

**1. Install dependencies**
```bash
npm install
```

**2. Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**3. Build for production**
```bash
npm run build
```

**4. Preview production build**
```bash
npm run preview
```

## 🎯 Key Features Implementation

### Authentication
- Context-based auth state management (`AuthContext.jsx`)
- Protected and public route wrappers
- Google OAuth integration
- Persistent sessions with cookies

### Chat Interface
- Real-time message streaming
- Markdown rendering with syntax highlighting
- Code snippet export as images
- PDF export of conversations
- Message bookmarking

### Responsive Design
- Mobile-first approach
- Desktop and mobile layouts
- Adaptive sidebar navigation
- Touch-friendly UI components

### Custom Hooks
- `useAuth` - Authentication state management
- `useCopy` - Clipboard operations
- `useLoadingState` - Loading indicators
- `useTypingEffect` - Animated text effects

## 📡 API Integration

All API calls use Axios with credentials enabled:

```javascript
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom scrollbar** with tailwind-scrollbar plugin
- **Lucide React** for icons
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`

## 📤 Deployment (Vercel)

**Automatic deployment:**
1. Connect GitHub repository to Vercel
2. Set environment variable: `VITE_SERVER_URL`
3. Vercel auto-deploys on push to main branch

**Manual deployment:**
```bash
npm run build
vercel --prod
```

### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔧 Development Tips

**Hot Module Replacement**
- Vite enables instant HMR for fast development
- Changes reflect immediately without full reload

**Code Organization**
- Components are organized by feature/type
- Shared logic extracted to custom hooks
- Constants centralized in `constants/`

**Debugging**
- React DevTools for component inspection
- Network tab for API call monitoring
- Console logs for state tracking

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🐛 Common Issues

**Issue: CORS errors**
- Ensure `withCredentials: true` is set in Axios
- Verify `VITE_SERVER_URL` matches your backend URL

**Issue: Session not persisting**
- Check cookie settings in browser DevTools
- Ensure backend has correct CORS configuration

**Issue: Build fails**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

**Built with ⚡ Vite + ⚛️ React**