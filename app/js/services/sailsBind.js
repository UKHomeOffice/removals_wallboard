var _ = require('lodash');

function sailsBind(SocketService) {
  'ngInject';

  var sailsBind = (model, scope) => {
    SocketService.socket.on('connect', function () {
      SocketService.socket.get('/' + model, response => scope.$apply(() => scope[model] = response.data));
      SocketService.socket.on(model, response =>
        scope.$apply(() => {
          var index = _.findIndex(scope[model], ['id', response.id.toString()]);
          if (index !== -1) {
            if (response.verb === 'destroyed') {
              scope[model].splice(index, 1);
            }
            else if (response.verb === 'updated') {
              scope[model][index] = _.merge(scope[model][index], response.data);
            }
          }
          if (response.verb === 'created' && index === -1) {
            scope[model].push(response.data);
          }

        })
      );
    });
  };
  return sailsBind;
}

export default {
  name: 'sailsBind',
  fn: sailsBind
};
