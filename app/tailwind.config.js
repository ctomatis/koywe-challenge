import { heroui } from "@heroui/theme"

const { addDynamicIconSelectors } = require('@iconify/tailwind')


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [addDynamicIconSelectors(),
  heroui(
    {
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#6FEE8D',
              foreground: '#FFFFFF',
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: '#006252',
              foreground: '#FFFFFF',
            }
          },
        },
      },
    }
  )],
}

module.exports = config;