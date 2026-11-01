/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#05060f',
          deep: '#0a0e27',
          panel: '#10162e',
          accent: '#7c3aed',
          glow: '#22d3ee',
          gold: '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'star-field': 'radial-gradient(ellipse at top, #1e1b4b 0%, #05060f 60%)',
      },
    },
  },
  plugins: [],
}