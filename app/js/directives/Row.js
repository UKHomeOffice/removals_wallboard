const moment = require("moment");
/**
 * @ngInject
 */
function RowDirective($interval) {
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
      if (scope.date !== null) {
        $interval(() => {
          scope.highlight = moment().diff(moment(scope.date), 'minutes') >= 30 ? 'highlight' : '';
        }, 1000);
      }
    }
  };
}

export default {
  name: 'rowDirective',
  fn: RowDirective
};
