import { Open_Sans } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['var(--font-opensans)'],
        cib: ['var(--font-cib)']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      maxWidth: {
        '8xl': '1410px'
      },
    },
  },
  plugins: [],
};
