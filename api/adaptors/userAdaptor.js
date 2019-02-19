const nconf =require('nconf');
const joinUrl = require('url-join');

const { getRequest } = require('../utils/httpClient');

const usersAPIUrl = nconf.get('url.usersAPI');


const getUsers = ({page = 1}) => getRequest({
    url: joinUrl(usersAPIUrl, 'users', `?page=${page}`)
})

module.exports = {
    getUsers
}