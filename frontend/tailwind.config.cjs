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

        surface: "#EDE0F0",      
        surfaceLow: "#E8D9EC",   

        
        outline: "#B9AFC0",      

        
        error: "#BA1A1A",

        
        onBackground: "#1A171D",
        onSurface: "#1A171D",
      },
    },
  },
  plugins: [],
};
