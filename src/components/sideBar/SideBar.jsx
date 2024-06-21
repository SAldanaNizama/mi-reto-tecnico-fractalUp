import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Countries Explorer</h1>
      </div>
      <ul>
        <li className="p-4 hover:bg-gray-700">
          <Link to="/" className="w-full">List of Countries</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar