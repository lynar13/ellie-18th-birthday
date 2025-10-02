import React from "react";

const schedule = [
 
];

function Program() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-pink-700 mb-6">
        🎉 Celebration Program
      </h2>
      <p className="text-white text-4xl mb-4 pt-20">
        There will be lots of games and surprise numbers! Enjoy the party!
      </p>

      {/* <div className="bg-white text-sm rounded-lg shadow-lg p-6 text-left">
        {schedule.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-3">
            <span className="font-semibold text-gray-800">{item.time}</span>
            <span className="text-gray-600">{item.activity}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Program;
