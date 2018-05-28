'use strict';
var webpackConfig = require("./webpack.config.js");

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ["dist/*"],
    copy: {
      main: {
        files: [
          {expand: true, cwd: "src/", src: ["index.html", "assets"], dest: "dist/"},
          {expand: true, cwd: "src/assets/", src: ["**"], dest: "dist/assets/"},
          //{expand: true, cwd: "src/views/", src: ["**"], dest: "dist/views/"}, //@aimee: this is so we can reference questions for the quiz, if no other references then just point directly to that folder
          //{expand: true, cwd: "src/directives/", src: ["**"], dest: "dist/directives/"}
        ]
      },
     dist:{
      files: [{expand: true, cwd: "dist/", src: ["**"], dest: "dist/"}]
     } 
    },
    webpack: {
      options: webpackConfig,
      build: {}
    },
    "webpack-dev-server": {
      options: {
        webpack: webpackConfig,
      },
      start: {}
    }
  });

  grunt.registerTask('build', ['clean', 'copy', 'webpack','copy:dist']);
  grunt.registerTask('run', ['clean', 'copy', 'webpack-dev-server','copy:dist']);
  grunt.registerTask('default', 'run');
};