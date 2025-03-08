import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Store the token and user data
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          role: data.data.role
        }));

        // Redirect based on user role
        if (data.data.role === 'doctor') {
          navigate('/doctor-dashboard');
        } else {
          navigate('/');
        }
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h1 className="text-2xl font-bold text-center text-teal-600 mb-4">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#00A9E0] text-white py-1.5 rounded-lg transition duration-200 text-sm
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-3 flex items-center justify-center">
          <span className="text-gray-600 text-sm">or</span>
        </div>

        <div className="flex items-center space-x-2 justify-center">
          <span className="text-gray-700 font-medium text-sm">Log in with</span>
          <a
            href="#"
            className="flex items-center justify-center"
            aria-label="Log in with Google"
          >
            <img
              src="https://imgs.search.brave.com/aML63go3qx4B2AZEeBGsMDESVu76lSffF1mIpwch2vs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzg4LzA3Lzg0/LzM2MF9GXzM4ODA3/ODQ1NF9tS3RiZFhZ/RjljeVFvdkNDVHNq/cUkwZ2JmdTdnQ2NT/cC5qcGc"
              alt="Google Logo"
              className="w-5 h-5 hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        </div>

        <p className="text-center text-gray-600 mt-3 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:text-teal-700">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;