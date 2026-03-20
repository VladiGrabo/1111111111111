/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d5',
          300: '#f4aab3',
          400: '#ed758a',
          500: '#e14a64',
          600: '#cc2644',
          700: '#ab1d37',
          800: '#8f1a32',
          900: '#7a1a2e',
          950: '#430b15',
        },
      },
    },
  },
  plugins: [],
};