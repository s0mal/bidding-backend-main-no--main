const express = require("express");
const app = express();
const cors = require('cors');
const { authenticateUser } = require('./middlewares/authMiddleware');
const db = require('./db/db');
const { sequelize } = require('./config/database'); // Import Sequelize instance

// Enable CORS for all routess
app.use(cors());


// Import individual routers and controllers
const userRouter = require('./router/userrouter');
const bidderRouter = require('./router/bidderrouter');
const sellerRouter = require('./router/sellerrouter');
const productRouter = require('./router/productrouter');
const auctionTimerRouter = require('./router/auctiontimerrouter');
const auctionResultsRouter = require('./router/auctionresultrouter');
const transactionRouter = require('./router/transactionrouter');
const adminRouter = require('./router/adminRouter'); // Corrected import statement
const { generateToken } = require('./helpers/jwtHelper');

// Main router logic
const mainRouter = express.Router();

// product router
mainRouter.use('/api', productRouter);

// bidder
mainRouter.use('/api', bidderRouter);

// auction time
mainRouter.use('/api', auctionTimerRouter);

// auction results
mainRouter.use('/api', auctionResultsRouter);

// transaction router
mainRouter.use('/api', transactionRouter);

// admin router
 mainRouter.use('/api', adminRouter);


const port = process.env.PORT || 5000;

// Test the database connection when the application starts
db.query('SELECT 1 + 1 AS result')
  .then(([rows]) => {
    console.log('Database connection has been established successfully.');
    console.log('Result of the test query:', rows[0].result);

    // Sync the models and start the server after a successful database connection
    sequelize.sync({ force: false }).then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });