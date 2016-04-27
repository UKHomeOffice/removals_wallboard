const keycloakRedirect = require('keycloak-redirect');

/**
 * Init Key Cloak Redirect
 * @see ./entry-point.sh for window.config declaration and assignment
 * @returns {boolean}
 * @example Local environment testing against Dev API, update config:
 *  var config = {
 *   "keycloakUrl": 'https://keycloak.digital.homeoffice.gov.uk/auth/realms/ircbd/protocol/openid-connect/auth',
 *   "backend": 'https://api-ircbd-dev.notprod.homeoffice.gov.uk',
 *   "clientId": "ircbd-dev"
 * };
 */
function KeycloakInitService($window) {
  'ngInject';
  var config = window.config;
  var client = new XMLHttpRequest();
  setTimeout(function () {
    keycloakRedirect.authenticate(config, client, $window);
  }, 2000);

  return true;
}

export default {
  name: 'KeycloakInitService',
  fn: KeycloakInitService
};