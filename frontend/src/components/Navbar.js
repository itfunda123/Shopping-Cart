import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Shop</Link>
      <div>
        <Link className="nav-link" to="/cart">Cart</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
