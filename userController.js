const { User, Thought } = require('../models');

const userController = {
  getUsers( req, res ){
    User.find()
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },

  // getSingleUser by id
  getSingleUser( req, res ){
    User.findOne({_id: req.params.id})
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then((dbUserData) => {
      if (!dbUserData){
        return res.status(404).json({
          message: 'No user with this id.'
        })
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },

  createUsers({ body }, res ){
    User.create(body)
    // .select('-__v')
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({_id: params.id})
    .then((dbUserData) => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },

  addFriendToFriendList({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
    .populate({ 
      path: 'friends', 
      select: ('-__v') 
    })
    .select('-__v')
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },

  removeFriendFromFriendList({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId }},
      { new: true }
    )
    .populate({ 
      path: 'friends', 
      select: ('-__v') 
    })
    .select('-__v')
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  }


}


module.exports = userController;