// userRoutes.js
import express from 'express';
import { getUsers, getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);         // all users (optional)
router.get('/me', protect, getMe); // ✅ logged-in user data

export default router;
