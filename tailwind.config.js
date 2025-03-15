/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#7F6DD5',
        secondary:'#F4F2FD',
        offBg:'#F6F6F6',
        title:'#24272B',
        secondaryTitle:'#333333',
        subtitle:'#9A9C9D',
        gray50:'#77757F',
        gray70:'#B0B0B0',
        gray80:'#F9F8FF',
        gray90:'#EFEFEF',
        gray100:'#6C6E71',
        gray200:'#E7E7E7',
        gray300:'#505255',
        danger:'#E5557C',
        premium:'#F5C69B',
        
      },
      fontFamily: {
        'work': ['"Work Sans"', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

