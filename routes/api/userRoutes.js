const router = require('express').Router();

const {
    getEveryUser,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

router.route("/")
.get(getEveryUser)
.post(createNewUser);

router.route("/:id")
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;