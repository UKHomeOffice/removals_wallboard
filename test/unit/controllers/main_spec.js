/*global angular */

'use strict';

var SocketMock = {};
describe('Unit: MainCtrl', function () {

  var ctrl, $scope, sailsBind, SocketService;

  beforeEach(function () {
    // instantiate the app module
    angular.mock.module('app');
    angular.mock.inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      sailsBind = jasmine.createSpy('sailsBind');
      SocketService = {socket: {on: jasmine.createSpy('SocketService')}};
      ctrl = $controller('MainCtrl', {
        $scope: $scope,
        sailsBind: sailsBind,
        SocketService: SocketService
      });

    });
  });

  it('should exist', function () {
    expect(ctrl).toBeDefined();
  });

  it('should start with negative connected status', function () {
    expect($scope.connected).toEqual(false);
  });

  it('should bind the connect states', function () {
    expect(sailsBind).toHaveBeenCalledWith('centres', $scope);
  });

  it('should change the connection status to true on connect', function () {
    SocketService.socket.on.calls.argsFor(0)[1]();
    expect($scope.connected).toEqual(true);
    expect(SocketService.socket.on).toHaveBeenCalled();
  });

  it('should change the connection status to false on disconnect', function () {
    $scope.connected = true;
    SocketService.socket.on.calls.argsFor(1)[1]();
    expect($scope.connected).toEqual(false);
  });

});