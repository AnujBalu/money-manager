

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#e63946', // Name it something descriptive, like 'customRed'
      },
      // keyframes:{
      //   moves:{
      //     "0%" :{transform : "translateY(-100%)"},
      //     "50%":{transform : "translateY(-50%"},
      //     "100%":{transform : "translateY(0%"},
      //   }
      // },
      // animation:{
      //     moves:"moves 2s linear"
      // },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
