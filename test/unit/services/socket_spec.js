/*global angular */

'use strict';

describe('Unit: SocketService', function () {

  var $scope, service;

  beforeEach(function () {
    angular.mock.module('app');

    module(function ($provide) {
      $provide.value('sailsIOClientService', function () {
        return {
          sails: {sdk: {}}
        };
      });
      $provide.value('socketIOClientService', function () {
        return "foo";
      });
    });

    angular.mock.inject(function (SocketService) {
      service = SocketService;
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });

});
