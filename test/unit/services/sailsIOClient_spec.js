/*global angular */

'use strict';

describe('Unit: sailsIOClientService', function () {

  var service;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.inject(function (sailsIOClientService) {
      service = sailsIOClientService;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });
});
