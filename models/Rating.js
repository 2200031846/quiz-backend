const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Quiz = require('./Quiz');

const Rating = sequelize.define('Rating', {
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
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    feedback: { type: DataTypes.TEXT, allowNull: true },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Rating;
