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
      keyframes: {
        moveBackground: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        'moveBackground': 'moveBackground 2s linear infinite',
      },
      backgroundImage: {
        "gradient-glasses":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": 
          "linear-gradient(90deg, #2BAAD9 0%, #83BB3F 100%)",
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
