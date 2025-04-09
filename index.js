const express = require("express");
const { sequelize, connectDB } = require("./config/db"); // ✅ Import DB connection
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes"); // ✅ Import Quiz Routes

const app = express();
app.use(express.json());

// ✅ Load API routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/quizzes", quizRoutes); // ✅ Add Quiz Routes

// ✅ Add Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Ensure this is present

// ✅ Start Server after DB Connection
connectDB().then(() => {
    app.listen(5000, () => {
        console.log("🚀 Server running on http://quiz-backend-production-4024.up.railway.app");
        console.log("📄 Swagger Docs available at http://quiz-backend-production-4024.up.railway.app/api-docs"); // ✅ Add this log
    });
}).catch(err => console.error("❌ Server Startup Failed:", err));
