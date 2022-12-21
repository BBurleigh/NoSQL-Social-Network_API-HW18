const { User } = require('../models/');

module.exports = {

    getEveryUser(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getOneUser(req, res) {

    },

    createNewUser(req, res) {

    },

    updateUser(req, res) {

    },

    deleteUser(req, res) {

    },

    addFriend(req, res) {

    },

    deleteFriend(req, res) {

    }

};