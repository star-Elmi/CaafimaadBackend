import User from '../models/user.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not found' });
  }
  res.json(req.user);
};
