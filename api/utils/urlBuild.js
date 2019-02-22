const joinUrl = require('url-join');
const nconf = require('nconf');

const selfUrl = nconf.get('url.self');
const generateEmailVerifyURL = token => joinUrl(selfUrl, token);

module.exports = {
  generateEmailVerifyURL,
};
