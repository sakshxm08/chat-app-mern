/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundColor: {
        dark: "rgb(31 41 55)",
      },
      colors: {
        primary: {
          50: "#fff4ed",
          100: "#ffe5d4",
          200: "#ffc7a9",
          300: "#ff9f72",
          400: "#fe6c39",
          500: "#fd5526",
          600: "#ee2b08",
          700: "#c51c09",
          800: "#9c1810",
          900: "#7e1710",
          950: "#440706",
        },
      },
    },
  },
  safelist: [
    "text-primary-500",
    "font-medium",
    "text-gray-500",
    "dark:text-gray-300",
  ],
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
