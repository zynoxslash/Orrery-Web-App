import { nextui } from "@nextui-org/react"

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ], // remove unused styles in production
  darkMode: ['media', 'class'], // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    nextui({
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
    }),
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("@tailwindcss/typography")
  ],
}
