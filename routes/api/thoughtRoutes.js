const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addThoughtReaction,
  removeThoughtReaction
} = require('../../controllers/thoughtController.js');

// /api/Users
router.route('/').get(getThoughts).post(createThought);

// /api/Users/:UserId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeThoughtReaction)

router
  .route('/:thoughtId/reactions')
  .post(addThoughtReaction)

module.exports = router;