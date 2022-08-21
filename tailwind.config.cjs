/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          800: 'rgba(69, 180, 280, 1)',
          850: 'rgba(69, 180, 280, .5)',
        }
      }
    },
  },
  plugins: [],
}
