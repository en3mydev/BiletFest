/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#486fcb",
          secondary: "#8da8e7",
          accent: "#5d85e5",
          neutral: "#141e38",
          "base-100": "#f4f6fb",
        },
      },
    ],
  },
};
