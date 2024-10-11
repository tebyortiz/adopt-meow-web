const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Flex", "sans-serif"],
        hind: ["Hind Siliguri", "sans-serif"],
        fredoka: ["Fredoka", "sans-serif"],
        assistant: ["Assistant", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwind-scrollbar-hide")
  ],
};
