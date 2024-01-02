const db = require('../db/db');

const createBidder = async (req, res) => {
  try {
    const { name, email, /* other properties */ } = req.body;

    // Validate input
    if (!name || !email /* other validations */) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Check if the email is already in use
    const existingBidder = await Bidder.findOne({ where: { email } });
    if (existingBidder) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Create a new bidder in the database
    const newBidder = await Bidder.create({
      name,
      email,
      // other properties
    });

    res.status(201).json(newBidder);
  } catch (error) {
    console.error('Error creating bidder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBidder = async (req, res) => {
  try {
    const bidderId = req.params.id;
    const { name, email, /* other properties */ } = req.body;

    // Validate input
    if (!name || !email /* other validations */) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Update bidder details in the database
    const [updatedRows] = await Bidder.update(
      { name, email, /* other properties */ },
      { where: { id: bidderId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Bidder not found' });
    }

    res.json({ message: 'Bidder updated successfully' });
  } catch (error) {
    console.error('Error updating bidder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBidder = async (req, res) => {
  try {
    const bidderId = req.params.id;

    // Delete the bidder from the database
    const deletedRows = await Bidder.destroy({ where: { id: bidderId } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Bidder not found' });
    }

    res.json({ message: 'Bidder deleted successfully' });
  } catch (error) {
    console.error('Error deleting bidder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createBidder,
  updateBidder,
  deleteBidder,
};
