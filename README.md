Personal Health Assistant

Overview

The Personal Health Assistant is a ML based web application designed to assist users in identifying potential health conditions based on symptoms, recommending nearby doctors, and enabling appointment scheduling. The system leverages machine learning to provide reliable health insights and improve user experience.

Features

Symptom-Based Disease Prediction: Users can input symptoms, and the system suggests possible diseases.

Doctor Recommendation: Based on diagnosed conditions, the system lists nearby specialists.

Appointment Scheduling: Users can book appointments with doctors directly from the platform.

User Authentication: Secure login and registration using JWT authentication.

Medical History Management: Patients can track previous diagnoses and appointments.



Technologies Used

Frontend: React.js, Tailwind CSS

Backend: FirstAPI,Flask

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Machine Learning: Python, TensorFlow (for symptom-based predictions)

API Integration: Google Maps API (for doctor location services)

Installation Guide

Prerequisites

Node.js & npm installed

MongoDB instance running

Steps to Run Locally

Clone the Repository

git clone https://github.com/rifat-3048/SPL-2.git
cd SPL-2

Install Dependencies

npm install
cd client && npm install

Set Up Environment Variables
Create a .env file in the root directory and configure database and authentication settings.

Run the Application

npm run dev

Access the Application
Open http://localhost:3000 in your browser.

Future Enhancements

AI-based Personalized Health Recommendations

Integration with Wearable Devices

Multilingual Support

Contributors

Mahshin Islam (Lead Developer & Security Expert)

Rifat Ahammed (Frontend Developer)

Rifat Ahammed ,Mahshin Islam (Backend Developer)

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

For any queries or contributions, feel free to reach out via email@example.com.

