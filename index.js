const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App API! Navigate to /api-docs for API documentation.");
});

// Load API routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/quizzes", quizRoutes);

// Add Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server after DB Connection
connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
      console.log("📄 Swagger Docs available at http://localhost:5000/api-docs");
    });
  })
  .catch((err) => console.error("❌ Server Startup Failed:", err));
