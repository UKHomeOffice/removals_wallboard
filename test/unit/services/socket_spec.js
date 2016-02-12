/*global angular */

'use strict';

describe('Unit: SocketService', function () {

  var $scope, service;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.module(function ($provide) {
      $provide.value('sailsIOClientService', function () {
        return {
          sails: {sdk: {version: "12", lib: "bar"}}
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

  it('should set the transport to only use polling', function () {
    expect(service.sails.transports).toEqual(['polling']);
  });

  it('should set the url', function () {
    expect(service.sails.url).toBeDefined();
  });

  it('should set the sdk info keys up', function () {
    expect(service.sails.query).toEqual({
      __sails_io_sdk_version: '12',
      __sails_io_sdk_lib: 'bar'
    });
  });
});
