/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "400px",
      // => @media (min-width: 400px) { ... }

      desktop: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
