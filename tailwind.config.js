const colors = require('./colors.config')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.indigo,
      neutral: colors.zinc,
      ...colors,
      white: colors.zinc[50],
      black: colors.zinc[900],
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit'
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-interaction-media'),
    require('tailwindcss-gridlines')
  ]
}
