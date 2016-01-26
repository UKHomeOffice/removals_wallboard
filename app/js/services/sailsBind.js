var _ = require('lodash');

function sailsBind(SocketService) {
  'ngInject';

  var sailsBind = (model, scope) => {
    SocketService.socket.on('connect', function () {
      SocketService.socket.get('/' + model, response => scope.$apply(() => scope[model] = response.data));
      SocketService.socket.on(model, response =>
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
    });
  };
  return sailsBind;
}

export default {
  name: 'sailsBind',
  fn: sailsBind
};
