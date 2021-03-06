'use strict';

export default {

  browserPort: 8000,
  UIPort: 8001,

  sourceDir: './app/',
  buildDir: './build/',

  styles: {
    src: 'app/styles/**/*.scss',
    dest: 'build/css',
    prodSourcemap: false,
    sassIncludePaths: [
      'node_modules/govuk_frontend_toolkit/stylesheets',
      'node_modules/govuk-elements-sass/public/sass',
      'node_modules/govuk_template_mustache/assets/stylesheets'
    ]
  },

  scripts: {
    src: 'app/js/**/*.js',
    dest: 'build/js'
  },

  images: {
    src: 'app/images/**/*',
    dest: 'build/images'
  },

  govuk_images: {
    src: [
      'node_modules/govuk_frontend_toolkit/images/*',
      'node_modules/govuk_template_mustache/assets/stylesheets/images/*',
      'node_modules/govuk_template_mustache/assets/images/*'
    ],
    dest: 'build/images'
  },

  fonts: {
    src: ['app/fonts/**/*'],
    dest: 'build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'png',
    'jpe?g',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'woff2?'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/views/**/*.html',
    dest: 'app/js'
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: true
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  init: function () {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];

    return this;
  }

}.init();
