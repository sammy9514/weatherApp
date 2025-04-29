// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // THIS IS REQUIRED FOR MANUAL TOGGLING
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // make sure this matches your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
