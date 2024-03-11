import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maehongson: ['Maehongson', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-glasses":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-blue": "#2BAAD9",
        "primary-green": "#83BB3F"
      }
    },
  },
  plugins: [],
};
export default config;
