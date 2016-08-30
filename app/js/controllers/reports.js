const moment = require('moment');
const _ = require('lodash');
const promise = require('bluebird');

/**
 * @ngInject
 */
function ReportCtrl($scope, SocketService) {
  const socketGet = (url) => new promise((resolve) => SocketService.socket.get(url, resolve))

  const formatReasons = (gender, row) => _.join(_.flatMap(row[gender] || [], (value, key) => `${key}: ${value}`).sort(), ', ')

  const progressIndicator = promise.method((report, inProgress) =>
    $scope.$apply(() =>
      $scope[`${report}InProgress`] = inProgress
    ))

  //set defaults
  $scope.from = moment().subtract(1, 'days').startOf('day').toDate();
  $scope.to = moment().subtract(1, 'days').endOf('day').toDate();

  $scope.getSummary = () =>
    progressIndicator('summary', true)
      .finally(() => progressIndicator('summary', false))
      .then(() => socketGet(`/heartbeat/summary?where={"createdAt":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`))

      .then(response =>_.map(response.data, (row) => {
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
      }))

      .then(rows =>
        socketGet(`/bedevent/summary?where={"timestamp":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`)
          .then(response => {
            _.forEach(response.data, (value, key) => {
              let row = _.findIndex(rows, {centre: key});
              if (row < 0) {
                row = rows.push({
                    centre: key,
                    maleInUseMax: null,
                    maleInUseMean: null,
                    maleInUseMin: null,
                    femaleInUseMax: null,
                    femaleInUseMean: null,
                    femaleInUseMin: null,
                    maleOutOfCommissionMax: null,
                    maleOutOfCommissionMean: null,
                    maleOutOfCommissionMin: null,
                    femaleOutOfCommissionMax: null,
                    femaleOutOfCommissionMean: null,
                    femaleOutOfCommissionMin: null
                  }) - 1;
              }
              rows[row].maleBedReasons = formatReasons('male', value);
              rows[row].femaleBedReasons = formatReasons('female', value);
            })
            return rows;
          })
      );

  $scope.summaryHeaders = ["centre", "maleInUseMax", "maleInUseMean", "maleInUseMin", "femaleInUseMax", "femaleInUseMean", "femaleInUseMin", "maleOutOfCommissionMax", "maleOutOfCommissionMean", "maleOutOfCommissionMin", "femaleOutOfCommissionMax", "femaleOutOfCommissionMean", "femaleOutOfCommissionMin", "maleBedReasons", "femaleBedReasons"];

  $scope.getRaw = () =>
    progressIndicator('raw', true)
      .finally(() => progressIndicator('raw', false))
      .then(() => socketGet(`/heartbeat?limit=${Number.MAX_SAFE_INTEGER}&where={"createdAt":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`))
      .then(response => response.data)
      .map(row => row.attributes)
      .map(row => {
        row.centre = row.centre.attributes.name;
        return row;
      });

  $scope.rawHeaders = ["centre", "timestamp", "maleInUse", "femaleInUse", "maleOutOfCommission", "femaleOutOfCommission"];

}

export default {
  name: 'ReportController',
  fn: ReportCtrl
};
