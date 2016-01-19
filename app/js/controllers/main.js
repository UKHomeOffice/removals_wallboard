const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const _ = require('lodash');

const io = sailsIOClient(socketIOClient);

io.sails.url = 'http://localhost:8080';
io.sails.transports = ['polling'];
io.sails.query = io.sails.query || {};
for (var sdkInfoKey in io.sails.sdk) {
  io.sails.query['__sails_io_sdk_' + sdkInfoKey] = io.sails.sdk[sdkInfoKey];
}

var sailsBind = (model, scope, io) => {
  io.socket.get('/' + model, response => scope.$apply(() => scope[model] = response.data));
  io.socket.on(model, response =>
    scope.$apply(() => {
      var index = _.findIndex(scope[model], _.matchesProperty('id', response.data.id));
      if (response.verb === 'deleted') {
        delete scope[model][index];
      }
      else {
        //update
        if (index !== -1) {
          scope[model][index] = _.merge(scope[model][index], response.data);
        }
        //create
        else {
          scope[model].push(response.data);
        }
      }
    })
  );
};

/**
 * @ngInject
 */
function MainCtrl($scope) {

  io.socket.on('connect', function () {
    $scope.$apply(() => $scope.connected = true);
    sailsBind('centres', $scope, io);
  });
  io.socket.on('disconnect', function () {
    $scope.connected = false;
    $scope.$apply();
  });

}

export default {
  name: 'MainCtrl',
  fn: MainCtrl
};
