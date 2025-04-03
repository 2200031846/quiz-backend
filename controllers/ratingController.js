const Rating = require('../models/Rating');
const User = require('../models/User');
const Quiz = require('../models/Quiz');

// 📌 Get All Ratings for a Quiz (Public)
exports.getRatings = async (req, res) => {
    try {
        const { quiz_id } = req.params;
        
        const ratings = await Rating.findAll({
            where: { quiz_id },
            include: [{ model: User, attributes: ['name', 'email'] }]
        });

        if (ratings.length === 0) {
            return res.status(404).json({ message: 'No ratings found for this quiz' });
        }

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }
};

// 📌 Submit Rating for a Quiz (User)
exports.submitRating = async (req, res) => {
    try {
        const { quiz_id, rating, feedback } = req.body;
        const user_id = req.user.id; // Extract user ID from JWT token

        if (!quiz_id || !rating) {
            return res.status(400).json({ message: 'Quiz ID and rating are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const quizExists = await Quiz.findByPk(quiz_id);
        if (!quizExists) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const userRating = await Rating.create({ user_id, quiz_id, rating, feedback });

        res.status(201).json({ message: 'Rating submitted successfully', userRating });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting rating', error });
    }
};

// 📌 Delete Rating (Admin Only)
exports.deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByPk(req.params.id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        await rating.destroy();
        res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rating', error });
    }
};
