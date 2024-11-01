/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#c8e99d", // Light shade of primary color
          DEFAULT: "#8cc63f", // Primary color (default)
          dark: "#6ca422", // Darker shade of primary
        },
        secondary: {
          light: "#4D4D4D", // Light shade of secondary color
          DEFAULT: "#333333", // Secondary color (default)
          dark: "#1A1A1A", // Darker shade of secondary
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
};
