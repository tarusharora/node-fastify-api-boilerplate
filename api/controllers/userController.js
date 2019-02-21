const { getUsers, createUser } = require('../adaptors/userAdaptor');

const getUsersCtrl = async (req, res) => {
    try {
        const { page } = req.query;
        const users = await getUsers({ page });
        res.send(users);
    }
    catch (err) {
        throw err;
    }
}

const createUsersCtrl = async (req, res) => {
    try {
        const body = req.body;
        const user = await createUser({body});
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getUsersCtrl,
    createUsersCtrl
}