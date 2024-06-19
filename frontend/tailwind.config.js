import tailwindScrollbar from 'tailwind-scrollbar';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: ['active'],
      fontSize:{
        '2.5xl':'1.63rem',
        '2.6xl':'1.64rem',
      },
      fontFamily: {
        ballubhai: ['Ballubhai', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      borderWidth: {
        '1':'1px',
        '2':'2px',
        '3': '3px',
        '4':'4px',
        '5': '5px',
        '6': '6px',
      }
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}

