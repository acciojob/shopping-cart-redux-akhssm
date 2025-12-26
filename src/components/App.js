import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
  clearCoupon,
} from "./cartSlice";
import { addToWishlist, removeFromWishlist } from "./wishlistSlice";

const PRODUCTS = [
  { id: 1, name: "Blue Denim Shirt", price: 1799 },
  { id: 2, name: "Red Hoodie", price: 3599 },
  { id: 3, name: "Navy T-Shirt", price: 1599 },
  { id: 4, name: "Black Chino Pants", price: 6999 },
];

export default function App() {
  const dispatch = useDispatch();
  const { items: cartItems, coupon } = useSelector((s) => s.cart);
  const wishlistItems = useSelector((s) => s.wishlist.items);
  const [couponInput, setCouponInput] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discountAmount = coupon
    ? Math.round((subtotal * coupon.discountPercent) / 100)
    : 0;

  const total = subtotal - discountAmount;

  return (
    <>
      <nav className="navbar-expand-lg text-center">
        <h3>Shopping Cart</h3>
      </nav>

      <section>
        <h3>Products</h3>
        {PRODUCTS.map((p) => (
          <div className="custom-card" key={p.id}>
            <div className="card-body">
              <p>{p.name}</p>
              <p>₹{p.price}</p>

              <button className="btn" onClick={() => dispatch(addToCart(p))}>
                Add To Cart
              </button>

              <button className="btn" onClick={() => dispatch(addToWishlist(p))}>
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Cart</h3>

        {cartItems.length === 0 && <p>Cart is empty</p>}

        {cartItems.map((item) => (
          <div className="custom-card" key={item.id}>
            <div className="card-body">
              <p>{item.name}</p>
              <p>Qty: {item.qty}</p>
              <p>₹{item.price * item.qty}</p>

              <button className="btn" onClick={() => dispatch(increaseQty(item.id))}>
                +
              </button>

              <button className="btn" onClick={() => dispatch(decreaseQty(item.id))}>
                -
              </button>

              <button className="btn" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Wishlist</h3>

        {wishlistItems.length === 0 && <p>No wishlist items</p>}

        {wishlistItems.map((item) => (
          <div className="custom-card" key={item.id}>
            <div className="card-body">
              <p>{item.name}</p>

              <button className="btn" onClick={() => dispatch(addToCart(item))}>
                Add To Cart
              </button>

              <button
                className="btn"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Apply Coupon</h3>

        <input
          value={couponInput}
          placeholder="Enter coupon"
          onChange={(e) => setCouponInput(e.target.value)}
        />

        <button
          className="btn"
          onClick={() =>
            dispatch(applyCoupon({ code: couponInput.toUpperCase() }))
          }
        >
          Apply
        </button>

        <button className="btn" onClick={() => dispatch(clearCoupon())}>
          Clear
        </button>

        <p>Subtotal: ₹{subtotal}</p>

        {coupon && (
          <p>
            Coupon <b>{coupon.code}</b> applied ({coupon.discountPercent}% off)
          </p>
        )}

        <p>
          <b>Total: ₹{total}</b>
        </p>
      </section>
    </>
  );
}
