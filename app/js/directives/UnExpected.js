function UnexpectedDirective() {
  return {
    restrict: 'E',
    templateUrl: 'directives/unexpected.html',
    scope: {
      gender: '@',
      cids: '='
    }
  };
}

export default {
  name: 'unexpectedDirective',
  fn: UnexpectedDirective
};
