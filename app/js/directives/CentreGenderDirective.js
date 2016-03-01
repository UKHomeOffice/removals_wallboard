function CentreGenderDirective () {

  return {
    restrict: 'E',
    templateUrl: 'directives/centreGender.html',
    scope: {
      capacity: '=',
      gender: '=',
      inuse: '=',
      ooc: '=',
      availability: '=',
      scheduledout: '=',
      scheduledin: '=',
      cidreceiveddate: '=',
      heartbeatreceived: '=',
      status: '='
    },
  };
}

export default {
  name: 'centreGenderDirective',
  fn: CentreGenderDirective
};
