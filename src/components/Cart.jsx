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

            {/* BUTTON ORDER IS CRITICAL */}

            {/* 1️⃣ Increase */}
            <button
              className="btn btn-increase"
              onClick={() => dispatch(increaseQty(p.id))}
            >
              +
            </button>

            {/* 2️⃣ Decrease */}
            <button
              className="btn btn-decrease"
              onClick={() => dispatch(decreaseQty(p.id))}
            >
              -
            </button>

            {/* 3️⃣ Remove */}
            <button
              className="btn btn-remove"
              onClick={() => dispatch(removeFromCart(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Coupon Section */}
      <div className="coupon-section">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon"
        />

        <button
          className="btn btn-success"
          onClick={() => dispatch(applyCoupon(coupon))}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Cart;
