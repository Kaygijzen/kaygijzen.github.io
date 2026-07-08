/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          500: '#111111',
        },
        blue: {
          base: '#185FA5',
          tint: '#E6F1FB',
          border: '#85B7EB',
          dark: '#042C53',
        },
        teal: {
          base: '#0F6E56',
          tint: '#E1F5EE',
          border: '#5DCAA5',
          dark: '#04342C',
        },
        amber: {
          base: '#854F0B',
          tint: '#FAEEDA',
          border: '#EF9F27',
          dark: '#412402',
        },
        coral: {
          base: '#993C1D',
          tint: '#FAECE7',
          border: '#F0997B',
          dark: '#4A1B0C',
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
}
