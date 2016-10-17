const _ = require("lodash");

function CentreDirective() {

  return {
    restrict: 'A',
    templateUrl: 'directives/centre.html',
    scope: {
      cid: '=',
      attributes: '='
    },
    link: function (scope, element, attrs) {

      scope.male = scope.attributes.maleCapacity > 0
      scope.female = scope.attributes.femaleCapacity > 0

      const detailaggregate = (detail, value) => {
        scope[value] = {};
        if (scope.male) {
          scope.$watch(`attributes.male${detail}`, (newvalue) =>
            _.forEach(newvalue, (v, k) => _.set(scope, `${value}.${k}.male`, v))
          );
        }
        if (scope.female) {
          scope.$watch(`attributes.female${detail}`, (newvalue) =>
            _.forEach(newvalue, (v, k) => _.set(scope, `${value}.${k}.female`, v))
          );
        }
      }

      detailaggregate('OutOfCommissionDetail', 'ooc');
      detailaggregate('PrebookingDetail', 'PrebookingDetail');
      detailaggregate('ContingencyDetail', 'ContingencyDetail');

      scope.$watch('attributes.femaleAvailability', function (newvalue) {
        scope.highlightFemale = newvalue < 1 ? 'highlight' : '';
        scope.femaleAvailability = newvalue === 0 ? 'FULL' : newvalue;
      });
      scope.$watch('attributes.maleAvailability', function (newvalue) {
        scope.highlightMale = newvalue < 1 ? 'highlight' : '';
        scope.maleAvailability = newvalue === 0 ? 'FULL' : newvalue;
      });

    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
