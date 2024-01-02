// router/sellerrouter.js
const express = require('express');
const sellerController = require('../controllers/sellercontroller');

const sellerRouter = express.Router();

// Define routes using the seller controller
sellerRouter.get('/', sellerController.getAllSellers);
sellerRouter.post('/', sellerController.createSeller);
sellerRouter.get('/:sellerId', sellerController.getSellerById);
sellerRouter.delete('/sellers/:sellerId', sellerController.deleteSeller);

module.exports = sellerRouter;