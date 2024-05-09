/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sunsetOrange : {
          50: '#f2652260',
          100: '#f2652280',
          200: '#f26522',
          300: '##DC4903',
          400: '#B43A00',
          500: '#A73803',
        }
      },
      fontFamily: {
        'anybody': ['Anybody'],
        'anybody-italic': ['AnybodyItalic'],
        'anybody-bold': ['AnybodyBold'],
        'anybody-thin': ['AnybodyThin'],
        'geist': ['Geist'],
        'geist-bold': ['Geist-Bold'],
        'geist-thin': ['Geist-Thin']              
      },
      backgroundImage: {
        // 'gradient-green': "url('/assets/images/green-gradient.png')",
        'gradient-green': "url('/assets/images/green-gradient-sura.png')",
        'gradient-yellow': "url('/assets/images/yellow-gradient-sura.png')",
        'gradient-purple': "url('/assets/images/purple-gradient-sura.png')",
        'gradient-sura': "url('/assets/images/sura-gradient.png')",
        'gradient-mixed': "url('/assets/images/mixed-gradient.png')",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

