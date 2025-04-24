import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Remove from cart
  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
