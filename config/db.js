const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// ✅ Initialize Sequelize

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql",
    logging: false, // Optional: Disable logging
  });

  
sequelize
.authenticate()
.then(() => console.log("✅ Database connected to Railway"))
.catch((err) => console.error("❌ Database connection failed:", err));
  

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



