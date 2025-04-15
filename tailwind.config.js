// tailwind.config.js
export default {
  darkMode: 'class', // 👈 Usa clases para el dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1', // Ej: indigo-500
          dark: '#a855f7',  // Ej: purple-500 (para dark mode)
        },
      },
    },
  },
  plugins: [],
}