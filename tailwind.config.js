/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0c0f',
        panel: '#15171c',
        panel2: '#191b21',
        line: '#292c34',
        acid: '#ccff00',
        muted: '#858a97',
      },
      fontFamily: {
        display: ['Oswald', 'Arial Narrow', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 35px rgba(0,0,0,.22)',
      },
    },
  },
  plugins: [],
};
