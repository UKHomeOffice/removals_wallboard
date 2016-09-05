function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'MainCtrl as home',
      templateUrl: 'home.html',
      title: 'Home'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
