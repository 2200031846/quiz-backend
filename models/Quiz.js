const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
  name: { type: DataTypes.STRING, allowNull: false },
  questions: { type: DataTypes.INTEGER, allowNull: false },
  timeLimit: { type: DataTypes.STRING, allowNull: false },
  difficulty: { type: DataTypes.STRING, allowNull: false },
  coins: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: false,
  tableName: 'quizzes',
});

module.exports = Quiz;
