const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');
const Quiz = require('../models/Quiz');

// 📌 Get All Leaderboard Entries (Public)
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] },
                { model: Quiz, attributes: ['title'] }
            ],
            order: [['score', 'DESC']] // Sort by highest score
        });

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};

// 📌 Submit Score (User)
exports.submitScore = async (req, res) => {
    try {
        const { quiz_id, score } = req.body;
        const user_id = req.user.id; // Extract user ID from JWT token

        if (!quiz_id || score === undefined) {
            return res.status(400).json({ message: 'Quiz ID and Score are required' });
        }

        const leaderboardEntry = await Leaderboard.create({ user_id, quiz_id, score });

        res.status(201).json({ message: 'Score submitted successfully', leaderboardEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting score', error });
    }
};

// 📌 Delete Leaderboard Entry (Admin Only)
exports.deleteScore = async (req, res) => {
    try {
        const entry = await Leaderboard.findByPk(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Leaderboard entry not found' });
        }

        await entry.destroy();
        res.json({ message: 'Leaderboard entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting leaderboard entry', error });
    }
};
