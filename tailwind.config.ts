import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          500: '#111111',
        },
        'brand-blue': {
          DEFAULT: '#185FA5',
          tint: '#E6F1FB',
          border: '#85B7EB',
          dark: '#042C53',
          // Dark-mode equivalents: desaturated/darkened tint+border so
          // cards read as intentional "tinted dark surfaces" rather than
          // washed-out pastels, plus a light-on-dark text shade.
          'tint-dark': '#12233A',
          'border-dark': '#3E6E9E',
          'dark-text': '#BEDCF7',
        },
        'brand-teal': {
          DEFAULT: '#0F6E56',
          tint: '#E1F5EE',
          border: '#5DCAA5',
          dark: '#04342C',
          'tint-dark': '#0E2620',
          'border-dark': '#3C8770',
          'dark-text': '#B7E4D3',
        },
        'brand-amber': {
          DEFAULT: '#854F0B',
          tint: '#FAEEDA',
          border: '#EF9F27',
          dark: '#412402',
          'tint-dark': '#2C2011',
          'border-dark': '#9C6A24',
          'dark-text': '#F0CE94',
        },
        'brand-coral': {
          DEFAULT: '#993C1D',
          tint: '#FAECE7',
          border: '#F0997B',
          dark: '#4A1B0C',
          'tint-dark': '#301A12',
          'border-dark': '#B36B4C',
          'dark-text': '#F5C0A8',
        },
        gray: {
          50: '#F8F8F7',
          100: '#F0F0EE',
          200: '#E2E2DF',
          300: '#CBCBC7',
          400: '#A8A8A3',
          500: '#7A7A75',
          600: '#56564F',
          700: '#3D3D37',
          800: '#272721',
          900: '#161610',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
