/*global angular */

'use strict';

describe('Unit: sailsBind', function () {

  var $scope, service, SocketService;

  beforeEach(function () {
    angular.mock.module('app');

    SocketService = {
      socket: {
        on: jasmine.createSpy('SocketService.On').and.callFake(function (o, f) {
          if (o == 'connect') {
            return f();
          }
        }),
        get: jasmine.createSpy('SocketService.Get').and.callFake(function (o, f) {
          f({response: {data: ['foo', 'bar']}});
        })
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('SocketService', SocketService);
    });

    angular.mock.inject(function (sailsBind, $rootScope) {
      $scope = $rootScope.$new();
      service = sailsBind;
      service('centre', $scope);
    });

  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });

  it('should wait for a socket connection', function () {
    expect(SocketService.socket.on.calls.argsFor(0)[0]).toBe('connect');
  });

  xit('create', function () {

  });
  xit('update', function () {

  });
  xit('delete', function () {

  });

  xit('should get the initial payload', function () {
    expect(SocketService.socket.get.calls.argsFor(0)[0]).toBe('/centre');
    expect($scope.centre).toBe(['foo', 'bar']);
  });
});
