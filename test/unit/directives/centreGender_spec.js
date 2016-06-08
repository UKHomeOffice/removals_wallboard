/*global angular, module, browser*/

'use strict';

describe('UNIT centreGenderDirective', function () {

  var element, scope;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope;
      element = angular.element('<div centre-directive attributes="attributes"></div>');
      scope.attributes = {
        capacity: 15
      };
      $compile(element)(scope);
      scope.$digest();
    });
  });

  xit('should exist', function () {
    expect(directive).toBeDefined();
  });

  xit('should bind a capacity property to its template.', function () {
    expect(element.find('tr.capacity>td:last').text()).toBe(scope.attributes.capacity);
  });

  xit('should bind a gender property to its template.', function () {
  });

  xit('should bind an inuse property to its template.', function () {
  });

  xit('should bind an ooc property to its template.', function () {
  });

  xit('should bind an availability property to its template.', function () {
  });

  xdescribe('the `scope` property', function () {
    it('should only have attribute names in lowercase (otherwise they won\'t work properly)', function () {
      Object.getOwnPropertyNames(directive.scope).forEach(function () {
        expect(/[a-z_]/.test(attr), 'attribute named "'+attr+'" is not lowercase');
      });
    });
  });

});