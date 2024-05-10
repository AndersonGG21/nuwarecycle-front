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
        suraYellow: {
          50: '#F9FCEA',
          100: '#F2F9C8',
          200: '#EBF593',
          300: '#E5EF55',
          400: '#E3E829',
          500: '#D8D51A',
          600: '#BAAA14',
          700: '#957E13',
          800: '#7C6317',
          900: '#69511A',
          950: '#3D2C0B'
        },
        sunsetOrange: {
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

