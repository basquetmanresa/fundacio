const pjson = require('./package.json')
this.app = `./${pjson.name}`

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      serif: ['serif'],
    },

    extend: {
      colors:{
        'primary' : '#F3976A',
      }
    }
  },
  plugins: [
    require('@vicgutt/tailwindsass')({
        base: false,
        dist: this.app+"/static/sass/_tailwindutils",
    }),
],

}