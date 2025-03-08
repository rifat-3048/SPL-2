import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required']
    },
    brand: {
        type: String,
        required: [true, 'Specialty and degree are required']
    },
    price: {
        type: Number,
        required: [true, 'Consultation fee is required']
    },
    experience: {
        type: Number,
        required: [true, 'Experience is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    imagePath: {
        type: String,
        default: '/src/assets/images/doctor-img01.png'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;