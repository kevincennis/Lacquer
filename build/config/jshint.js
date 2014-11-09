module.exports = {
  options: {
    // pretty console output
    reporter: require('jshint-stylish'),
    // allow assignment inside conditionals
    boss: true,
    // don't use underscores in identifiers
    camelcase: true,
    // require curlies even for single-statement blocks
    curly: true,
    // require ===
    eqeqeq: true,
    // allow `== null` for null/undefined check
    eqnull: true,
    // no var statements inside blocks
    funcscope: true,
    // 2-space indentation
    indent: 2,
    // don't require semis in single-line functions
    lastsemic: true,
    // max of 80 chars per line
    maxlen: 80,
    // single quotes
    quotmark: 'single',
    // no trailing spaces
    trailing: true,
    // allow assignment expressions inside ternary ops
    '-W030': true
  },
  src: {
    files: {
      src: ['lib/**/*.js']
    },
    options: {
      // allow node globals
      node: true,
      // max of 80 chars per line
      maxlen: 80,
      // don't allow use of undefined vars
      undef: true,
      // don't allow unused vars
      unused: 'vars'
    }
  }
};
