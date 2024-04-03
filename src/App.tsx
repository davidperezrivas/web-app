import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Blog from './Components/Blog/Blog';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      {/* sidemenu */}
      <Navbar setExpand={setSideMenuIsExpand} />
      {/* content */}
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? 'md:ml-72' : 'md:ml-20'
        }`}
      >
        <Blog />
      </div>
    </div>
  );
}

export default App;
