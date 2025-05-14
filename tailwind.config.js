/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#EB542D",
        
        black: {
          DEFAULT: "#000000",
          100: "#2D2D2D",
          200: "#212936",
          300: "#212936",
          400: "#D2D5DA"
        },
      },
    },
  },
  plugins: [],
};
