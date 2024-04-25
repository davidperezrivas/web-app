import React, { useState } from 'react';
import Sidebar from '../storybook/components/Sidebar/Sidebar';
import Users from '../pages/Users/Users';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <div className="relative min-h-screen md:flex">
      {/* sidemenu */}
      <Sidebar setExpand={setSideMenuIsExpand} />
      {/* content */}
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? 'md:ml-72' : 'md:ml-20'
        }`}
      >
        <Routes>
          <Route path="/" element={<Users />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
