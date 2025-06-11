import React from 'react';
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">📅 Birthday Details</h2>

      <div className="bg-pink-50 p-6 rounded shadow-md">
        <p className="text-gray-600 text-lg mb-4">
          <strong>Date:</strong> Saturday, August 2, 2025<br />
          <strong>Time:</strong> 5:00 PM – 11:00 PM
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Address:</strong><br />
          Crowne Plaza Rome - St. Peter's<br />
          Via Aurelia Antica 4150<br />
          Rome, 00165, Italy
        </p>

        <p className="text-lg text-gray-600">
          <strong>Dress Code:</strong> Black Tie / Gold
        </p>
        <img
        src="/dress-code.jpg" 
        alt="Birthday Menu"
        className="mt-5 w-full max-w-2xl rounded-lg shadow-lg"
      />
      </div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-white font-semibold mb-4 hover:underline m-7"
      >
        ← Back
      </button>
    </div>
  );
}

export default About;

