/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2774AE', // UCLA Blue
        primary_darkest: '#003B5C', // UCLA Darkest Blue
        primary_darker: '#005587', // UCLA Darker Blue
        primary_lighter: '#8BB8E8', // UCLA Lighter Blue
        primary_lightest: '#DAEBFE', // UCLA Lightest Blue
        secondary: '#FFD100', // UCLA Gold
        secondary_darkest: '#FFB81C', // UCLA Darkest Gold
        secondary_darker: '#FFC72C', // UCLA Darker Gold
      },
      backgroundImage: {
        students: "url('/assets/images/students-upscaled.jpeg')",
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    }
  },
  plugins: [],
}
