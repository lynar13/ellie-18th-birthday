// src/pages/Gift.jsx
import React, { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

function Gift() {
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const qrRef = useRef(null);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !note.trim()) {
      toast.error("Please enter your name and a message.");
      return;
    }

    setLoading(true);
    try {
      const geoRes = await axios.get("https://ipapi.co/json/");
      const { ip, country_name: country } = geoRes.data;

      await addDoc(collection(db, "giftNotes"), {
        name: name.trim(),
        message: note.trim(),
        ip,
        country,
        timestamp: serverTimestamp(),
      });

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      toast.success("🎁 Gift note submitted!");
      setName("");
      setNote("");
    } catch (err) {
      console.error("Error submitting note:", err);
      toast.error("Error saving your message.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open("/bank-details.pdf", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-4">
        💝 Send a Birthday Gift
      </h2>
      <p className="text-white mb-6 max-w-lg">
        Your presence is the greatest gift! But if you’d like to bless Grace
        with a birthday token, please use the bank transfer option below 🏦
      </p>

      {/* QR Code to Bank Details */}
      <div
        ref={qrRef}
        className="bg-white p-4 rounded-lg shadow inline-block mb-4 cursor-pointer"
        onClick={handleDownload}
        title="Click to download bank details"
      >
        <QRCodeCanvas
          value={`${window.location.origin}/bank-details.pdf`}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin
        />
      </div>

      <p className="text-white mb-8">
        Tap or scan the QR to download Grace’s bank details (PDF)
      </p>

      <p className="text-xl p-4">
        Gift notes will be shown on a slideshow during the party 🎉
      </p>
      <p className="text-sm text-yellow-700 p-4">
        Note: You can submit a note without sending a gift 🎉
      </p>

      <form
        onSubmit={handleNoteSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">
          Leave a message 🎂
        </h3>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded text-gray-600"
          required
        />
        <textarea
          placeholder="Your message..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded text-gray-600"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
        >
          {loading ? "Sending..." : "Submit Note"}
        </button>
      </form>
    </div>
  );
}

export default Gift;
