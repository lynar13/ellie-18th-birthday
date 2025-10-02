import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useSwipeable } from "react-swipeable";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import RSVPForm from "../components/RsvpForm";
import CameraCapture from "../components/CameraCapture";

function Home() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [rsvpName, setRsvpName] = useState(null);
  const [rsvpEmail, setRsvpEmail] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem("rsvpName");
    const email = localStorage.getItem("rsvpEmail");

    if (localStorage.getItem("rsvpSuccess") === "true") {
      toast.success(`🎉 Thanks for RSVPing, ${name?.split(" ")[0]}!`);
      localStorage.removeItem("rsvpSuccess");
    }

    if (name) setRsvpName(name);
    if (email) setRsvpEmail(email);
  }, []);

  const handleRsvpClick = () => navigate("/rsvpform");
  const handleGiftClick = () => navigate("/gift");
  const handleEventInfoClick = () => navigate("/event");

  const sliderImages = [
    "/lokale-1.jpg",
    "/lokale-2.jpg",
    "/lokale-3.jpg",
    "/lokale-4.jpg",
  ];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => sliderRef.current?.slickNext(),
    onSwipedRight: () => sliderRef.current?.slickPrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-pink-600 text-white p-2 rounded-full shadow hover:bg-pink-700 transition-opacity"
    >
      <FaArrowRight />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-pink-600 text-white p-2 rounded-full shadow hover:bg-pink-700 transition-opacity"
    >
      <FaArrowLeft />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="p-4 flex flex-col sm:flex-col justify-center">
      {/* Hero Section */}
      <section className="w-full h-[90vh] relative">
        <img
          src="/shadow.avif"
          alt="Hero"
          className="absolute inset-0 w-full h-100 object-cover rounded-2xl mb-50"
        />
      </section>
      <section>
        <div className="mt-190 px-4 absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <div className="text-[#ffbf00]">
            <div className="">
              <h1 className="text-9xl font-[cursive] font-extrabold">
                Ellie's
              </h1>
              <h2 className="text-6xl font-bold text-white italic">18th</h2>
              <h2 className="text-6xl text-white font-bold">Birthday</h2>
            </div>
            <p className="text-2xl mb-5 mt-12">
              Music, sing, dance, laughter and love! <br />
            </p>
            <p className="text-white">RSVP by Friday 10th October 2025.</p>
          </div>

          {rsvpName ? (
            <p className="text-green-300 font-medium mb-2">
              🎉 You’ve RSVPed as <strong>{rsvpName}</strong>
              {rsvpEmail && <span> ({rsvpEmail})</span>}
            </p>
          ) : (
            <div className="flex flex-col gap-3 mt-2 mb-2">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRsvpClick}
                  className="bg-pink-600 hover:bg-pink-700 transition-colors text-white font-semibold px-4 py-2 rounded-full"
                >
                  RSVP Now
                </button>
                <button
                  onClick={handleGiftClick}
                  className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-semibold px-4 py-2 rounded-full"
                >
                  Send a Gift 🎁
                </button>
              </div>
              <button
                onClick={handleEventInfoClick}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-4 py-2 rounded-full w-fit mx-auto"
              >
                Event Info ℹ️
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ✅ CameraCapture visible for everyone */}
      <section className="flex justify-center mt-80">
        <div className="w-full max-w-2xl">
          <CameraCapture rsvpName={rsvpName} />
        </div>
      </section>

      {/* Slider Section */}
      <section className="mt-2 container w-full mx-auto max-w-5xl flex flex-col justify-center">
        <h2 className="p-4 text-center text-3xl">
          The Venue - Folkets Hus Strømmen
        </h2>

        <div className="relative group" {...swipeHandlers}>
          <Slider ref={sliderRef} {...settings}>
            {sliderImages.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`slide-${index}`}
                  className="w-full h-70 rounded-2xl"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute bottom-3 right-4 text-white bg-black bg-opacity-60 px-3 py-1 text-sm rounded">
            {currentSlide + 1} of {sliderImages.length}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section>
        <RSVPForm />
      </section>
    </div>
  );
}

export default Home;
