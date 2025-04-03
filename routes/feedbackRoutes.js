 
const express = require('express');
const { getAllFeedback, submitFeedback, deleteFeedback } = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getAllFeedback);
router.post('/', authMiddleware, submitFeedback);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteFeedback);

module.exports = router;
