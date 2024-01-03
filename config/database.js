const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Myproject', 'localhost', 'rehma123.', {
  host: 'localhost',
  dialect: 'mysql',
  // other configuration options...
});

try {
  
} catch (error) {
  
}



module.exports = sequelize;
