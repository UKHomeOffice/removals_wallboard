const keycloakRedirect = require('keycloak-redirect');

/**
 * Init Key Cloak Redirect
 * @see ./entry-point.sh for window.config declaration and assignment
 * @returns {boolean}
 * @example Local environment, update config:
 *  var config = {
 *   "keycloakUrl": 'https://keycloak.digital.homeoffice.gov.uk/auth/realms/ircbd/protocol/openid-connect/auth',
 *   "backend": 'https://api.ircbd.homeoffice.gov.uk/',
 *   "clientId": "ircbd-api"
 * };
 */
function KeycloakInitService() {
  'ngInject';
  var config = window.config;
  var client = new XMLHttpRequest();
  keycloakRedirect.authenticate(config, client);

  return true;
}

export default {
  name: 'KeycloakInitService',
  fn: KeycloakInitService
};