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
  const [selected, setSelected] = useState("revolut");
  const qrRef = useRef(null);

  const links = {
    revolut: "https://www.revolut.me/YOURUSERNAME",
    paypal: "https://www.paypal.me/YOUR_USERNAME",
  };

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
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${selected}-qr.png`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-4">
        💝 Send a Birthday Gift
      </h2>
      <p className="text-white mb-6 max-w-lg">
        Your presence is the greatest gift! But if you’d like to bless Grace
        with a birthday token, use the options below 💌
      </p>

      {/* QR TABS */}
      <div className="flex gap-4 mb-4 justify-center">
        {Object.keys(links).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selected === key
                ? "bg-pink-600 text-white"
                : "bg-white text-blue-700"
            }`}
          >
            {key === "revolut" ? "Revolut 💶" : "PayPal 💸"}
          </button>
        ))}
      </div>

      <div
        ref={qrRef}
        className="bg-white p-4 rounded-lg shadow inline-block mb-2"
      >
        <QRCodeCanvas
          value={links[selected]}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin
        />
      </div>
      <button
        onClick={handleDownload}
        className="mb-6 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
      >
        Download QR Code
      </button>

      {/* Payment Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href={links.paypal}
          target="_blank"
          rel="noreferrer"
          title="Tap to send with PayPal"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700"
        >
          PayPal 💸
        </a>
        <a
          href={links.revolut}
          target="_blank"
          rel="noreferrer"
          title="Tap to send via Revolut"
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700"
        >
          Revolut 💶
        </a>
        <a
          href="/bank-details.pdf"
          target="_blank"
          rel="noreferrer"
          title="Tap to download bank transfer details"
          className="bg-gray-700 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800"
        >
          Bank Transfer 🏦
        </a>
      </motion.div>

      <p className="text-xl p-4">
        Gift notes will be shown on a slideshow during the party
      </p>

      <form
        onSubmit={handleNoteSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">
          Leave a message 🎂🎉
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
