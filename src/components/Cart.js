// src/components/Cart.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
} from "../redux/actions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");

  return (
    <div className="cart-grid">
      {cart.map((p) => (
        <div className="custom-card card" key={p.id}>
          <div className="card-body">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p>Qty: {p.qty}</p>

            <button
              className="btn"
              onClick={() => dispatch(increaseQty(p.id))}
            >
              +
            </button>

            <button
              className="btn"
              onClick={() => dispatch(decreaseQty(p.id))}
            >
              -
            </button>

            <button
              className="btn"
              onClick={() => dispatch(removeFromCart(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <input
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Enter coupon"
      />

      <button
        className="btn"
        onClick={() => dispatch(applyCoupon(coupon))}
      >
        Apply
      </button>
    </div>
  );
}

export default Cart;
