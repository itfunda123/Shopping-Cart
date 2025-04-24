import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartCount }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">Shop</Link>
      <div>
        <Link className="nav-link" to="/cart">
          <FaShoppingCart className="me-2" />
          Cart {cartCount > 0 && <span className="badge bg-danger">{cartCount}</span>}
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
