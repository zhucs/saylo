import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LessonPage from "./pages/LessonPage/LessonPage"; // Placeholder for the lesson page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lesson" element={<LessonPage />} /> {/* Placeholder */}
      </Routes>
    </Router>
  );
};

export default App;
