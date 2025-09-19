import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Program from "./pages/Program";
import RsvpForm from "./components/RsvpForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RsvpList from "./pages/RsvpList";
import Gift from "./pages/Gift";
import GiftNotes from "./pages/GiftNotes";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/program" element={<Program />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rsvpform" element={<RsvpForm />} />
          <Route path="/rsvplist" element={<RsvpList />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/gift-notes" element={<GiftNotes />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
