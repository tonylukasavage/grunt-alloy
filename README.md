# grunt-alloy

> grunt plugin for Appcelerator's Alloy framework for Titanium

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-alloy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-alloy');
```

## The "alloy" task

### Overview
In your project's Gruntfile, add a section named `alloy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  alloy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.command
Type: `String`
Default value: `compile`

The command to execute with alloy.

#### options.args
Type: `Array`,
Default value: `[]`

All the non-flag, non-option arguments to pass to alloy. For example, `alloy new /path/to/project` would be created as

```javascript
grunt.initConfig({
  alloy: {
    all: {
      options: {
        command: 'new',
        args: ['/path/to/project']
      }
    }
  }
});
```

#### options...

The rest of the options and flags are the same as the those available to the Alloy CLI. You can see this list like this by typing `alloy`. The options should be named as camel case as opposed to the dashed format used by some of the CLI, making them easier to use as keys in your options. For example, `--project-dir` becomes `projectDir`. More details in the examples below.

#### flags

Flags like `--no-colors` should be given a boolean value.

```js
grunt.initConfig({
  alloy: {
    all: {
      options: {
        command: 'compile',
        noColors: false
      }
    }
  }
});
```

### Usage Examples

There's a few practical usage examples in this repo's [Gruntfile.js](Gruntfile.js). Aside from that, here's a few more examples.

#### Make a new Alloy project

Assuming the a traditional Titanium project already exists at `/path/to/project`, this would turn it into an Alloy project.

```javascript
alloy: {
  all: {
    options: {
      command: 'new',
      args: ['/path/to/project']
    }
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Todo

* Remove dependency on alloy in package.json. Allow developer to instead use whatever version they already have installed.
