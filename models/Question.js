const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Quiz = require('./Quiz');

const Question = sequelize.define('Question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quiz_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Quiz, key: 'id' }
    },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    option_1: { type: DataTypes.STRING, allowNull: false },
    option_2: { type: DataTypes.STRING, allowNull: false },
    option_3: { type: DataTypes.STRING, allowNull: false },
    option_4: { type: DataTypes.STRING, allowNull: false },
    correct_option: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = Question;
