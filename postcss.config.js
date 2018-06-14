module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '>5%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    })
  ]
}
