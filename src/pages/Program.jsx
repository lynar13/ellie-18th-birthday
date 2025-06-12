import React from "react";

const schedule = [
  { time: "4:30 PM", activity: "Guest Arrival & Welcome Drinks" },
  { time: "5:00 PM", activity: "Opening Remarks & Prayer" },
  { time: "5:30 PM", activity:  "Mumy Grace Entrance"},
  { time: "6:00 PM", activity: "Buffet Dinner Begins 🍽️" },
  { time: "7:00 PM", activity: "Grace's 75 Years in Photos" },
  { time: "7:30 PM", activity: "Family & Friends Tribute" },
  { time: "8:00 PM", activity: "Musical Performances" },
  { time: "9:00 PM", activity: "Cake Cutting 🎂 & Toasts" },
  { time: "10:00 PM", activity: "Dance & Music 🎶" },
  { time: "11:00 PM", activity: "Closing & Thank You" },
];

function Program() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-6">
        🎉 Celebration Program
      </h2>
      <p className="text-white mb-4">
        Here's the rundown of this memorable evening celebrating Grace's 75th
        birthday.
      </p>
      <p className="text-xs text-yellow-700 font-italic text-white mb-8">
        "The Lord bless you and keep you; The Lord make his face shine on you
        and be gracious to you; The Lord turn his face toward you and give you
        peace." -Numbers 6:24-26
      </p>

      <div className="bg-white text-sm rounded-lg shadow-lg p-6 text-left">
        {schedule.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-3">
            <span className="font-semibold text-gray-800">{item.time}</span>
            <span className="text-gray-600">{item.activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Program;
