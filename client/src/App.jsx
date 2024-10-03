import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/routes/LandingPage";
import NavBar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
