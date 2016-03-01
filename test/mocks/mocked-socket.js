'use strict';
import {SocketIO} from 'mock-socket';

exports.socketServiceMock = function () {
  angular.module('SocketServiceModule', ['mainApp', 'ngMockE2E']).factory(
    'SocketService',
    function SocketService () {
      'ngInject';
      return SocketIO;
    }
  );
}