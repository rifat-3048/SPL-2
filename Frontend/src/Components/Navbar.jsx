import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-700 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          PHA
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl lg:hidden focus:outline-none"
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Home
          </Link>
          <Link
            to="/disease-checker"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Symptoms Checker
          </Link>
          <Link
            to="/doctors"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Doctors
          </Link>
          <Link
            to="/apply"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Apply for Doctor
          </Link>
          <Link
            to="/appointments"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Appointments
          </Link>
          <Link
            to="/signup"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;