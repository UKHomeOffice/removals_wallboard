'use strict';

describe('Unit: KeycloakInitService', function () {

  var service;

  beforeEach(function () {
    angular.mock.module('app', function ($provide) {
      $provide.value('$window', {location: {href: 'dummy'}});
    });

    angular.mock.inject(function (KeycloakInitService) {
      service = KeycloakInitService;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });
});
