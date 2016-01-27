/*global angular */

'use strict';

describe('Unit: socketIOClientService', function () {

  var service;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.inject(function (socketIOClientService) {
      service = socketIOClientService;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });
});
