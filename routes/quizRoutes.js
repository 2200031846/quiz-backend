const express = require("express");
const {
    getQuizzes,
    getQuiz
} = require("../controllers/quizController");

const router = express.Router();

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Retrieve all quizzes
 *     description: Fetches a list of all quizzes.
 *     responses:
 *       200:
 *         description: A list of quizzes
 *       500:
 *         description: Server error
 */
router.get("/", getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Retrieve a quiz by ID
 *     description: Fetches details of a quiz using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz details retrieved successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getQuiz);
module.exports = router;