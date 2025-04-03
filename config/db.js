const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// ✅ Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database Connected Successfully!");

        // ✅ Sync database schema only after successful connection
        await sequelize.sync({ alter: true });
        console.log("✅ Database schema updated");
    } catch (error) {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1);
    }
};

// ✅ Export sequelize and connectDB function
module.exports = { sequelize, connectDB };
