function SocketService(socketIOClientService, sailsIOClientService) {
  'ngInject';
  const io = sailsIOClientService(socketIOClientService);

  io.sails.url = 'http://localhost:8080';
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
