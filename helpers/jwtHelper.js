const jwt = require('jsonwebtoken');

const secretKey = 'Secret_key1'; //  we can Replace this with a strong, secret key

const generateToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: '2min' }; // Adjust the expiration time as needed
  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};