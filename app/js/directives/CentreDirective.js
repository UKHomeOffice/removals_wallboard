function CentreDirective() {

  return {
    restrict: 'A',
    templateUrl: 'directives/centre.html',
    scope: {
      centreID: '=',
      attributes: '='
    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
