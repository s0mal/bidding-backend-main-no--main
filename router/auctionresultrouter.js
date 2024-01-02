const express = require('express');
const { Op } = require('sequelize'); // Import Sequelize's Op (operators)
const { User } = require('../models/User'); // Import the User model

const auctionResultsRouter = express.Router();

// Endpoint to get auction results for a specific auction
auctionResultsRouter.get('/:auctionId', async (req, res) => {
  try {
    // Call the determineWinner function to find the winner for the specified auction
    const winner = await determineWinner(req.params.auctionId);

    // Check if a winner is found
    if (winner) {
      // Send the winner's details as a response
      res.send(`Winner: ${winner.username} with bidAmount ${winner.bidAmount}`);
    } else {
      // Send a message if no winner is found
      res.send('No winner found');
    }
  } catch (error) {
    // Handle any errors and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to determine the winner bidder for a specific auction
async function determineWinner(auctionId) {
  try {
    // Query the database to find the user with the highest bidAmount for the specified auction
    const winner = await User.findOne({
      where: { bidAmount: { [Op.ne]: null } }, // Exclude users with null bidAmount
      order: [['bidAmount', 'DESC']], // Order the results by bidAmount in descending order
      attributes: ['username', 'bidAmount'], // Select only the username and bidAmount fields
      raw: true, // Return plain JavaScript objects instead of Sequelize instances
    });

    return winner; // Return the winner
  } catch (error) {
    console.error(error);
    return null; // Return null in case of an error
  }
}

module.exports = auctionResultsRouter; // Export the auctionResultsRouter for use in other files






// const express = require('express');
// const auctionResultsRouter = express.Router();

// // Define routes and handle logic directly in the router or use existing controllers
// auctionResultsRouter.get('/:auctionId', (req, res) => {
//   // Handle logic for retrieving auction results, You can implement the logic here or call existing functions
//   res.send('Auction Results for Auction ID: ' + req.params.auctionId);
// });

// module.exports = auctionResultsRouter;