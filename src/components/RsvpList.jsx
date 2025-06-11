// src/components/RSVPList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function RSVPList() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rsvps"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRsvps(data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  return (
    <div className=" text-center flex flex-col max-w-3xl mx-auto mt-10 p-6 bg-black shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">
        📋 RSVP Responses
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#9a560c]">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Guests</th>
              <th className="p-2 border">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No RSVP yet.
                </td>
              </tr>
            ) : (
              rsvps.map(({ id, name, guests, timestamp }) => (
                <tr key={id} className="hover:bg-[#9a560c]">
                  <td className="border p-2">{name || "—"}</td>
                  <td className="border p-2">{guests ?? 0}</td>
                  <td className="border p-2">
                    {timestamp?.seconds
                      ? new Date(timestamp.seconds * 1000).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <button
        type="button"
        onClick={() => navigate(-1)} // navigates back
        className="mt-7 w-30 flex justify-center text-white font-semibold hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
