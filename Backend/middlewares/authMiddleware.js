// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to protect authenticated routes.
 * Allows guest users (no token) to pass through if `allowGuest` is set on the request.
 */
export const protect = async (req, res, next) => {
  let token;

  // ✅ Allow guest access for certain routes if explicitly allowed
  if (req.allowGuest === true) {
    req.user = null; // Mark as guest
    return next();
  }

  // ✅ Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Find user
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth error:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
