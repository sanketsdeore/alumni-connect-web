/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F528A",
        primaryContainer: "#E3C8F7", 

        secondary: "#5C4682", 
        secondaryContainer: "#D6C7F1",

        background: "#F6ECF8", 

        surface: "#EDE0F0",      // darker lavender card
        surfaceLow: "#E8D9EC",   // slightly darker footer

        // Border color (slightly deeper MD3 outline)
        outline: "#B9AFC0",      // darker than CCC4CE

        // Error (unchanged, MD3 standard)
        error: "#BA1A1A",

        // Text colors
        onBackground: "#1A171D",
        onSurface: "#1A171D",
      },
    },
  },
  plugins: [],
};
