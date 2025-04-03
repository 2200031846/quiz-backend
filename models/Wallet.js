const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // ✅ Ensure correct import

const Wallet = sequelize.define('Wallet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = Wallet;
