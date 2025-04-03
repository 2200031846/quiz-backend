const express = require('express');
const { getLeaderboard, submitScore, deleteScore } = require('../controllers/leaderboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', getLeaderboard);
router.post('/', authMiddleware, submitScore);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteScore);

module.exports = router;
