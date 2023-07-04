/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        gloock: ["Gloock"],
      },
      colors: {
        color1: "#1D1515",
        color2: "#3E3E38",
        color3: "#8A8A7D",
        color4: "#EDE5E0",
      },
    },
  },
  plugins: [],
};
