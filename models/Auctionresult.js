// models/auctionresult.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuctionResult = sequelize.define('AuctionResult', {
  // Define attributes here, you can customize based on your requirements
  auctionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  winnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations if needed
const associate = (models) => {
  const { User } = models;
  AuctionResult.belongsTo(User, { foreignKey: 'winnerId', as: 'winner' });
};

module.exports = { AuctionResult, associate };