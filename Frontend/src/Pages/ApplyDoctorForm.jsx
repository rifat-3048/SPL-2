import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyDoctorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    experience: "",
    description: "",
    category: "",
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to apply as a doctor');
      }

      // First create the doctor profile
      const doctorResponse = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          brand: formData.brand,
          price: formData.price,
          experience: formData.experience,
          description: formData.description,
          category: formData.category
        })
      });

      const doctorData = await doctorResponse.json();

      if (!doctorResponse.ok) {
        throw new Error(doctorData.message || 'Failed to submit application');
      }

      // If there are images, upload them
      if (formData.images.length > 0) {
        const imageFormData = new FormData();
        formData.images.forEach(file => {
          imageFormData.append('images', file);
        });

        const imageResponse = await fetch(
          `http://localhost:5000/api/doctors/${doctorData.data._id}/images`,
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: imageFormData
          }
        );

        if (!imageResponse.ok) {
          throw new Error('Failed to upload images');
        }
      }

      alert('Doctor application submitted successfully!');
      navigate('/doctors'); // Redirect to doctors page after successful submission

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-4xl">
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          Apply for Doctor Position
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Side */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Specialty & Last Degree
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter specialty and degree (e.g., FCPS)"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Consultation Fee */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Consultation Fee
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter consultation fee"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter experience in years"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category (e.g., Cardiologist)"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500 h-24"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Images
              </label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Display Selected Images */}
            {formData.images.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selected Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`selected-img-${index}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 text-red-500 text-xs bg-white rounded-full p-1"
                        onClick={() => handleImageRemove(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-2 bg-[#00A9E0] text-white text-lg font-medium rounded-lg 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
            >
              {loading ? 'Submitting...' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyDoctorForm;