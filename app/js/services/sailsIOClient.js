const sailsIOClient = require('sails.io.js');

function sailsIOClientService() {
  'ngInject';
  return sailsIOClient;
}

export default {
  name: 'sailsIOClientService',
  fn: sailsIOClientService
};
