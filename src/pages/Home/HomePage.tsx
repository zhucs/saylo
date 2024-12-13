import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import MainContent from "../../components/layout/MainContent";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default HomePage;
