import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

export const createAppointment = async (req, res) => {
    try {
        const { patientName, email, contactNumber, appointmentDate, doctorId } = req.body;
        
        // Debug logs
        console.log('Creating appointment with data:', {
            patientName,
            email,
            contactNumber,
            appointmentDate,
            doctorId
        });

        // Validate doctorId format
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            console.log('Invalid doctor ID format:', doctorId);
            return res.status(400).json({
                success: false,
                message: 'Invalid doctor ID format'
            });
        }

        // Find doctor with detailed logging
        console.log('Searching for doctor with ID:', doctorId);
        const doctor = await Doctor.findById(doctorId);
        console.log('Doctor search result:', doctor);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const appointment = new Appointment({
            patientName,
            email,
            contactNumber,
            appointmentDate,
            doctorId,
            userId: req.user._id
        });

        const savedAppointment = await appointment.save();
        console.log('Appointment saved successfully:', savedAppointment);

        res.status(201).json({
            success: true,
            data: savedAppointment
        });
    } catch (error) {
        console.error('Error in createAppointment:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Get user's appointments
export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id })
            .populate('doctorId', 'name brand')
            .sort({ appointmentDate: -1 });

        res.json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all appointments (for admin)
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctorId', 'name brand')
            .populate('userId', 'name email')
            .sort({ appointmentDate: -1 });

        res.json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};