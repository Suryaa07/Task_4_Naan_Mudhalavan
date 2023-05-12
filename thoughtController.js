const { User, Thought } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
    // .sort({
    //   createdAt: -1
    // })
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },

  // getSingleThought by id
  getSingleThought({ params }, res) {
    Thought.findOne({_id: params.thoughtId})
    // .sort({
    //   createdAt: -1
    // })
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
    .then(thought => {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: thought._id } },
        { new: true },
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData){
          res.status(404).json({ message: 'No thought found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err)
      })
    });
  },

  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      body,
      { runValidators: true, new: true }
    )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with this id'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  },

  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(
      { _id: params.thoughtId }, 
      { runValidators: true, new: true})
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  },

  addReactionToAThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: {reactions: body }},
      { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No reaction found with this id'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  },

  removeReactionFromAThought({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: {reactions: {reactionId : params.reactionId}}},
      { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No reaction found'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  }
}


module.exports = thoughtController;