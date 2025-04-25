import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    const phone = prompt("Enter your phone number (format: 07XXXXXXXX):");

    if (!phone) {
      alert("Phone number is required to proceed.");
      return;
    }

    const formattedPhone = phone.startsWith("254") ? phone : `254${phone.substring(1)}`;

    try {
      const response = await fetch('http://localhost:5000/stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone, amount: total }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("STK Push sent! Check your phone to complete payment.");
        // Optionally clear cart or redirect to thank you page
      } else {
        alert("Payment request failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

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
          <button className="btn btn-primary mt-3" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
