import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                  />
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small>${item.price}</small>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
        </>
      )}
    </div>
  );
};

export default Cart;
