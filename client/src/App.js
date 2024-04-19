import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Employee from './pages/Employee';
import Sales from './pages/Sales';
import StockInventory from './pages/StockInventory';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import Orders from './pages/Orders';
import Products from './pages/Products';
import TransactionList from './pages/TransactionList';
import Tools from './pages/Tools';



const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const contentStyle = {
    marginLeft: showSidebar ? 250 : 0, 
    transition: 'margin-left 0.5s', 
    overflow: 'auto', 
  };


  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}> 
        <Sidebar showSidebar={showSidebar} onClose={() => setShowSidebar(false)} />
        <div style={{ flex: 1, ...contentStyle }}> 
          <NavBar toggleSidebar={toggleSidebar} />
          <main style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/manage-sales" element={<Sales />} />
              <Route path="/manage-stocks" element={<StockInventory />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Transaction" element={<TransactionList />} />
            </Routes>
        
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
