/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          light: "#9277FF",
          DEFAULT: "#7c5dfa",
        },
        red: {
          light: "#FF9797",
          DEFAULT: "#EC5757",
        },
        gray: {
          DEFAULT: "#888EB0",
        },
        green: {
          light: "#33D69F0F",
          DEFAULT: "#33D69F",
        },
        orange: {
          light: "#FF8F000F",
          DEFAULT: "#FF8F00",
        },
        blue: {
          light: "##373B530F",
          DEFAULT: "##373B53",
        },
        lightBg: "#F8F8FB",
        darkBg: "#141625",
      },
    },
  },
  plugins: [],
};
