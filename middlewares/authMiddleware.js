// middlewares/authMiddleware.js
const { verifyToken } = require('../helpers/jwtHelper');
const User = require('../models/User');
const Admin = require('../models/Admin');

const authenticateUser = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.status(401).send('Unauthorized');
  }

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      req.user = user; // Attach the user to the request object for later use
      next(); // Call the next middleware in the chain
    })
    .catch((error) => {
      console.error('Error authenticating user:', error);
      res.status(500).send('Internal Server Error');
    });
};

const authenticateAdmin = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const adminId = verifyToken(token);

  if (!adminId) {
    return res.status(401).send('Unauthorized');
  }

  Admin.findByPk(adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(401).send('Unauthorized');
      }

      req.admin = admin; // Attach the admin to the request object for later use
      next(); // Call the next middleware in the chain
    })
    .catch((error) => {
      console.error('Error authenticating admin:', error);
      res.status(500).send('Internal Server Error');
    });
};

const extractToken = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  return authorizationHeader.split(' ')[1];
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};