/*global browser, by */

'use strict';

describe('E2E: Main', function () {

  beforeEach(function () {
    browser.get('/');
    browser.waitForAngular();
  });

  it('should route correctly', function () {
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });

  xit('should connect to the mock socket');

  xit('should show the centres from the mocks');

});