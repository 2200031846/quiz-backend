const express = require('express');
const { getRatings, submitRating, deleteRating } = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/:quiz_id', getRatings);
router.post('/', authMiddleware, submitRating);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteRating);

module.exports = router;
