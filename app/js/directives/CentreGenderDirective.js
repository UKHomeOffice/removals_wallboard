function CentreGenderDirective() {

  return {
    restrict: 'E',
    templateUrl: 'directives/centreGender.html',
    scope: {
      capacity: '=',
      gender: '=',
      inuse: '=',
      ooc: '=',
      availability: '='
    },
  };
}

export default {
  name: 'centreGenderDirective',
  fn: CentreGenderDirective
};
