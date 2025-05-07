module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#7dd3fc',      // verde acqua
        secondary: '#f0fdfa',     // bianco-verde
        dark: '#0f172a'           // quasi nero
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
