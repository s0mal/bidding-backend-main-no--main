const express = require('express');
const adminRouter = express.Router(); //  more specific name, like adminRouter
const adminController = require('../controllers/adminController');
 const isAdmin = require('../middlewares/adminMiddleware');

// Routes
adminRouter.use(isAdmin); // Apply the isAdmin middleware for all routes

adminRouter.get('/admins', adminController.getAllAdmins);
adminRouter.get('/total-biddings', adminController.getTotalBiddings);
adminRouter.get('/total-sellers', adminController.getTotalSellers);
adminRouter.get('/total-transactions', adminController.getTotalTransactions);
adminRouter.get('/all-products', adminController.getAllProducts);

module.exports = adminRouter;