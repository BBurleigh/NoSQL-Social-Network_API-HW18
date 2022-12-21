const router = require('express').Router();

const {
    getEveryUser,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route("/")
.get(getEveryUser)
.post(createNewUser);

router.route("/:id")
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend)

module.exports = router;