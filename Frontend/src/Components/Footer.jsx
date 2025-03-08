// src/Components/TheFooter.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A2A44] text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About PHA</h2>
            <p className="text-sm text-gray-300">
              Personal Health Assistant is your trusted platform for booking medical appointments
              with top-rated doctors. We aim to make healthcare accessible and
              convenient for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-sm text-gray-300">
              <li className="mb-2 hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="/doctors">Find Doctors</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="/contact">Contact Us</a>
              </li>
              <li className="hover:text-white">
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="text-sm text-gray-300">
              <li className="mb-2">
                <span>Email:</span> support@pha.com
              </li>
              <li className="mb-2">
                <span>Phone:</span> 01609802368
              </li>
              <li>
                <span>Address:</span> University of Dhaka
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Personal Health Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
