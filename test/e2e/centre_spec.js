/*global browser, by */
import { SocketIO, Server } from 'mock-socket';

'use strict';
var mockModule = require('./mocks/mocked-socket');

describe('E2E: Main', function () {
  var mockServer;

  beforeEach(function (done) {
    mockServer = new Server('http://localhost:8080');
    mockServer.on('connection', server => {
      mockServer.emit('Socket connected.');
      done();
    });

    browser.addMockModule('SocketService', mockModule.socketServiceMock);
    browser.get('/');
    browser.waitForAngular();
  });

  afterEach(function () {
    browser.clearMockModules();
    mockServer.disconnect();
  });

  describe('Mock Socket Service: ', function () {
    xit('should connect', function () {
      //Assert
      expect(element(By.css('.disconnected')).isPresent()).toBeFalsey();
    });

    xit('should reconnect', function () {
      //Arrange & Action io Disconnection
      mockServer.disconnect();

      //Assert
      expect(element(By.css('.disconnected')).isPresent()).toBeTruthy();

      //Arrange & Action io Connection
      mockServer = new Server('http://localhost:8080');

      mockServer.on('connection', server => {
        //Assert
        expect(element(By.css('.disconnected')).isPresent()).toBeFalsy();
      });
    });

    xit('should disconnect', function () {
      //Arrange & Action io Disconnection
      mockServer.disconnect();

      //Assert
      expect(element(By.css('.disconnected')).isPresent()).toBeTruthy();
    });
  });

  describe('Centres:: on /: ', function () {
    var attributes = {};

    beforeEach(function () {
      // Arrange: Initial data
      attributes = {
        updated: '2016-02-29T10:27:38.524Z',
        heartbeatRecieved: 'Mon Feb 29 2016 10:27:38 GMT+0000 (GMT)',
        name: 'Centre Example',
        maleCapacity: 1,
        femaleCapacity: 2,
        maleInUse: 3,
        femaleInUse: 4,
        maleOutOfCommission: 5,
        femaleOutOfCommission: 6,
        maleAvailability: 7,
        femaleAvailability: 8,
        cidReceivedDate: '11:50:27',
        maleActiveMovementsOut: 9,
        maleActiveMovementsIn: 10,
        femaleActiveMovementsOut: 11,
        femaleActiveMovementsIn: 12,
      };

      var centreJson = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('Socket connected.');
      mockServer.emit('centre', centreJson);
    });


    xit('should show current data binded to scope ', function () {
      // Assert
      var centre = element.all(By.css('.centre')).get(0);
      var maleSummary = centre.(By.css('[gender="Male"]')).(By.css('.summary'));
      var maleDetails = centre.(By.css('[gender="Male"]')).(By.css('.details'));
      var femaleSummary = centre.(By.css('[gender="Female"]')).(By.css('.summary'));
      var femaleDetails = centre.(By.css('[gender="Female"]')).(By.css('.details'));

      expect(centre.isPresent()).toBeTruthy();
      expect(centre.(By.binding('name')).getText()).toEqual(attributes.name);
      expect(centre.(By.css('.time')).getText()).toEqual('10:27:38');

      expect(maleSummary.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);
      expect(maleDetails.(By.binding('capacity')).getText()).toEqual(attributes.maleCapacity);
      expect(maleDetails.(By.binding('inuse')).getText()).toEqual(attributes.maleInUse);
      expect(maleDetails.(By.binding('ooc')).getText()).toEqual(attributes.maleOutOfCommission);
      expect(maleDetails.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);

      expect(femaleSummary.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);
      expect(femaleDetails.(By.binding('capacity')).getText()).toEqual(attributes.femaleCapacity);
      expect(femaleDetails.(By.binding('inuse')).getText()).toEqual(attributes.femaleInUse);
      expect(femaleDetails.(By.binding('ooc')).getText()).toEqual(attributes.femaleOutOfCommission);
      expect(femaleDetails.(By.binding('availability')).getText()).toEqual(attributes.femaleAvailability);
    });

    xit('should show updated data binded to scope ', function () {
      // Arrange
      attributes = {
        updated: '2016-02-29T10:27:38.524Z',
        heartbeatRecieved: 'Mon Feb 29 2016 10:27:38 GMT+0000 (GMT)',
        name: 'Centre Example',
        maleCapacity: 13,
        femaleCapacity: 14,
        maleInUse: 15,
        femaleInUse: 16,
        maleOutOfCommission: 17,
        femaleOutOfCommission: 18,
        maleAvailability: 19,
        femaleAvailability: 20,
        cidReceivedDate: '11:50:27',
        maleActiveMovementsOut: 21,
        maleActiveMovementsIn: 22,
        femaleActiveMovementsOut: 23,
        femaleActiveMovementsIn: 24,
      };

      var centreJson = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      var centre = element.all(By.css('.centre')).get(0);
      var maleSummary = centre.(By.css('[gender="Male"]')).(By.css('.summary'));
      var maleDetails = centre.(By.css('[gender="Male"]')).(By.css('.details'));
      var femaleSummary = centre.(By.css('[gender="Female"]')).(By.css('.summary'));
      var femaleDetails = centre.(By.css('[gender="Female"]')).(By.css('.details'));

      expect(centre.isPresent()).toBeTruthy();
      expect(centre.(By.binding('name')).getText()).toEqual(attributes.name);
      expect(centre.(By.css('.time')).getText()).toEqual('10:27:38');

      expect(maleSummary.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);
      expect(maleDetails.(By.binding('capacity')).getText()).toEqual(attributes.maleCapacity);
      expect(maleDetails.(By.binding('inuse')).getText()).toEqual(attributes.maleInUse);
      expect(maleDetails.(By.binding('ooc')).getText()).toEqual(attributes.maleOutOfCommission);
      expect(maleDetails.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);

      expect(femaleSummary.(By.binding('availability')).getText()).toEqual(attributes.maleAvailability);
      expect(femaleDetails.(By.binding('capacity')).getText()).toEqual(attributes.femaleCapacity);
      expect(femaleDetails.(By.binding('inuse')).getText()).toEqual(attributes.femaleInUse);
      expect(femaleDetails.(By.binding('ooc')).getText()).toEqual(attributes.femaleOutOfCommission);
      expect(femaleDetails.(By.binding('availability')).getText()).toEqual(attributes.femaleAvailability);
    });

    xit('should show negitive male availabilty in red', function () {
      //Arrange
      attributes.maleAvailability = -1;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Male"] .summary .availability.highlight')).isPresent()).toBeTruthy();
    });

    xit('should show negitive female availabilty in red', function () {
      //Arrange
      attributes.femaleAvailability = -1;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Female"] .summary .availability.highlight')).isPresent()).toBeTruthy();
    });

    xit('should show No status on 0 male availabilty', function () {
      //Arrange
      attributes.maleAvailability = 0;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Male"] .summary')).(By.binding('status')).getText()).toEqual('Available Male Beds');
    });

    xit('should show No in status on 0 female availabilty', function () {
      //Arrange
      attributes.femaleAvailability = 0;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Female"] .summary')).(By.binding('status')).getText()).toEqual('Available Female Beds');
    });

    xit('should show 0 male availabilty as FULL', function () {
      //Arrange
      attributes.maleAvailability = 0;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Male"] .summary')).(By.binding('availability')).getText()).toEqual('FULL');
      expect(element.(By.css('.centre:first [gender="Male"] .details')).(By.binding('availability')).getText()).toEqual('FULL');
    });

    xit('should show 0 female availabilty as FULL', function () {
      //Arrange
      attributes.femaleAvailability = 0;
      var centre = getCenterJsonObj(attributes, "updated");

      // Action: Initial POST from API
      mockServer.emit('centre', centreJson);

      // Assert
      expect(element.(By.css('.centre:first [gender="Female"] .summary')).(By.binding('availability')).getText()).toEqual('FULL');
      expect(element.(By.css('.centre:first [gender="Female"] .details')).(By.binding('availability')).getText()).toEqual('FULL');
    });

    xit('should show/hide female centres numbers', function () {
      // Arrange
      var femaleSummary = element.(By.css('.centre:first [gender="Female"] .summary'));

      // Action: Show
      femaleSummary.(By.css('.detail-toggle')).click();

      // Assert: Show
      expect(element.(By.css('.centre:first [gender="Female"] .details')).isPresent()).toBeTruthy();

      // Action: Hide
      femaleSummary.(By.css('.detail-toggle')).click();

      // Assert: Hide
      expect(element.(By.css('.centre:first [gender="Female"] .details')).isPresent()).toBeFalsey();
    });

    xit('should show/hide male centres numbers', function () {
      // Arrange
      var maleSummary = element.(By.css('.centre:first [gender="Male"] .summary'));

      // Action: Show
      maleSummary.(By.css('.detail-toggle')).click();

      // Assert: Show
      expect(element.(By.css('.centre:first [gender="Male"] .details')).isPresent()).toBeTruthy();

      // Action: Hide
      maleSummary.(By.css('.detail-toggle')).click();

      // Assert: Hide
      expect(element.(By.css('.centre:first [gender="Male"] .details')).isPresent()).toBeFalsey();
    });
  });
});

/**
 * Function to return JSON schema relating to Centre model
 * @param attri {object}
 * @param type {string}
 * @returns {object}
 * @constructor
 */
function getCenterJsonObj (attri, type = "updated", rel = "update") {
  var obj = {
    "verb": type,
    "data": {
      "type": "centre",
      "id": "1",
      "attributes": {
        "updated": attri.updated,
        "heartbeatRecieved": attri.heartbeatRecieved,
        "name": attri.name,
        "maleCapacity": attri.maleCapacity,
        "femaleCapacity": attri.femaleCapacity,
        "maleInUse": attri.maleInUse,
        "femaleInUse": attri.femaleInUse,
        "maleOutOfCommission": attri.maleOutOfCommission,
        "femaleOutOfCommission": attri.femaleOutOfCommission,
        "maleAvailability": attri.maleAvailability,
        "femaleAvailability": attri.femaleAvailability,
        "cidReceivedDate": attri.cidReceivedDate,
        "maleActiveMovementsOut": attri.maleActiveMovementsOut,
        "maleActiveMovementsIn": attri.maleActiveMovementsIn,
        "femaleActiveMovementsOut": attri.femaleActiveMovementsOut,
        "femaleActiveMovementsIn": attri.femaleActiveMovementsIn
      },
      "links": [{"link": {"uri": "", "verb": "GET"}, "rel": "findOne"}, {
        "link": {"uri": "", "verb": "GET"},
        "rel": rel
      }, {"link": {"uri": "", "verb": "GET"}, "rel": "destroy"}]
    },
    "id": 1
  };

  return obj;
}