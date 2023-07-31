import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const UNAUTHORIZED = 401;

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        throw new Error('User not found');
      }
      next();
    } else {
      throw new Error('Not Authorized, no token');
    }
  } catch (error) {
    console.error(error);
    res.status(UNAUTHORIZED);
    throw new Error('Authorization failed');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(UNAUTHORIZED);
    throw new Error('Not Authorized as an admin');
  }
};

export { protect, admin };
