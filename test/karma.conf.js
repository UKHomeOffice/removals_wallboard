'use strict';

const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: false,

  frameworks: ['jasmine', 'browserify'],

  preprocessors: {
    //'app/js/**/*.js': ['browserify', 'coverage']
    'app/js/**/*.js': ['browserify']
  },

  //browsers: ['Chrome'],
  browsers: ['PhantomJS'],

  //reporters: ['progress', 'coverage'],
  reporters: ['progress'],

  watchify: {
    delay: 50,
    poll: 50
  },
  autoWatch: true,

  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      //istanbul({
      //  instrumenter: isparta,
      //  ignore: ['**/node_modules/**', '**/test/**']
      //})
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // app-specific code
    'app/js/main.js',
    'app/js/**/*.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',

    // test files
    'test/unit/**/*.js'
  ]

};

const customLaunchers = {
  chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  }
};

const ciAdditions = {
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage', 'saucelabs']
};

module.exports = function (config) {
  const isCI = process.env.CI;
  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};
