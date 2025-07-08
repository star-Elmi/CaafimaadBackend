import express from 'express';
import {
  getPrediction,
  getUserChats,
  createChatSession,
  appendToChatSession,
  deleteChatSession,
  renameChatSession,
} from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/my-chats', protect, getUserChats);
router.post('/', protect, createChatSession);
router.put('/:id', protect, appendToChatSession);
router.delete('/:id', protect, deleteChatSession);
router.patch('/:id/title', protect, renameChatSession);

router.post('/predict', (req, res, next) => {
  req.allowGuest = true;
  next();
}, protect, getPrediction);

export default router;
