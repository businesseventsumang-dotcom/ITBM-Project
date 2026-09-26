/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080808",
        foreground: "#f4f4f4",
        luxury: {
          950: "#050505",
          900: "#0b0b0b",
          850: "#121212",
          800: "#1a1a1a",
          700: "#272727",
          600: "#3e3e3e",
          400: "#808080",
          200: "#d1d1d1",
          100: "#ebe8e2",
          50: "#fbfaf8",
        },
        brand: {
          orange: "#FF4500",
          electric: "#FF3B00",
          blue: "#0051FF",
          gold: "#E5B869",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      letterSpacing: {
        widestx: "0.25em",
        ultra: "0.35em",
      },
      animation: {
        "ticker": "ticker 28s linear infinite",
        "ticker-reverse": "ticker-reverse 28s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
}
