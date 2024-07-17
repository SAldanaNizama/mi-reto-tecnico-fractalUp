import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetail";
import Sidebar from "./components/SideBarr/SideBar";
import About from "./pages/About";
import SnakeGame from "./pages/Games";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<CountryDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/games" element={<SnakeGame />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
