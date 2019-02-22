const crypto = require('crypto');

const getRandomBytes = size => crypto.randomBytes(size).toString('hex');

module.exports = {
  getRandomBytes,
};
