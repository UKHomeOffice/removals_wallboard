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
      prebookingtotal: '=',
      prebookingdetail: '=',
      contingencytotal: '=',
      contingencydetail: '=',
      status: '=',
      highlight: '='
    }
  };
}

export default {
  name: 'centreGenderDirective',
  fn: CentreGenderDirective
};
