/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        suraBlue: {
          50: '#E5F6FF',
          100: '#CFEEFF',
          200: '#A9DCFF',
          300: '#75C1FF',
          400: '#3F95FF',
          500: '#1468FF',
          600: '#0053FF',
          700: '#0054FF',
          800: '#004BE3',
          900: '#0030A4',
          950: '#001B66'
        },
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
        'gradient-green': "url('/assets/images/green-gradient.png')",
        'gradient-purple': "url('/assets/images/purple-gradient.png')",
        'gradient-black': "url('/assets/images/black-gradient.png')",
        'gradient-orange': "url('/assets/images/orange-gradient.png')",
        'gradient-nuwa': "url('/assets/images/nuwa-gradient.png')",
        'gradient-mixed': "url('/assets/images/mixed-gradient.png')",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

