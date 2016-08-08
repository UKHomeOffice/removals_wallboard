const moment = require('moment');
const _ = require('lodash');

/**
 * @ngInject
 */
function ReportCtrl($scope, SocketService) {
  const socketGet = (url) => new Promise((resolve) => SocketService.socket.get(url, resolve))
  const formatReasons = (gender, row) => _.join(_.flatMap(row[gender] || [], (value, key) => `${key}: ${value}`), ', ')
  //set defaults
  $scope.from = moment().subtract(1, 'days').startOf('day').toDate();
  $scope.to = moment().subtract(1, 'days').endOf('day').toDate();

  $scope.getSummary = () =>
    socketGet(`/heartbeat/summary?where={"createdAt":{"lessThan": "${$scope.to.toISOString()}", "greaterThan": "${$scope.from.toISOString()}"}}`)
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
