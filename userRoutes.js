const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUser,
  addFriendToFriendList,
  removeFriendFromFriendList,
} = require('../../controllers/userController');

// /api/users
router.route('/')
.get(getUsers)
.post(createUsers);

// /api/users/:id
router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId')
.post(addFriendToFriendList)
.delete(removeFriendFromFriendList);

module.exports = router;