const db = require("../config/db");

// 🚀 CREATE A NEW QUIZ
exports.createQuiz = (req, res) => {
    const { name, questions, timeLimit, difficulty, coins } = req.body;
    const query = "INSERT INTO quizzes (name, questions, timeLimit, difficulty, coins) VALUES (?, ?, ?, ?, ?)";
    
    db.query(query, [name, questions, timeLimit, difficulty, coins], (err, result) => {
        if (err) {
            console.error("❌ Error creating quiz:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Quiz created successfully", quizId: result.insertId });
    });
};

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

// ✏️ UPDATE A QUIZ
exports.updateQuiz = (req, res) => {
    const quizId = req.params.id;
    const { name, questions, timeLimit, difficulty, coins } = req.body;
    const query = "UPDATE quizzes SET name = ?, questions = ?, timeLimit = ?, difficulty = ?, coins = ? WHERE id = ?";
    
    db.query(query, [name, questions, timeLimit, difficulty, coins, quizId], (err, result) => {
        if (err) {
            console.error("❌ Error updating quiz:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz updated successfully" });
    });
};

// ❌ DELETE A QUIZ
exports.deleteQuiz = (req, res) => {
    const quizId = req.params.id;
    const query = "DELETE FROM quizzes WHERE id = ?";
    
    db.query(query, [quizId], (err, result) => {
        if (err) {
            console.error("❌ Error deleting quiz:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz deleted successfully" });
    });
};
