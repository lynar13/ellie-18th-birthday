import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

function GiftNotes() {
  const [notes, setNotes] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, 'giftNotes'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(data);
      } catch (err) {
        console.error("Error fetching gift notes:", err);
      }
    };

    fetchNotes();
  }, []);

  // Auto-rotate slideshow every 10 seconds
  useEffect(() => {
    if (notes.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % notes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [notes]);

  if (!notes.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <p className="text-lg text-gray-600">No messages yet. Check back later!</p>
      </div>
    );
  }

  const current = notes[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#fef8f5] text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-6">🎁 Gift Notes Guestbook</h2>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-8 transition duration-500 ease-in-out">
        <p className="text-xl text-gray-800 italic mb-6">“{current.message}”</p>
        <p className="text-sm font-medium text-gray-600">
          — {current.name || 'Anonymous'}
        </p>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {index + 1} of {notes.length}
      </p>
    </div>
  );
}

export default GiftNotes;
