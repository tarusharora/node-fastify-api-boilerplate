const request = require('request-promise-native');
const nconf = require('nconf');

const externalAPITimeout = nconf.get('app.externalAPITimeout');

const getRequest = ({url, options}) => request.get(url, {...options, timeout: externalAPITimeout, json:true});

const postRequest = ({url, options}) => request.post(url, {...options, timeout: externalAPITimeout, json:true});

const putRequest = ({url, options}) => request.put(url, {...options, timeout: externalAPITimeout, json:true});

const patchRequest = ({url, options}) => request.patch(url, {...options, timeout: externalAPITimeout, json:true});

const deleteRequest = ({url, options}) => request.delete(url, {...options, timeout: externalAPITimeout, json:true});

module.exports = {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest
}