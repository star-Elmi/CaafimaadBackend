import express from 'express';
import { getPrediction } from '../controllers/chatController.js';

const router = express.Router();

router.post('/predict', getPrediction);

export default router;
