/*global angular, module, browser*/

'use strict';

describe('Unit: CentreDirective', function () {

  var element, scope;

  beforeEach(function () {
    angular.mock.module('app');

    angular.mock.inject(function ($compile, $rootScope) {
      scope = $rootScope;
      element = angular.element('<div centre-directive attributes="attributes"></div>');
      scope.attributes = {name: 'A sample title'};
      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should bind a title property to its template', function () {
    expect(element.find('h2').text()).toBe('A sample title');
  });

});
