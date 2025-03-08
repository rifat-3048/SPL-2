import express from 'express';
import {
    getDoctors,
    createDoctor,
    getDoctorById,
    updateDoctorImage
} from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.post('/', protect, createDoctor);
router.patch('/:id/image', protect, updateDoctorImage);

export default router;