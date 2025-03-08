import React, { useState, useEffect } from "react";
import DoctorCard from "../Components/DoctorCard";
import AppointmentBookingCart from "../Components/AppointmentBookingCart";
// Import doctor images
import doctorImg01 from '../assets/images/doctor-img01.png';
import doctorImg02 from '../assets/images/doctor-img02.png';
import doctorImg03 from '../assets/images/doctor-img03.png';

const Doctors = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Helper function to get the correct image based on path
  const getImageByPath = (path) => {
    switch(path) {
      case '/src/assets/images/doctor-img01.png':
        return doctorImg01;
      case '/src/assets/images/doctor-img02.png':
        return doctorImg02;
      case '/src/assets/images/doctor-img03.png':
        return doctorImg03;
      default:
        return doctorImg01; // Default image
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/doctors");
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();

      if (data.success) {
        const formattedData = data.data.map((doctor) => ({
          id: doctor._id,
          name: doctor.name,
          image: getImageByPath(doctor.imagePath),
          brand: doctor.brand,
          price: doctor.price,
          experience: doctor.experience,
          description: doctor.description,
          category: doctor.category
        }));

        setDoctorsData(formattedData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for filter
  const categories = [...new Set(doctorsData.map(doctor => doctor.category))];

  // Filter doctors based on search and category
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || doctor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-4">
      {/* Search and Filter Section */}
      <div className="container mx-auto mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto">
        {filteredDoctors.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            No doctors found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={() => setSelectedDoctor(doctor)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctor && (
        <AppointmentBookingCart
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default Doctors;