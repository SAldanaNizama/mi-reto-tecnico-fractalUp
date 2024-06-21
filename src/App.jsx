import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetail';
import Sidebar from './components/sideBar/SideBar';
import About from './pages/About';
import "./App.css"
import SnakeGame from "./pages/Games"
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
              <Route path='/about' element={<About />} />
              <Route path='/Games' element={<SnakeGame/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;