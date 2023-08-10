/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"], // Fixed closing square bracket here
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "san-serif"],
      Poppins: ["Poppins", "san-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};


