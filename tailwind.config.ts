import tailwindTypography from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--font-montserrat)", "sans-serif"],
      display: ["var(--font-cubano)", "sans-serif"],
      body: ["var(--font-montserrat)", "sans-serif"],
      code: ["var(--font-space-mono)", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray1: "#f8f8f8",
      gray2: "#dbe1e8",
      gray3: "#b2becd",
      gray4: "#6c7983",
      gray5: "#454e56",
      gray6: "#2a2e35",
      gray7: "#12181b",
      link: "#0000ee",
      blue: colors.blue,
      green: colors.green,
      pink: colors.pink,
      purple: colors.purple,
      orange: colors.orange,
      red: colors.red,
      yellow: colors.yellow,
      inherit: colors.inherit,
    },
    extend: {
      boxShadow: {
        "3xl": "0 5px 20px rgb(0 0 0 / 30%)",
        "4xl": "0 5px 20px rgb(0 0 0 / 90%)",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              "font-weight": "normal",
              "font-size": "2.5rem",
            },
            h2: {
              "font-weight": "normal",
              "font-size": "2rem",
            },
            h3: {
              "font-weight": "normal",
              "font-size": "1.75rem",
            },
            h4: {
              "font-weight": "normal",
              "font-size": "1.5rem",
            },
            h5: {
              "font-weight": "normal",
              "font-size": "1.25rem",
            },
          },
        },
      },
    },
  },
  plugins: [tailwindTypography],
  experimental: { optimizeUniversalDefaults: true },
} satisfies Config;
