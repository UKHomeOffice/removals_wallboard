function CidListDirective() {
  return {
    restrict: 'E',
    templateUrl: 'directives/cidList.html',
    scope: {
      gender: '@',
      cids: '='
    }
  };
}

export default {
  name: 'cidListDirective',
  fn: CidListDirective
};
