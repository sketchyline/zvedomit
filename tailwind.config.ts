import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#000000",
        surface: "#F5F5F5",
        "accent-teal": "#EBFFFE",
        "accent-green": "#EBFFF4",
        "accent-gold": "#EAB843",
        muted: "#3C3C3C",
      },
      fontFamily: {
        sans: ["var(--font-gabarito)", "sans-serif"],
        gabarito: ["var(--font-gabarito)", "sans-serif"],
      },
      fontSize: {
        "h1-mobile": ["4.75rem", { lineHeight: "3.75rem", fontWeight: "500" }],
        h1: ["clamp(2.5rem, 5.5vw, 6.5rem)", { lineHeight: "0.9", fontWeight: "500" }],
        h2: ["clamp(2.5rem, 5.5vw, 6rem)", { lineHeight: "1", fontWeight: "500" }],
        h3: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", fontWeight: "400" }],
        body: ["1.125rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        card: "19px",
        image: "45px",
      },
      boxShadow: {
        bubble: "0 4px 13px 0 rgba(0,0,0,0.1)",
      },
      keyframes: {
        "bubble-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
      animation: {
        "bubble-in": "bubble-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      screens: {
        tall: { raw: "(min-height: 850px)" },
      },
    },
  },
  plugins: [],
};
export default config;
