import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaGoogle, FaApple } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br font-primary from-purple-100 to-pink-200 overflow-hidden flex items-center justify-center px-8">
      {/* Elliptical Background */}
      <div className="absolute inset-0 bg-purple-200/50 rounded-full w-[200%] h-[200%] top-[-50%] left-[-50%] clip-ellipse"></div>

      {/* Main Content */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-purple-700 mb-4">
          Saylo!
        </h1>
        <h2 className="text-2xl font-semibold text-black mb-8">
          Learn to speak Spanish like a native.
        </h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="block w-[90%] mx-auto px-4 py-2 mb-3 text-xl text-gray-800 font-medium border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {/* Password Input */}
        <input
          type="text"
          placeholder="Password"
          className="block w-[90%] mx-auto px-4 py-2 mb-6 text-xl text-gray-800 font-medium border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 password-input"
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/./g, "●");
          }}
        />

        {/* Login Button */}
        <PrimaryButton onClick={handleLoginClick}>
          Login
        </PrimaryButton>

        {/* Divider */}
        <div className="text-gray-500 font-[Fredoka] my-2">OR</div>

        {/* Sign In Options */}
        <div className="flex justify-center gap-3 mt-3">
          {/* Sign In with Google */}
          <button className="p-2 bg-white border border-gray-400 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
            <FaGoogle size={18} className="text-gray-700" />
          </button>

          {/* Sign In with Apple */}
          <button className="p-2 bg-black rounded-full shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105">
            <FaApple size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
