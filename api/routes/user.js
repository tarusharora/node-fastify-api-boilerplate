const {  getUsersCtrl } = require('../controllers/userController')

module.exports = async function (fastify) {
    fastify.get('/users', getUsersCtrl)
  }