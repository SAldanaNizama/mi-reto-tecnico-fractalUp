import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetail';
import Sidebar from './components/sideBar/SideBar';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
