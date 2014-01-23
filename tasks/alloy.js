/*
 * grunt-alloy
 * https://github.com/tonylukasavage/grunt-alloy
 *
 * Copyright (c) 2014 Tony Lukasavage
 * Licensed under the MIT license.
 */

'use strict';

var child_process = require('child_process'),
  exec = child_process.exec,
  path = require('path'),
  spawn = child_process.spawn;

module.exports = function(grunt) {

  grunt.registerMultiTask('alloy', 'grunt plugin for Appcelerator\'s Alloy framework for Titanium', function() {

    var ALLOY = process.env.GRUNT_ALLOY_TEST ? path.resolve('node_modules', '.bin', 'alloy') :
      path.resolve('node_modules', 'grunt-alloy', 'node_modules', '.bin', 'alloy');

    var options = this.options({
        noBanner: true,
        logLevel: 1
      }),
      command = options.command || 'compile',
      done = this.async(),
      extraArgs = [];

    extraArgs = (options.args || []).slice(0);
    delete options.args;
    delete options.command;

    // execute the alloy command
    var args = [];

    // create the list of command arguments
    Object.keys(options).forEach(function(key) {
      var value = options[key],
        isBool = isBoolean(value);
      if (!isBool || (isBool && !!value)) {
        if (key === 'noBanner' || key === 'logLevel' || key === 'outputPath') {
          args.push('--' + key);
        } else {
          args.push(camelCaseToDash(key));
        }
      }
      if (!isBool) { args.push(value); }
    });
    args.unshift(command);

    // add non-option, non-flag arguments
    args = args.concat(extraArgs);

    // spawn command and output
    grunt.log.writeln(ALLOY + ' ' + args.join(' '));
    var alloy = spawn(ALLOY, args);
    alloy.stdout.on('data', function(data) {
      process.stdout.write(data);
    });
    alloy.stderr.on('data', function(data) {
      process.stdout.write(data);
    });
    alloy.on('close', function(code) {
      grunt.log[code ? 'error' : 'ok']('alloy ' + command + ' ' + (code ? 'failed' : 'complete') + '.');
      return done(code);
    });

  });

};

function camelCaseToDash(str) {
  if (typeof str !== 'string') { return str; }
  return '--' + str.replace(/([A-Z])/g, function(m) { return '-' + m.toLowerCase(); });
}

function isBoolean(obj) {
  return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
}
