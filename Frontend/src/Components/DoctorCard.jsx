import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      alert("Please login to book an appointment");
      navigate('/login');
      return;
    }
    onBookAppointment();
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Doctor Image */}
      <div className="relative w-32 h-32 mx-auto mt-4 overflow-hidden rounded-full border-4 border-teal-50">
        <img
          className="object-cover w-full h-full"
          src={doctor.image}
          alt={`Dr. ${doctor.name}`}
        />
      </div>

      <div className="p-5">
        {/* Doctor Name */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Dr. {doctor.name}
        </h2>

        {/* Specialty */}
        <p className="text-sm text-teal-600 text-center mb-2">
          {doctor.brand}
        </p>

        {/* Experience and Fee */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">
            Experience: {doctor.experience} years
          </span>
          <span className="text-sm font-semibold text-teal-700">
            Fee: {doctor.price} Taka
          </span>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
            {doctor.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {doctor.description}
        </p>

        {/* Book Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="w-full bg-[#00A9E0] text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Book Appointment</span>
        </button>

        {/* Available Times Indicator */}
        <p className="text-xs text-gray-500 text-center mt-2">
          Available: Mon-Fri, 9:00 AM - 5:00 PM
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;