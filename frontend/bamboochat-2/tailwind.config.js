import dasyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: '#FF6961',
        bamboo: '#A0C878',
        oldBamboo: '#DDEB9D',
        paper: "#EAE4D5",
        textbox: '#B6B09F',
        milk: '#FFFDF6'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    dasyui
  ],
}

