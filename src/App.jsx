import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import './App.css'
import Logout from './Components/Logout';
import Product from './Components/Product';
// import Cart from './Components/Checkout';
import Order from './Components/Order';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);  // After successful login
  };
  return (
    <>
        <BrowserRouter>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path='/' element={<Home onLogin={handleLogin}/>}/>
              
                <Route path='/product' element={<Product/>}/>
                <Route path='/cart' element={<Order/>}/>
                <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn}/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App