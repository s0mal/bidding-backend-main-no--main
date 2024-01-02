const express = require('express');
const transactionController = require('../controllers/transactioncontroller');

const transactionRouter = express.Router();

// Define routes using the transaction controller
transactionRouter.post('/process', transactionController.processTransaction);
transactionRouter.get('/user/:userId', transactionController.getTransactionsForUser);

module.exports = transactionRouter;