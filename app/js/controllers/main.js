/**
 * @ngInject
 */
function MainCtrl($scope, KeycloakInitService, SocketService, sailsBind) {
  $scope.connected = false;

  SocketService.socket.on('connect', () =>
    $scope.$apply(() => $scope.connected = true));

  sailsBind('centres', $scope);

  SocketService.socket.on('disconnect', () =>
    $scope.$apply(() => $scope.connected = false));
}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
