import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Set up modal styling
Modal.setAppElement("#root");

const AppointmentBookingCart = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    contactNumber: "",
    appointmentDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: date,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to book an appointment');
      }

      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          doctorId: doctor.id // Make sure to use _id instead of id
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to book appointment');
      }

      const result = await response.json();
      alert('Appointment booked successfully!');
      onClose();
    } catch (error) {
      setError(error.message);
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={!!doctor}
      onRequestClose={onClose}
      style={{
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          backgroundColor: "#f9fafb",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Book an Appointment with Dr. {doctor?.name}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Patient Name:
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your contact number"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Date:
          </label>
          <DatePicker
            selected={formData.appointmentDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            minDate={new Date()}
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-teal-500 text-white font-medium rounded-lg transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
            }`}
          >
            {loading ? 'Booking...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentBookingCart;