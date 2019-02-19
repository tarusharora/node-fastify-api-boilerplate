const request = require('request-promise-native');
const nconf = require('nconf');

const externalAPITimeout = nconf.get('app.externalAPITimeout');

const getRequest = ({url, options}) => request.get(url, {...options, timeout: externalAPITimeout, json:true});

module.exports = {
    getRequest
}