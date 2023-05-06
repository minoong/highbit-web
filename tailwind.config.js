/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {
   colors: {
    'trade-primary': '#1261c4',
    'trade-secondary': '#c84a31',
    'trade-rise': '#c84a31',
    'trade-fall': '#1261c4',
    'trade-even': '#333333',
    'trade-btn-primary': '#1261c4',
    'trade-btn-secondary': '#0c3887',
    'trade-btn-tertiary': '#0062df',
    'trade-btn-quinary': '#95959e',
   },
  },
 },
 safelist: [
  {
   pattern: /bg-(red|green|blue|orange)-(100|500|700)/, // You can display all the colors that you need
   variants: ['lg', 'hover', 'focus', 'lg:hover'], // Optional
  },
  {
   pattern: /.*-trade-.*/,
  },
  {
   pattern: /border-transparent/,
  },
 ],
 plugins: [],
}
