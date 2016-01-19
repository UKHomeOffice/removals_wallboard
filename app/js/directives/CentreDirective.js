function CentreDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/centre.html',
    scope: false,
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
