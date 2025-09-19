import React from 'react';
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">
        📅 Birthday Details
      </h2>

      <div className="bg-pink-50 p-6 rounded shadow-md">
        <p className="text-gray-600 text-lg mb-4">
          <strong>Date:</strong> Friday, 31st October 2025
          <br />
          <strong>Time:</strong> 17:00 – 23:00
        </p>

        <p className="text-lg text-gray-600 mb-4">
          <strong>Address:</strong>
          <br />
          To be confirmed
          <br />
          Strømmen
          <br />
        </p>

        <p className="text-lg text-gray-600">
          <strong>Dress Code:</strong> Sonic/Halloween Costume or any casual attire
        </p>
        <p className="text-2xl text-red-600 mt-5">
          Arrive dressed in your best!
        </p>
        <img
          src="/sonic.webp"
          alt="dress code"
          className="mt-5 w-full max-w-2xl rounded-lg shadow-lg"
        />
        <img
          src="/halloween.jpg"
          alt="dress code"
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

