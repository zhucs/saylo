import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import HomeContent from "./HomeContent";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <HomeContent />
    </div>
  );
};

export default HomePage;
