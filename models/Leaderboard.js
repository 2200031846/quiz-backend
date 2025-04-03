const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Quiz = require('./Quiz');

const Leaderboard = sequelize.define('Leaderboard', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    },
    quiz_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Quiz, key: 'id' }
    },
    score: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Leaderboard;
