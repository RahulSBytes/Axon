/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        adlam: ['"ADLaM Display"', "cursive"],
      },
      colors: {
        accent: "#D96E6E",
        primary: "#EDEEEF",
        secondary: "#F7FCFE",
        muted: "#3F3F3F",
        textcolor: "#161616",
      },
    },
  },
  plugins: [scrollbar],
};
