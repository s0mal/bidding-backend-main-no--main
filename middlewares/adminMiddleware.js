// adminMiddleware.js

// Define a middleware function called isAdmin that takes three parameters: req, res, and next.
const isAdmin = (req, res, next) => {
  // Assuming you have the user object attached to the request (e.g., after authentication)
  const user = req.user;

  // Check if the user is an admin
  if (user && user.isAdmin) {
      next(); // User is an admin, continue to the next middleware or route
  } else {
      res.status(403).send('Forbidden'); // User is not an admin, send forbidden status
  }
};

// Export the isAdmin middleware so that it can be used in other parts of the application.
module.exports = isAdmin;