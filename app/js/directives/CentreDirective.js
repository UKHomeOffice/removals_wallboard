function CentreDirective () {

  return {
    restrict: 'A',
    templateUrl: 'directives/centre.html',
    scope: {
      attributes: '='
    },
    link: function (scope, element, attrs) {
      scope.attributes.maleAvailability = scope.attributes.maleAvailability == 0 ? 'FULL': scope.attributes.maleAvailability;
      scope.attributes.femaleAvailability = scope.attributes.femaleAvailability == 0 ? 'FULL': scope.attributes.femaleAvailability;
      scope.attributes.statusMale = scope.attributes.maleAvailability < 1 ? 'No Available Male Beds': 'Available Male Beds';
      scope.attributes.statusFemale = scope.attributes.femaleAvailability < 1 ? 'No Available Female Beds': 'Available Female Beds';
    },
  };
}

export default {
  name: 'centreDirective',
  fn: CentreDirective
};
