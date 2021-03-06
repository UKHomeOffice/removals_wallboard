import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
require('angular-moment');
require('angular-aria');

// create and bootstrap application
const requires = [
  'ngAria',
  'ui.router',
  'templates',
  // 'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'angularMoment',
  require('angular-sanitize'),
  require('ng-csv')
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
