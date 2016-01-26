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
  xit('should set the transport to only use polling');
  xit('should set the url');
  xit('should set the sdk info keys up');
});
