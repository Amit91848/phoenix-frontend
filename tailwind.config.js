/** @type {import('tailwindcss').Config} */
const defaultColours = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightGrey': '#444646',
        'darkGrey': '#2C2A2A',
        'loginBlue': '#00446F',
        'lightBlue': '#13C0D7',
        'ongoing': 'hsl(var(--color-ongoing) / 0.16)',
        'profileTint': 'hsl(var(--color-profileTint) / 0.45)',
        'time': '#C973D6',
        'inputGrey': 'rgba(229, 229, 229, 0.66)'
      },
      gridTemplateColumns: {
        'reminder': '1fr 3fr'
      },
      boxShadow: {
        'simple': '0px 0px 33px #00000029',
        'event': '0px 0px 6px #0000001A',
        'profile': '0px 0px 10px #0000003E',
      },
      display: ['group-hover'],
      visibility: ['group-hover']
    },
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '550px'},
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      Segoe: ['Segoe UI', 'Arial', 'sans-serif'],
      Gotham: ['Gotham', 'Segoe UI', 'Arial', 'sans-serif'],
      GothamB: ['GothamB', 'Segoe UI', 'Arial', 'sans-serif'],
      GothamM: ['GothamM', 'Segoe UI', 'Arial', 'sans-serif'],
      GothamL: ['GothamL', 'Segoe UI', 'Arial', 'sans-serif'],
      GothamBook: ['GothamBook', 'Segoe UI', 'Arial', 'sans-serif']
    }
  },
  plugins: [],
}
