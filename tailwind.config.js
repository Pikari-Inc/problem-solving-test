module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/**/*.{html,js}'],
  // darkMode: 'media',
  theme: {
    extend: {
      spacing: {
        540: '540px',
      },
      boxShadow: {
        form: '0 15px 35px 0 rgba(60,66,87,.08), 0 5px 15px 0 rgba(0,0,0,.12)',
        inputfocus: '0 0 0 2px #F472B6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
