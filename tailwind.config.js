/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  darkMode: "class", // This enables dark mode based on the presence of the "dark" class in the HTML tag
  content: [
    "./components/**/*.{js,vue,ts}",
    // "./layouts/**/*.vue",
    // "./pages/**/*.vue",
    // "./plugins/**/*.{js,ts}",
    // "./app.vue",
    // "./error.vue",
    "./presets/**/*.{js,vue,ts}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1rem",
        xl: "4.5rem",
        "2xl": "7.5rem",
      },
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      base: "18px",
      lg: "24px",
      xl: "32px",
      "2xl": "42px",
      "3xl": "54px",
    },
  },

  plugins: [
    require("tailwindcss-primeui"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "768px",
          },
          "@screen md": {
            maxWidth: "1024px",
          },
          "@screen lg": {
            maxWidth: "1440px",
          },
          "@screen 2xl": {
            maxWidth: "1600px",
          },
        },
      });
    },
  ],
};
