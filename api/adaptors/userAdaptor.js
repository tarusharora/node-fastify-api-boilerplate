const nconf =require('nconf');
const joinUrl = require('url-join');

const { getRequest, postRequest } = require('../utils/httpClient');

const usersAPIUrl = nconf.get('url.usersAPI');


const getUsers = ({page = 1}) => getRequest({
    url: joinUrl(usersAPIUrl, 'users', `?page=${page}`)
})

const createUser = ({body}) => postRequest({
    url: joinUrl(usersAPIUrl, 'users'),
    options: {
        body
    }    
})

module.exports = {
    getUsers,
    createUser
}