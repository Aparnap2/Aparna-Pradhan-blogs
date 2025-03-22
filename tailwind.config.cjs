/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        luxurious: ['"Luxurious Roman"', 'serif'], // Add Luxurious Roman font
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
