/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      BentonSans: ["BentonSans, sans-serif"],
    },
    screens: {
      xs: { max: "425px" },
      sm: { min: "426px" },
      md: { min: "769px" },
      lg: { min: "1440px" },
    },
  },
  plugins: [],
};
