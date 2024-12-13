import React from "react";
import { FaUser, FaCog, FaChartBar } from "react-icons/fa";
import useIsLargeScreen from "../hooks/useIsLargeScreen"; // Import the custom hook

const Sidebar: React.FC = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="h-screen bg-purple-100 flex flex-col justify-between items-center lg:items-start py-8 px-4 lg:px-4">
      {/* Top Section */}
      <div className="w-full flex flex-col items-center lg:items-start">
        {/* Logo */}
        <div className="w-full flex justify-center items-center mb-8">
          {isLargeScreen ? (
            <span className="text-purple-700 text-5xl font-bold font-[Fredoka]">
              Saylo
            </span>
          ) : (
            <span className="text-purple-700 text-6xl font-bold font-[Fredoka]">
              S
            </span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 w-full text-2xl text-black font-semibold font-[Fredoka]">
          <div className="flex items-center w-full py-4 px-8 hover:bg-purple-200 rounded-lg cursor-pointer">
            <span className="text-3xl">
              <FaUser />
            </span>
            <span className="hidden lg:block ml-6 text-2xl">Profile</span>
          </div>
          <div className="flex items-center w-full py-4 px-8 hover:bg-purple-200 rounded-lg cursor-pointer">
            <span className="text-3xl">
              <FaCog />
            </span>
            <span className="hidden lg:block ml-6 text-2xl">Settings</span>
          </div>
          <div className="flex items-center w-full py-4 px-8 hover:bg-purple-200 rounded-lg cursor-pointer">
            <span className="text-3xl">
              <FaChartBar />
            </span>
            <span className="hidden lg:block ml-6 text-2xl">Progress</span>
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col items-center justify-center space-y-2">
        <div className="text-md font-bold font-[Fredoka] hover:bg-purple-200 hover:text-purple-700 cursor-pointer focus:outline focus:outline-purple-500 text-center">
          About
        </div>
        <div className="text-md font-bold font-[Fredoka] hover:bg-purple-200 hover:text-purple-700 cursor-pointer focus:outline focus:outline-purple-500 text-center">
          Terms
        </div>
        <div className="text-md font-bold font-[Fredoka] hover:bg-purple-200 hover:text-purple-700 cursor-pointer focus:outline focus:outline-purple-500 text-center">
          Privacy
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
