/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        googleBlue: "#1a73e8",
        softBlue: "#e8f0fe",
      },
    },
  },
  plugins: [],
};
