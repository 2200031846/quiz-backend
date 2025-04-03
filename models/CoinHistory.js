const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const CoinHistory = sequelize.define('CoinHistory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    },
    coins_added: { type: DataTypes.INTEGER, defaultValue: 0 },
    coins_used: { type: DataTypes.INTEGER, defaultValue: 0 },
    reason: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = CoinHistory;
