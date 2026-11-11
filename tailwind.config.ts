import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        forest: {
          50: "#F3F7F4",
          100: "#E4EDE8",
          700: "#1E4F3E",
          800: "#163B2E",
          900: "#0E2920",
          950: "#071610",
        },
        ivory: {
          50: "#FCFBF8",
          100: "#F6F2E9",
          200: "#EAE2D2",
          300: "#DDD1BA",
        },
        champagne: {
          100: "#FBF6EA",
          200: "#F2E5C6",
          300: "#E6CE97",
          400: "#D4B46E",
          500: "#B89347",
          600: "#8E6B24",
          700: "#6F531B",
        },
        charcoal: {
          400: "#78807A",
          600: "#4F5651",
          700: "#373D39",
          900: "#1A1D1B",
          950: "#111312",
        },
        navy: {
          50: "#F3F7F4",
          500: "#1E4F3E",
          800: "#163B2E",
          900: "#0E2920",
        },
        gold: {
          100: "#FBF6EA",
          300: "#E6CE97",
          400: "#D4B46E",
          500: "#B89347",
          600: "#8E6B24",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
