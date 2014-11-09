module.exports = function( grunt ) {

  grunt.initConfig({
    // read package.json
    pkg: grunt.file.readJSON('package.json'),
    // linting
    jshint: require('./build/config/jshint'),
    // mocha tests
    mocha_istanbul: require('./build/config/mocha')
  });

  // load npm plugins (all dependencies that match /^grunt/)
  require('load-grunt-tasks')( grunt );

  // default task
  grunt.registerTask( 'default', require('./build/tasks/default') );

};
