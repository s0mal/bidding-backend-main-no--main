const Admin = require('../models/Admin');
const User = require('../models/User');
const sequelize = require('../config/database');

const adminController = {
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.findAll();
      console.log(result)
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // New functionality for admins
  getTotalBiddings: async (req, res) => {
    try {
      const [result] = await sequelize.query('SELECT COUNT(*) AS totalBiddings FROM biddings');
      const { totalBiddings } = result[0];
      console.log(result)
      res.status(200).json({ totalBiddings });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTotalSellers: async (req, res) => {
    try {
      const [result] = await sequelize.query('SELECT COUNT(*) AS totalSellers FROM users WHERE role = "seller"');
      const { totalSellers } = result[0];
      res.status(200).json({ totalSellers });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTotalTransactions: async (req, res) => {
    try {
      const [result] = await sequelize.query('SELECT COUNT(*) AS totalTransactions FROM transactions');
      const { totalTransactions } = result[0];
      res.status(200).json({ totalTransactions });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await sequelize.query('SELECT * FROM products', { type: sequelize.QueryTypes.SELECT });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = {
getAllAdmins: adminController.getAllAdmins,
getTotalBiddings: adminController.getTotalBiddings,
getTotalSellers: adminController.getTotalSellers,
getTotalTransactions: adminController.getTotalTransactions,
getAllProducts: adminController.getAllProducts,
};