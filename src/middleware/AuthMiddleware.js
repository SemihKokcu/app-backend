const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Claim = require('../models/Claim');

const authMiddleware = (requiredClaims) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      if (!decodedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (requiredClaims != null) {
        const authorizedClaimsFromToken = requiredClaims.every(claim =>
          decodedToken.claims.includes(claim)
        );
        if (!authorizedClaimsFromToken) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
};


const getEmailAndIdFromToken = (req) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const email = decodedToken.email;
    const userId = decodedToken.userId;
    return { email, userId };
  } catch (error) {
    return null;
  }
};

module.exports = {authMiddleware,getEmailAndIdFromToken};
