/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        
        'accent':'#D96E6E',
        'primary':'#EDEEEF',
        'secondary' : '#F7FCFE',
        'muted' : '#3F3F3F',
        'textcolor': '#E5E5E5'
      }
    },
  },
  plugins: [],
}