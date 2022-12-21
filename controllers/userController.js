const { User } = require('../models/');

module.exports = {

    getEveryUser(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'There is no user with that ID.'})
        : res.json(user)    
    )
    .catch((err) => res.status(500).json(err));
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