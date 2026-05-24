/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        bg: {
          900: "#0a0a0f",
          800: "#0f0f1a",
          700: "#141420",
          600: "#1a1a2e",
          500: "#1e1e35",
        },
        accent: {
          purple: "#7c3aed",
          violet: "#8b5cf6",
          indigo: "#6366f1",
          cyan: "#06b6d4",
          glow: "rgba(124,58,237,0.4)",
        },
        surface: {
          DEFAULT: "#16162a",
          hover: "#1e1e38",
          border: "rgba(255,255,255,0.06)",
          "border-hover": "rgba(124,58,237,0.5)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-purple":
          "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)",
        "mesh-cyan":
          "radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.08) 0%, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)",
        "glow-sm": "0 0 10px rgba(124,58,237,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(124,58,237,0.2)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(124,58,237,0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(124,58,237,0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
