import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        atelier: {
          ink: "#121111",
          paper: "#f7f1eb",
          pearl: "#fbfaf7",
          mist: "#ece7df",
          wine: "#6b243d",
          sage: "#7b907c",
          cobalt: "#3f5f8f",
          gold: "#b4925b",
          smoke: "#242323"
        }
      },
      fontFamily: {
        serif: ["Sora", "sans-serif"],
        sans: ["Sora", "sans-serif"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      boxShadow: {
        aura: "0 18px 50px rgba(18, 17, 17, 0.09)",
        glass: "0 10px 28px rgba(18, 17, 17, 0.06)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" }
        },
        reveal: {
          "0%": { opacity: "0", filter: "blur(18px)", transform: "translateY(16px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        reveal: "reveal 700ms cubic-bezier(.2,.8,.2,1) both"
      }
    }
  },
  plugins: [animate]
};

export default config;
