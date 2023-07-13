/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        gloock: ["Gloock"],
        roboto: ["Roboto"],
      },
      colors: {
        color1: "#1D1515",
        color2: "#3E3E38",
        color3: "#8A8A7D",
        color4: "#EDE5E0",
        color5: "#E1E2E4",
        color6: "#313131",
        color7: "#9F9F9F",
        color8: "#381E72",
        color9: "#F0DCB5",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
