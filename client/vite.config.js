// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'bundle-analysis.html',
      gzipSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }

          // Router
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }

          // Icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }

          // HTTP
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }

          // Toast
          if (id.includes('node_modules/react-hot-toast')) {
            return 'toast';
          }

          // Markdown related
          if (id.includes('node_modules/react-markdown') || 
              id.includes('node_modules/remark') ||
              id.includes('node_modules/unified') ||
              id.includes('node_modules/mdast') ||
              id.includes('node_modules/micromark') ||
              id.includes('node_modules/hast')) {
            return 'markdown';
          }

          // Syntax highlighter
          if (id.includes('node_modules/react-syntax-highlighter') ||
              id.includes('node_modules/refractor') ||
              id.includes('node_modules/prismjs')) {
            return 'syntax-highlighter';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});