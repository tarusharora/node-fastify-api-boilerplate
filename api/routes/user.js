const {  getUsersCtrl, createUsersCtrl } = require('../controllers/userController')

module.exports = async function (fastify) {
    fastify.get('/users', getUsersCtrl)
    fastify.post('/users', createUsersCtrl)
  }