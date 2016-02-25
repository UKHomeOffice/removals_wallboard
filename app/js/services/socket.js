function SocketService (socketIOClientService, sailsIOClientService) {
  'ngInject';
  const io = sailsIOClientService(socketIOClientService);
  var config = window.config || {backend: 'http://localhost:8080'};
  io.sails.url = config.backend;
  io.sails.transports = ['polling'];
  io.sails.query = io.sails.query || {};
  for (var sdkInfoKey in io.sails.sdk) {
    io.sails.query['__sails_io_sdk_' + sdkInfoKey] = io.sails.sdk[sdkInfoKey];
  }
  return io;
}

export default {
  name: 'SocketService',
  fn: SocketService
};
