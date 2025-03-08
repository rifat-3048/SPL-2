import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createAppointment,
    getUserAppointments,
    getAllAppointments,
    updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/my-appointments', protect, getUserAppointments);
router.get('/all', protect, getAllAppointments);
router.patch('/:id/status', protect, updateAppointmentStatus);

export default router;