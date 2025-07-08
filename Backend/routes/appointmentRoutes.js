import express from 'express';
import { bookAppointment, getUserAppointments } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my', protect, getUserAppointments);

export default router;
