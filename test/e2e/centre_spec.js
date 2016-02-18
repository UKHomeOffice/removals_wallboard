/*global browser, by */

'use strict';

describe('E2E: Main', function () {

  beforeEach(function () {
    browser.get('/');
    browser.waitForAngular();
  });

  /**
   * Mock Socket Server
   */
  describe('Mock Socket Server: ', function () {
    xit('should connect', function () {
    });

    xit('should reconnect', function () {
    });

    xit('should disconnect', function () {
    });

  });

  /**
   * Mock Socket Client
   */
  describe('Sails Socket IO Client: ', function () {

    describe('on /: ', function () {
      xit('should listen on create event', function () {

      });
      xit('should listen on update event', function () {

      });
      xit('should listen on delete event', function () {

      });
    });

    describe('on /centres: ', function () {
      xit('should listen on create event', function () {

      });
      xit('should listen on update event', function () {

      });
      xit('should listen on delete event', function () {

      });
    });

    describe('on /centre/*: ', function () {
      xit('should show data received on create event', function () {

      });
      xit('should show data received on update event', function () {

      });
      xit('should show data received on delete event', function () {

      });
    });
  });

  /**
   * Controllers & Views
   */
  describe('Controllers & Views: ', function () {
    describe('Root: ', function () {
      describe('Centres: ', function () {
        xit('should show current data binded to scope', function () {

        });
        xit('should show updated data binded to scope ', function () {

        });

        xit('should show negitive male availabilty in red', function () {

        });
        xit('should show negitive female availabilty in red', function () {

        });

        xit('should show 0 male availabilty as FULL', function () {

        });
        xit('should show 0 female availabilty as FULL', function () {

        });

        xit('should show/hide female centres numbers', function () {

        });
        xit('should show/hide male centres numbers', function () {

        });
      });
    });
  });

});