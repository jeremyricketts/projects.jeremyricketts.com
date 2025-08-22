/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pc-blue': {
          50: '#E8E9F3',
          100: '#B5BADB',
          200: '#8B93C5',
          300: '#6B76B3',
          400: '#4E5CA6',
          500: '#3B4A9F',
          600: '#4563D7',
          700: '#232D5F',
          800: '#1A2140',
          900: '#0F1320',
        },
        'pc-bg': '#F5F5F7',
        'pc-header': '#BFC5E6',
      },
      fontSize: {
        '2xs': '0.6875rem', // 11px
      },
    },
  },
  plugins: [],
}