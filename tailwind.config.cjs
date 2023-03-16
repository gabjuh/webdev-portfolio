/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'lg': '1100px',
      'md': '860px',
      'sm': '450px',
    },
  },
  plugins: [require("daisyui")],
}
