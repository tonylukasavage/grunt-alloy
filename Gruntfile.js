/*
 * grunt-alloy
 * https://github.com/tonylukasavage/grunt-alloy
 *
 * Copyright (c) 2014 Tony Lukasavage
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var TEST_APP = 'grunt-alloy-app';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*_test.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    titanium: {
      create: {
        options: {
          command: 'create',
          name: TEST_APP,
          workspaceDir: 'tmp'
        }
      }
    },

    // Configuration to be run (and then tested).
    alloy: {

      // create a new alloy app
      should_new: {
        options: {
          command: 'new',
          args: [path.resolve('tmp', TEST_APP)]
        }
      },

      // create a controller
      should_generate_controller: {
        options: {
          command: 'generate',
          outputPath: path.resolve('tmp', TEST_APP),
          args: ['controller', 'test1']
        }
      },

      // create a model
      should_generate_model: {
        options: {
          command: 'generate',
          outputPath: path.resolve('tmp', TEST_APP),
          args: ['model', 'modelname', 'sql', 'id:INTEGER']
        }
      },

      // compile the default alloy app
      should_compile: {
        options: {
          command: 'compile',
          platform: 'ios',
          outputPath: path.resolve('tmp', TEST_APP)
        }
      }

    },

    // unit tests
    nodeunit: {
      src: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-titanium');

  // install in a Titanium project, if present
  grunt.registerTask('test-env', function() {
    process.env.GRUNT_ALLOY_TEST = '1';
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['test-env', 'titanium', 'alloy', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
