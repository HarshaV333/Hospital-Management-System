/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppinsm500: ['Poppins', 'sans-serif'],
        poppinsr400: ['Poppins', 'serif']
      },
      colors: {
        skyBlue: "#78C0E0",
        celestialBlue: "#449DD1",
        navyBlue: "#150578",
        federalBlue: "#0E0E52",
        violetBlue: "#3943B7",
      }
    },
  },
  plugins: [],
};
