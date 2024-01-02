const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Myproject', 'root', 'rehma123.', {
  host: 'root',
  dialect: 'mysql',
  // other configuration options...
});

module.exports = sequelize;
