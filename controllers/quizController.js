const db = require("../config/db");


// 📜 GET ALL QUIZZES
exports.getQuizzes = (req, res) => {
    const query = "SELECT * FROM quizzes";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error fetching quizzes:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(200).json(results);
    });
};

// 🔍 GET A SINGLE QUIZ BY ID
exports.getQuiz = (req, res) => {
    const quizId = req.params.id;
    const query = "SELECT * FROM quizzes WHERE id = ?";
    
    db.query(query, [quizId], (err, results) => {
        if (err) {
            console.error("❌ Error fetching quiz:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(results[0]);
    });
};

