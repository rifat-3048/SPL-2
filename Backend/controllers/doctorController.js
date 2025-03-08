import Doctor from '../models/Doctor.js';
import mongoose from 'mongoose';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res) => {
    try {
        console.log('Fetching all doctors...');
        const doctors = await Doctor.find();
        console.log(`Found ${doctors.length} doctors`);
        
        res.json({
            success: true,
            data: doctors
        });
    } catch (error) {
        console.error('Error in getDoctors:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching doctor with ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid doctor ID format'
            });
        }

        const doctor = await Doctor.findById(id);
        console.log('Found doctor:', doctor);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.json({
            success: true,
            data: doctor
        });
    } catch (error) {
        console.error('Error in getDoctorById:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private
export const createDoctor = async (req, res) => {
    try {
        console.log('Creating doctor with data:', req.body);
        const { name, brand, price, experience, description, category } = req.body;

        const doctor = new Doctor({
            name,
            brand,
            price,
            experience,
            description,
            category,
            userId: req.user._id,
            imagePath: '/src/assets/images/doctor-img01.png'
        });

        const savedDoctor = await doctor.save();
        console.log('Doctor saved successfully:', savedDoctor);

        res.status(201).json({
            success: true,
            data: savedDoctor
        });
    } catch (error) {
        console.error('Error in createDoctor:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update doctor image
// @route   PATCH /api/doctors/:id/image
// @access  Private
export const updateDoctorImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imagePath } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid doctor ID format'
            });
        }

        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        doctor.imagePath = imagePath;
        await doctor.save();

        res.json({
            success: true,
            data: doctor
        });
    } catch (error) {
        console.error('Error in updateDoctorImage:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default {
    getDoctors,
    createDoctor,
    getDoctorById,
    updateDoctorImage
};