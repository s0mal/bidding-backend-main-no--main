// router/auctiontimerrouter.js
const express = require('express');

const auctionTimerRouter = express.Router();

// Example: Store the timestamp when the auction starts
let auctionStartTime = null;

// Start the auction timer
auctionTimerRouter.post('/start', (req, res) => {
  // Set the auction start time
  auctionStartTime = Date.now();

  res.status(200).json({ message: 'Auction timer started successfully' });
});

// Get the remaining time in the auction
auctionTimerRouter.get('/remainingTime', (req, res) => {
  if (!auctionStartTime) {
    return res.status(400).json({ error: 'Auction timer not started' });
  }

  // Example: Calculate remaining time (you might have your own logic)
  const currentTime = Date.now();
  const elapsedTime = currentTime - auctionStartTime;
  const remainingTimeInSeconds = 3600 - Math.floor(elapsedTime / 1000); // Assuming a 1-hour auction

  res.status(200).json({ remainingTimeInSeconds });
});

module.exports = auctionTimerRouter;