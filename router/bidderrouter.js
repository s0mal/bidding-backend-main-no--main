// router/bidderrouter.js
const express = require('express');
const bidderController = require('../controllers/biddercontroller');

const bidderrouter = express.Router();


// Create a new bidder
bidderrouter.post('/bidders', bidderController.createBidder);

// Update a bidder by ID
bidderrouter.put('/bidders/:id', bidderController.updateBidder);

// Delete a bidder by ID
bidderrouter.delete('/bidders/:id', bidderController.deleteBidder);


module.exports = bidderrouter;