import React, { useMemo, useState } from 'react';
import Sidebar from '../storybook/components/Sidebar/Sidebar';
import Users from '../components/User/Users';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import { useAppSelector } from '../hooks/store';
import { ProtectedRoute } from '../middleware/ProtectedRoutes';
import Dashboard from '../components/Dashboard/Dashboard';
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import FormRecoverPassword from '../components/RecoverPassword/RecoverPasswordForm';
import Subscriptions from '../components/Subscription/Subscriptions';
import Period from '../components/Period/Period';
import Debt from '../components/Debt/Debt';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const login = useAppSelector((state) => state.login);

  const bgColor = useMemo(() => {
    return login.isLogin ? 'bg-slate-100' : '';
  }, [login.isLogin]);

  return (
    <div className="relative min-h-screen md:flex">
      {/* sidemenu */}
      <Sidebar setExpand={setSideMenuIsExpand} />
      {/* content */}
      <div
        className={`flex-1 min-h-screen mx-0 ${bgColor} transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? 'md:ml-72' : 'md:ml-20'
        }`}
      >
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/subscriptions" element={<Subscriptions />}></Route>
            <Route path="/period" element={<Period />}></Route>
            <Route path="/debt" element={<Debt />}></Route>
          </Route>

          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/recoverPasswordForm/:token" element={<FormRecoverPassword />} />
          <Route path="/" element={<Login />}></Route>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
