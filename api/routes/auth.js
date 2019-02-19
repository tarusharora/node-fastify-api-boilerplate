const { validatePostLogin, validatePostSignup } = require('../validations/auth');
const { postLogin, postSignup } = require('../controllers/authController');

module.exports = async (fastify) => {
  fastify.post('/auth/login', validatePostLogin, postLogin);
  fastify.post('/auth/signup', validatePostSignup, postSignup);
};
