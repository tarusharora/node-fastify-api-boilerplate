const mongoose = require('mongoose');
const nconf = require('nconf');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: {
    type: Date, required: true, default: Date.now, expires: nconf.get('emailTokenExpiryInSeconds'),
  },
});

const EmailVerifyToken = mongoose.model('EmailVerifyToken', tokenSchema);

module.exports = EmailVerifyToken;
