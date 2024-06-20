import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/conuntryList/CountryList';
import CountryDetails from './components/countryDetail/CountryDetails';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Countries Explorer</h1>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <a href="/" className="w-full">List of Countries</a>
        </li>
      </ul>
    </div>
  );
}

export default App;