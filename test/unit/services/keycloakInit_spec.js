'use strict';

describe('Unit: KeycloakInitService', function () {

  var service;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.inject(function (KeycloakInitService) {
      service = KeycloakInitService;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });
});
