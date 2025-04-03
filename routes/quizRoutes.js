const express = require("express");
const {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz
} = require("../controllers/quizController");

const router = express.Router();

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     description: Adds a new quiz to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: integer
 *               timeLimit:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               coins:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createQuiz);

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

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update a quiz by ID
 *     description: Updates quiz details in the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: integer
 *               timeLimit:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               coins:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateQuiz);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a quiz by ID
 *     description: Removes a quiz from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteQuiz);

module.exports = router;
