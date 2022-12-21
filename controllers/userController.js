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
        ? res.status(404).json({ message: 'You cannot find this user since this ID does not exist.'})
        : res.json(user)    
    )
    .catch((err) => res.status(500).json(err));
    },

    createNewUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'Cannot update user since this ID does not exist.' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        
    },

    addFriend(req, res) {

    },

    deleteFriend(req, res) {

    }

};