const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactionToAThought,
  removeReactionFromAThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts);

// /api/thoughts/:userId
router.route('/:userId')
.post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReactionToAThought);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReactionFromAThought);

module.exports = router;