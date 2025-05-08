/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a8d5ba', // Verde oliva pastello STARESANO
        dark: '#355e3b',     // Verde scuro di contrasto
      },
    },
  },
  plugins: [],
};
