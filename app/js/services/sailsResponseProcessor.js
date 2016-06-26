const _ = require('lodash');

function sailsResponseProcessor() {
  const updateObject = (obj, updates) => Object.getOwnPropertyNames(updates).forEach(prop => {
    if (!_.isFunction(obj[prop])) {
      if (!_.isArray(obj[prop]) && _.isObject(obj[prop]) && !/Detail$/.test(prop)) {
        updateObject(obj[prop], updates[prop]);
      }
      else if (obj[prop] !== updates[prop]) {
        obj[prop] = updates[prop];
      }
    }
  });

  var sailsResponseProcessor = (model, scope, response) => {
    const index = _.findIndex(scope[model], ['id', response.id.toString()]);
    if (index !== -1) {
      if (response.verb === 'destroyed') {
        scope[model].splice(index, 1);
      }
      else if (response.verb === 'updated') {
        updateObject(scope[model][index], response.data);
      }
    }
    else if (response.verb === 'created') {
      scope[model].push(response.data);
    }
  };
  return sailsResponseProcessor;
}

export default {
  name: 'sailsResponseProcessor',
  fn: sailsResponseProcessor
};
