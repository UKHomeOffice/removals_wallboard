describe('sailsResponseProcessor', function () {

  var $scope, service, initialData;

  beforeEach(function (done) {
    angular.mock.module('app');

    initialData = {
      centres: [{
        id: '1',
        attributes: {
          capacity: 10, availability: 4,
          expectedins: [{id: 1}, {id: 2}],
          PrebookingDetail: {
            taskForce1: {
              total: 2, cids: [{id: 7}, {id: 35}]
            }
          }
        }
      }, {
        id: '2',
        attributes: {
          capacity: 23, availability: 6,
          expectedins: [{id: 1}]
        }
      }]
    };

    angular.mock.inject(function (sailsResponseProcessor, $rootScope) {
      $scope = $rootScope.$new();
      $scope.centres = _.cloneDeep(initialData.centres);
      service = sailsResponseProcessor;
      done();
    });
  });

  it('should exist', function () {
    expect(service).toBeDefined();
  });

  it('should add a new item to the scope when "created"', function () {
    var response = {
      id: '13', verb: 'created',
      data: {id: 13}
    };
    service('centres', $scope, response);
    $scope.$digest();
    expect($scope).toBeDefined();
    expect($scope.centres).toBeDefined();
    expect($scope.centres.length).toBe(3);
    expect($scope.centres[0]).toEqual(initialData.centres[0]);
    expect($scope.centres[1]).toEqual(initialData.centres[1]);
    expect($scope.centres[2]).toEqual(response.data);
  });

  it('should change the target item in the scope when "updated"', function () {
    var response = {
      id: '1', verb: 'updated',
      data: {
        attributes: {
          capacity: 10, availability: 5,
          expectedins: [{id: 2}],
          PrebookingDetail: {
            taskForce1: [{id: 17}, {id: 135}]
          }
        }
      }
    };
    service('centres', $scope, response);
    $scope.$digest();
    expect($scope).toBeDefined();
    expect($scope.centres).toBeDefined();
    expect($scope.centres.length).toBe(2);
    expect($scope.centres[0]).toEqual({
      id: initialData.centres[0].id,
      attributes: {
        capacity: response.data.attributes.capacity,
        availability: response.data.attributes.availability,
        expectedins: response.data.attributes.expectedins,
        PrebookingDetail: response.data.attributes.PrebookingDetail
      }
    });
    expect($scope.centres[1]).toEqual(initialData.centres[1]);
  });

  describe('updates', function () {
    it('should work with deltas (subsets of data)', function () {
      var response = {
        id: '1', verb: 'updated',
        data: {
          attributes: { availability: 6 }
        }
      };
      service('centres', $scope, response);
      $scope.$digest();
      expect($scope.centres[0]).toEqual({ // the updated centre is the same as the initial...
        id: initialData.centres[0].id,
        attributes: {
          capacity: initialData.centres[0].attributes.capacity,
          availability: response.data.attributes.availability, // ...only the data in the response is updated
          expectedins: initialData.centres[0].attributes.expectedins,
          PrebookingDetail: initialData.centres[0].attributes.PrebookingDetail
        }
      });
    });
    it('should overwrite arrays (not treat them as deltas)', function () {
      var response = {
        id: '1', verb: 'updated',
        data: {
          attributes: {
            expectedins: [{id: 2}]
          }
        }
      };
      service('centres', $scope, response);
      $scope.$digest();
      expect($scope.centres[0]).toEqual({
        id: initialData.centres[0].id,
        attributes: {
          capacity: initialData.centres[0].attributes.capacity,
          availability: initialData.centres[0].attributes.availability,
          expectedins: response.data.attributes.expectedins, // should be overwritten by the response
          PrebookingDetail: initialData.centres[0].attributes.PrebookingDetail
        }
      });
    });
    it('should overwrite some objects (not treat them as deltas)', function () {
      var response = {
        id: '1', verb: 'updated',
        data: {
          attributes: {
            PrebookingDetail: {
              taskForce1: {
                total: 4, cids: [{id: 35}]
              }
            }
          }
        }
      };
      service('centres', $scope, response);
      $scope.$digest();
      expect($scope.centres[0]).toEqual({
        id: initialData.centres[0].id,
        attributes: {
          capacity: initialData.centres[0].attributes.capacity,
          availability: initialData.centres[0].attributes.availability,
          expectedins: initialData.centres[0].attributes.expectedins,
          PrebookingDetail: response.data.attributes.PrebookingDetail // should be overwritten by the response
        }
      });
    });
  });

  it('should remove the target item from the scope when "destroyed"', function () {
    var response = {
      id: '1', verb: 'destroyed'
    };
    service('centres', $scope, response);
    $scope.$digest();
    expect($scope).toBeDefined();
    expect($scope.centres).toBeDefined();
    expect($scope.centres.length).toBe(1);
    expect($scope.centres).toEqual([initialData.centres[1]]);
  });

});
