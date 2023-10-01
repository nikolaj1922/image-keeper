/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}', './_pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        100: '100',
        120: '120',
        130: '130'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
}
