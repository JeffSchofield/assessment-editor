module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-interaction-media'),
    require('tailwindcss-gridlines')
  ]
}
