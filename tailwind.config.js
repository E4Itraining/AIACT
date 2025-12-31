/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'erythix': {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#7c9afa',
          500: '#5a75f4',
          600: '#4354e8',
          700: '#3543d5',
          800: '#2d38ac',
          900: '#2a3488',
        }
      }
    },
  },
  plugins: [],
}
