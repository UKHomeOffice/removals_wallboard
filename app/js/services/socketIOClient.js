const socketIOClient = require('socket.io-client');

function socketIOClientService() {
  'ngInject';
  return socketIOClient;
}

export default {
  name: 'socketIOClientService',
  fn: socketIOClientService
};
