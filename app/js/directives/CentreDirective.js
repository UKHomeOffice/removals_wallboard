function CentreDirective() {

  return {
    restrict: 'A',
    templateUrl: 'directives/centre.html',
    scope: {
      attributes: '='
    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
