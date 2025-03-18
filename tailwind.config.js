/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,hbs}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
      },
      scrollBehavior: {
        smooth: "smooth", // Enables smooth scrolling
      },
    },
  },
  plugins: [],
}