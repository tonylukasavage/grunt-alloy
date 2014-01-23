'use strict';

var grunt = require('grunt'),
  path = require('path');

var TEST_APP = 'grunt-alloy-app',
  projectPath = path.resolve('tmp', TEST_APP),
  appPath = path.join(projectPath, 'app');

exports.titanium = {
  should_new: function(test) {
    test.expect(5);

    test.ok(grunt.file.exists(projectPath));
    test.ok(grunt.file.exists(appPath));
    test.ok(grunt.file.exists(path.join(appPath, 'views', 'index.xml')));
    test.ok(grunt.file.exists(path.join(appPath, 'controllers', 'index.js')));
    test.ok(grunt.file.exists(path.join(appPath, 'styles', 'index.tss')));

    test.done();
  },
  should_generate_controller: function(test) {
		test.expect(3);

		test.ok(grunt.file.exists(path.join(appPath, 'views', 'test1.xml')));
    test.ok(grunt.file.exists(path.join(appPath, 'controllers', 'test1.js')));
    test.ok(grunt.file.exists(path.join(appPath, 'styles', 'test1.tss')));

		test.done();
  },
  should_generate_model: function(test) {
    test.expect(1);

    test.ok(grunt.file.exists(path.join(appPath, 'models', 'modelname.js')));

    test.done();
  },
  should_compile: function(test) {
    test.expect(9);

    test.ok(grunt.file.exists(path.join(projectPath, 'Resources')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy.js')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy', 'controllers')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy', 'controllers', 'index.js')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy', 'styles')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy', 'styles', 'index.js')));
    test.ok(grunt.file.exists(path.join(projectPath, 'Resources', 'iphone', 'alloy', 'models', 'modelname.js')));

    test.done();
  }
};
