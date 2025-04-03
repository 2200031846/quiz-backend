const Feedback = require('../models/Feedback');

// 📌 Get All Feedback (Admin Only)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findAll();
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedback', error });
    }
};

// 📌 Submit Feedback (User)
exports.submitFeedback = async (req, res) => {
    try {
        const { message } = req.body;
        const user_id = req.user.id; // Extract user ID from JWT token

        if (!message) {
            return res.status(400).json({ message: 'Feedback message is required' });
        }

        const feedback = await Feedback.create({ user_id, message });
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};

// 📌 Delete Feedback (Admin Only)
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        await feedback.destroy();
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error });
    }
};
