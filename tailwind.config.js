/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          light: "#9277FF",
          DEFAULT: "#7c5dfa",
          100: "#DFE3FA",
        },
        red: {
          light: "#FF9797",
          DEFAULT: "#EC5757",
        },
        gray: {
          DEFAULT: "#888EB0",
          light: "#F9FAFE",
          700: "#7E88C3",
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
          light: "#373B530F",
          DEFAULT: "#373B53",
        },
        black: {
          light: "#252945",
          DEFAULT: "#1E2139",
        },
        lightBg: "#F8F8FB",
        darkBg: "#141625",
      },
      spacing: {
        30: "6.438rem",
        27: "108px",
        128: "730px",
        130: "760px",
      },
      boxShadow: {
        "custom-light": "0px 10px 10px -10px rgba(72, 84, 159, 0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
