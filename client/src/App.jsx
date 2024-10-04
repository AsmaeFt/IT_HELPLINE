import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/routes/LandingPage";
import NavBar from "./components/layout/Navbar";
import Admin from "./components/routes/Admin";
import { useSelector } from "react-redux";
import Login from "./components/auth/logIn";
function App() {
  const isAuthentificated = useSelector((st) => st.LogIn.isLoged);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            isAuthentificated ? (
              isAuthentificated.role === "adminIT" ||
              isAuthentificated.role === "itTechnician" ? (
                <Admin />
              ) : isAuthentificated.role === "superUsers" ? (
                <>
                  <div>hh</div>
                  {/* <Incidents /> */}
                </>
              ) : (
                <>
                  <div>hh</div>
                  <Login />
                </>
              )
            ) : (
              <>
                <div>hh</div>
                /* <LogIn /> */
              </>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
