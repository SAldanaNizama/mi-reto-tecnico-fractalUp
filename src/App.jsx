import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetail';
import Sidebar from './components/sideBar/SideBar';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar /> 
        <div className="flex-1 p-4">
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