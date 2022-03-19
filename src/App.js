import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './screens/Home'
import Order from './screens/Order';
import Payment from './screens/Payment';
function App() {
  return (
    <div className="container">
      <Router>
            <Sidebar />
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/order' element={<Order />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='*' element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
