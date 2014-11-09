// docs: https://github.com/pocesar/grunt-mocha-istanbul
module.exports = {
  test: {
    src: 'test/**/*.js',
    options: {
      reportFormats: [ 'html' ],
      check: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80
      },
      print: 'detail'
    }
  }
};
