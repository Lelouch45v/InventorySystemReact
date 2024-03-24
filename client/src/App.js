import React, { useState } from 'react';
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

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const contentStyle = {
    marginLeft: showSidebar ? 250 : 0, // Assuming the sidebar width is 250px
    transition: 'margin-left 0.5s', // Smooth transition for the sliding effect
    overflow: 'auto', // Ensures that content can be scrolled if it overflows the viewport
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}> {/* Restrict outer div to 100% of viewport height and hide overflow */}
        <Sidebar showSidebar={showSidebar} onClose={() => setShowSidebar(false)} />
        <div style={{ flex: 1, ...contentStyle }}> {/* Apply the movement and overflow styles here */}
          <NavBar toggleSidebar={toggleSidebar} />
          <main style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}> {/* Make main content scrollable, adjusting for navBar height */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
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
