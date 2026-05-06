import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#03060b",
        carbon: "#080d14",
        steel: "#b8c1d1",
        silver: "#eef3fb",
        pulse: "#00a3ff"
      },
      boxShadow: {
        glow: "0 0 38px rgba(0, 163, 255, 0.22)",
        "glow-lg": "0 0 90px rgba(0, 163, 255, 0.28)",
        soft: "0 18px 60px rgba(0, 0, 0, 0.24)",
        "soft-lg": "0 32px 100px rgba(0, 0, 0, 0.34)"
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at center, rgba(0, 163, 255, 0.22), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;
