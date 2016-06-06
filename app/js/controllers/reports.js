const moment = require('moment');
const _ = require('lodash');

/**
 * @ngInject
 */
function ReportCtrl($scope, SocketService) {

  //set defaults
  $scope.from = moment().subtract(1, 'days').startOf('day').toDate();
  $scope.to = moment().subtract(1, 'days').endOf('day').toDate();

  $scope.getSummary = () => new Promise((resolve) =>
    SocketService.socket.get(`/heartbeat/summary?where={"createdAt":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`, response => resolve(_.map(response.data, (row) => {

      row.maleInUseMax = row.maleInUse.max;
      row.maleInUseMean = row.maleInUse.mean;
      row.maleInUseMin = row.maleInUse.min;
      delete row.maleInUse;

      row.femaleInUseMax = row.femaleInUse.max;
      row.femaleInUseMean = row.femaleInUse.mean;
      row.femaleInUseMin = row.femaleInUse.min;
      delete row.femaleInUse;

      row.maleOutOfCommissionMax = row.maleOutOfCommission.max;
      row.maleOutOfCommissionMean = row.maleOutOfCommission.mean;
      row.maleOutOfCommissionMin = row.maleOutOfCommission.min;
      delete row.maleOutOfCommission;

      row.femaleOutOfCommissionMax = row.femaleOutOfCommission.max;
      row.femaleOutOfCommissionMean = row.femaleOutOfCommission.mean;
      row.femaleOutOfCommissionMin = row.femaleOutOfCommission.min;
      delete row.femaleOutOfCommission;

      return row;
    })))
  );
  $scope.summaryHeaders = ["centre", "maleInUseMax", "maleInUseMean", "maleInUseMin", "femaleInUseMax", "femaleInUseMean", "femaleInUseMin", "maleOutOfCommissionMax", "maleOutOfCommissionMean", "maleOutOfCommissionMin", "femaleOutOfCommissionMax", "femaleOutOfCommissionMean", "femaleOutOfCommissionMin"];

  $scope.getRaw = () => new Promise((resolve) =>
    SocketService.socket.get(`/heartbeat?limit=${Number.MAX_SAFE_INTEGER}&where={"createdAt":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`, response => resolve(_.map(response.data, (row) => {

      row.timestamp = row.attributes.timestamp;
      row.centre = row.attributes.centre.attributes.name;
      row.maleInUse = row.attributes.maleInUse;
      row.femaleInUse = row.attributes.femaleInUse;
      row.maleOutOfCommission = row.attributes.maleOutOfCommission;
      row.femaleOutOfCommission = row.attributes.femaleOutOfCommission;
      delete row.links;
      delete row.id;
      delete row.attributes;
      return row;
    })))
  );
  $scope.rawHeaders = ["timestamp", "centre", "maleInUse", "femaleInUse", "maleOutOfCommission", "femaleOutOfCommission"];

}

export default {
  name: 'ReportController',
  fn: ReportCtrl
};
