function CentreDirective() {

  return {
    restrict: 'A',
    templateUrl: 'directives/centre.html',
    scope: {
      cid: '=',
      attributes: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('attributes.maleAvailability', function (newvalue) {
        scope.attributes.highlightMale = newvalue < 1 ? 'highlight' : '';
        scope.attributes.maleAvailability = newvalue === 0 ? 'FULL' : newvalue;
        scope.attributes.statusMale = newvalue < 1 ? 'No Available Male Beds' : 'Available Male Beds';

      });
      scope.$watch('attributes.femaleAvailability', function (newvalue) {
        scope.attributes.highlightFemale = newvalue < 1 ? 'highlight' : '';
        scope.attributes.femaleAvailability = newvalue === 0 ? 'FULL' : newvalue;
        scope.attributes.statusFemale = newvalue < 1 ? 'No Available Female Beds' : 'Available Female Beds';

      });
    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
