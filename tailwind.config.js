/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {
   colors: {
    'trade-rise': '#c84a31',
    'trade-fall': '#1261c4',
    'trade-even': '#333333',
   },
  },
 },
 plugins: [],
}
