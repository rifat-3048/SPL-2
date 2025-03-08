import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import humanAvatar from '../assets/images/human-avatar.png';

const UserProfile = () => {
  const UserEmail = localStorage.getItem("userEmail");
  const status = localStorage.getItem("status");

  const [userDetails, setUserDetails] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/user?email=${encodeURIComponent(UserEmail)}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message);
      }
    };

    if (UserEmail) {
      fetchUserDetails();
    }
  }, [UserEmail]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/appointments/my-appointments`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointmentHistory(data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (UserEmail) {
      fetchAppointments();
    }
  }, [UserEmail]);

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
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Profile Header with Avatar */}
        <div className="relative">
          <div className="h-32 bg-teal-600"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={humanAvatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Personal Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Full Name:</span>{" "}
                  {userDetails?.user_name || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {userDetails?.email || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`${status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {status || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Appointment History Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Recent Appointments
            </h2>
            <div className="space-y-4">
              {appointmentHistory.length > 0 ? (
                appointmentHistory.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment._id}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-700 font-semibold">
                          Dr. {appointment.doctorId?.name || 'Unknown'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Date: {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Time: {new Date(appointment.appointmentDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No appointments found</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center py-4">
          <button className="px-8 py-3 bg-[#00A9E0] text-white font-medium rounded-lg hover:bg-teal-600 transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;