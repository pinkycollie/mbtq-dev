/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: { 
          DEFAULT: "#e60088", 
          50: "#fff0f8",
          100: "#ffeaf4", 
          600: "#e60088", 
          700: "#c20072" 
        },
        blue: { 
          50: "#e7f0ff", 
          700: "#0050b7",
          800: "#003d8f"
        },
        pink: {
          50: "#fdf2f8",
          200: "#fbcfe8",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9f1239",
          900: "#831843"
        },
        yellow: {
          100: "#fef3c7"
        }
      },
      fontFamily: {
        mbtq: ["Inter", "Arial Rounded MT Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
