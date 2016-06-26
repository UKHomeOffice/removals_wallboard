function CentreGenderDirective() {

  return {
    restrict: 'E',
    templateUrl: 'directives/centreGender.html',
    scope: {
      capacity: '=',
      gender: '=',
      inuse: '=',
      ooctotal: '=',
      oocdetail: '=',
      availability: '=',
      expectedin: '=',
      expectedout: '=',
      unexpectedin: '=',
      cidreceiveddate: '=',
      heartbeatreceived: '=',
      prebookingreceived: '=',
      prebooking: '=',
      prebookingdetail: '=',
      contingency: '=',
      status: '=',
      highlight: '='
    }
  };
}

export default {
  name: 'centreGenderDirective',
  fn: CentreGenderDirective
};
