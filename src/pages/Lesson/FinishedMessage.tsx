import React from "react";
import { useNavigate } from "react-router-dom";

const FinishedMessage: React.FC<{ structures: string[] }> = ({ structures }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-white font-primary p-6 w-full max-w-2xl bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Bravo! 🎉 You made it! </h1>
      <p className="text-2xl text-gray-800 mb-4"></p>
      <p className="text-2xl text-gray-800 mb-6">
        You now know the following structures:
      </p>
      <div className="text-2xl font-bold text-purple-700 mb-10">
        {structures.map((structure, index) => (
          <div key={index} className="mb-2">
            {structure}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/home")}
        className="bg-purple-500 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-lg mb-2"
      >
        Back to Home
      </button>
    </div>
  );
};

export default FinishedMessage;
