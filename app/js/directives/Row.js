function RowDirective() {
  return {
    restrict: 'A',
    templateUrl: 'directives/row.html',
    scope: {
      title: '@',
      headinghelp: '@',
      date: '=',
      attr: '@',
      attributes: '=',
      male: '=',
      female: '=',
      hider: '='
    },
    replace: true,
    link: function (scope, element, attrs) {
      scope.$watch(`attributes.male${scope.attr}`, (newvalue) => scope.maleValue = newvalue);
      scope.$watch(`attributes.female${scope.attr}`, (newvalue) => scope.femaleValue = newvalue);
    }
  };
}

export default {
  name: 'rowDirective',
  fn: RowDirective
};
