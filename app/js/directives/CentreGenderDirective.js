function CentreGenderDirective() {

  return {
    restrict: 'E',
    templateUrl: 'directives/centreGender.html',
    scope: {
      capacity: '=',
      gender: '=',
      inuse: '=',
      ooc: '=',
      availability: '=',
      scheduledin: '=',
      scheduledout: '=',
      unexpectedin: '=',
      unexpectedout: '=',
      cidreceiveddate: '=',
      heartbeatreceived: '=',
      prebookingreceived: '=',
      prebooking: '=',
      contingency: '=',
      status: '=',
      highlight: '='
    },
  };
}

export default {
  name: 'centreGenderDirective',
  fn: CentreGenderDirective
};
