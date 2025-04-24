import React from 'react';

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ${total}</h4>
    </div>
  );
};

export default Cart;
