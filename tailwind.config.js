/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInBottom: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        flash: {
          "25%, 40%": { opacity: "0" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0" },
        },
      },
    },
    fontFamily: {
      BentonSans: ["BentonSans, sans-serif"],
    },
    screens: {
      xs: { max: "425px" },
      sm: { min: "426px" },
      md: { min: "769px" },
      lg: { min: "1440px" },
      xl: { min: "2560px" },
    },
  },
  plugins: [],
};
