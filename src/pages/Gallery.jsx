import React, { useState, useEffect } from 'react';

const sampleImages = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
];

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace this with Firebase Storage or Cloud fetch later
    setImages(sampleImages);
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-6">📸 Birthday Gallery</h2>
      <p className="text-white mb-10 max-w-xl mx-auto">
        Thank you for the memories! Enjoy some highlights from Grace's 75th celebration.
      </p>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`gallery-${i}`}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No photos yet. Stay tuned!</p>
      )}
    </div>
  );
}

export default Gallery;
