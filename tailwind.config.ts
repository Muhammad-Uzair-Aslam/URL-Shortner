import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fade458: "fade458 1s linear infinite",
      },
      keyframes: {
        fade458: {
          from: { opacity: "1" },
          to: { opacity: "0.25" },
        },
      },
      colors: {
        primary: '#1E1E2F',
        secondary: '#2C2C3A',
        accent: '#6C63FF',
        success: '#4CAF50',
        warning: '#FFC107',
        danger: '#F44336',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #144EE3, #EB568E, #A353AA, #144EE3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
