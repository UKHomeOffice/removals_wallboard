
function sailsBind(SocketService, sailsResponseProcessor) {
  'ngInject';

  var sailsBind = function (model, scope) {
    SocketService.socket.on('connect', function () {
      SocketService.socket.get('/' + model, response => scope.$apply(() => scope[model] = response.data));
      SocketService.socket.on(model, response => scope.$apply(() => sailsResponseProcessor(model, scope, response)));
    });
  };
  return sailsBind;
}

export default {
  name: 'sailsBind',
  fn: sailsBind
};
