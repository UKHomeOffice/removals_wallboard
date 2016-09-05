function CentreGenderDirective() {
"ngInject";
  return {
    restrict: 'E',
    templateUrl: 'directives/centreGender.html',
    scope: {
      capacity: '=',
      centre: '=',
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
