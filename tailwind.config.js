const defaultTheme = require("tailwindcss/defaultTheme"); // Import defaultTheme

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        appPrimary: "#7c3aed", // Your primary purple
        appLight: "#e9d5ff",  // Lighter gradient purple
        appDark: "#4c1d95",   // Darker purple for hover
      },
      fontFamily: {
        primary: ["Fredoka", ...defaultTheme.fontFamily.sans],
        secondary: ["Roboto", ...defaultTheme.fontFamily.sans],
        tertiary: ["Montserrat", ...defaultTheme.fontFamily.sans],
        quaternary: ["Lora", ...defaultTheme.fontFamily.serif],
      },

    },
  },
  plugins: [],
};
