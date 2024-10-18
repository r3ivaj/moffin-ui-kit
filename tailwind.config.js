/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        gray: {
          300: "#D1D5DB",
          600: "#6B7280",
        },
        teal: {
          700: "#0E7490",
        },
        slate: {
          900: "#1F2937",
        },
        lightblue: {
          700: "#164E63",
        },
      },
    },
  },
  plugins: [],
};
