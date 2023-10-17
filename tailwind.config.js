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
  plugins: [],
}

