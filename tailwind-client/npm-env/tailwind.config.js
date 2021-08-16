module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    scale: {
      '0': '0',
     '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
     '95': '.95',
     '99':'.99',
      '100': '1',
      '101':'1.01',
     '105': '1.05',
     '110': '1.1',
      '125': '1.25',
      '150': '1.5',
     '200': '2',
    },
    zIndex: {
      '0': 0,
     '10': 10,
     '20': 20,
     '30': 30,
     '40': 40,
     '50': 50,
     '25': 25,
     '75': 75,
     '100': 100,
      'auto': 'auto',
    },extend: {
      grayscale: {50: '50%',
        75: '75%',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms'),require('@tailwindcss/aspect-ratio')],
}
