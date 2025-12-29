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
  const { cart, discount } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");

  return (
    <div className="cart-grid">
      {cart.map((p) => (
        <div className="custom-card card" key={p.id}>
          <div className="card-body">
            <p>{p.name}</p>
            <p>₹{p.price}</p>
            <p>Qty: {p.qty}</p>

            <button
              className="btn btn-success"
              onClick={() => dispatch(increaseQty(p.id))}
            >
              +
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(decreaseQty(p.id))}
            >
              -
            </button>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(removeFromCart(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="coupon-section">
        <input
          placeholder="Enter coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => dispatch(applyCoupon(coupon))}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Cart;
