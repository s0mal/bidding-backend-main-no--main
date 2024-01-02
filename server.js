const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
const { authenticateUser } = require('./middlewares/authMiddleware');
const db = require('./db/db');
const { sequelize } = require('./config/database'); // Import Sequelize instance

// Enable CORS for all routes
app.use(cors());

// Import individual routers and controllers
//const userRouter = require('./router/userrouter');
const bidderRouter = require('./router/bidderrouter');
const sellerRouter = require('./router/sellerrouter');
const productRouter = require('./router/productrouter');
const auctionTimerRouter = require('./router/auctiontimerrouter');
const auctionResultsRouter = require('./router/auctionresultrouter');
const transactionRouter = require('./router/transactionrouter');
// const adminRouter = require('./router/adminRouter'); // Corrected import statement
const { generateToken } = require('./helpers/jwtHelper');

// Main router logic
const mainRouter = express.Router();

// product router
mainRouter.use('/products', productRouter);

// // Define routes using controllers
 mainRouter.get('/users', authenticateUser, userRouter.getAllUsers);
 mainRouter.post('/users/signup', userRouter.signup);
 mainRouter.post('/users/login', userRouter.login);

// bidder
mainRouter.use('/bidders', bidderRouter);

// seller
mainRouter.get('/sellers', authenticateUser, sellerRouter.getAllSellers);
mainRouter.post('/sellers', authenticateUser, sellerRouter.createSeller);
mainRouter.get('/sellers/:sellerId', authenticateUser, sellerRouter.getSellerById);
mainRouter.delete('/sellers/:sellerId', authenticateUser, sellerRouter.deleteSeller);

// auction time
mainRouter.use('/auction/timer', auctionTimerRouter);

// auction results
mainRouter.use('/auction/results', auctionResultsRouter);

// transaction router
mainRouter.use('/transaction', transactionRouter);

// admin router
 mainRouter.use('/admin', adminRouter);

// Use the main router
app.use('/api', mainRouter);

const port = process.env.PORT || 5000;

// Test the database connection when the application starts
db.query('SELECT 1 + 1 AS result')
  .then(([rows]) => {
    console.log('Database connection has been established successfully.');
    console.log('Result of the test query:', rows[0].result);

    // Sync the models and start the server after a successful database connection
    sequelize.sync({ force: true }).then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });