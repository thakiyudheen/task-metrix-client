import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Titillium: ['"Titillium Web"', 'sans-serif'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
        monoko: ["Source Code Pro", 'monospace']
      }
    },
  },
  plugins: [],
} satisfies Config;
