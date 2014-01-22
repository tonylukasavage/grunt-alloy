'use strict';

var grunt = require('grunt'),
  path = require('path');

var TEST_APP = 'grunt-alloy-app',
  appPath = path.resolve('tmp', TEST_APP);

exports.titanium = {
  should_new: function(test) {
    test.expect(2);

    test.ok(grunt.file.exists(appPath));
    test.ok(grunt.file.exists(path.join(appPath, 'app')));

    test.done();
  }
};
