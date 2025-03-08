import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

const YourAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to view appointments');
        }

        const response = await fetch("http://localhost:5000/api/appointments/my-appointments", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">
          Your Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex flex-col md:flex-row items-center bg-gradient-to-r from-teal-50 to-white rounded-md shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Doctor Info */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg shadow-md mb-4 md:mb-0 md:mr-4">
                  {appointment.doctorId?.name?.[0]?.toUpperCase() || "D"}
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                    Dr. {appointment.doctorId?.name || 'Unknown Doctor'}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Patient:</span>{" "}
                    {appointment.patientName}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Contact:</span>{" "}
                    {appointment.contactNumber}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {format(new Date(appointment.appointmentDate), 'PPpp')}
                  </p>
                  {/* <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    <span className={`capitalize ${
                      appointment.status === 'confirmed' ? 'text-green-600' :
                      appointment.status === 'cancelled' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {appointment.status}
                    </span>
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-8">
            <p>No appointments found.</p>
            <p className="mt-2 text-sm">Book an appointment with one of our doctors to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourAppointments;