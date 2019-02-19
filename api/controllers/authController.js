const nconf = require('nconf');

const User = require('../models/User');
const { SignUpResponse } = require('../models/Auth');
const { INVALID_PASSWORD, USER_DOESNT_EXISTS, USER_EXISTS } = require('../models/Errors');

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() }).exec();
        if (!user) {
            res.send(new Error(USER_DOESNT_EXISTS));
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            const { id } = user;
            const token = await res.jwtSign({ id }, { expiresIn: nconf.get('app.userJwtExpiry') });
            return res.send(new SignUpResponse({ email, token, id }));
        }
        return res.send(new Error(INVALID_PASSWORD));
    } catch (err) {
        throw err;
    }
};

const postSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.code(409);
            res.send(new Error(USER_EXISTS));
            return;
        }
        const user = new User({
            email,
            password,
        });
        const newUser = await user.save();
        const { id, email: userEmail } = newUser;
        const token = await res.jwtSign({ id }, { expiresIn: nconf.get('app.userJwtExpiry') });
        res.send(new SignUpResponse({ email: userEmail, token, id }));
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    postLogin,
    postSignup,
};