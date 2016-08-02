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
        scope.highlightMale = newvalue < 1 ? 'highlight' : '';
        scope.maleAvailability = newvalue === 0 ? 'FULL' : newvalue;
        scope.statusMale = newvalue < 1 ? 'No Available Male Beds' : 'Available Male Beds';
      });
      scope.$watch('attributes.femaleAvailability', function (newvalue) {
        scope.highlightFemale = newvalue < 1 ? 'highlight' : '';
        scope.femaleAvailability = newvalue === 0 ? 'FULL' : newvalue;
        scope.statusFemale = newvalue < 1 ? 'No Available Female Beds' : 'Available Female Beds';
      });
    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
