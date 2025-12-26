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
  const cartItems = useSelector((s) => s.cart.items);
  const wishlistItems = useSelector((s) => s.wishlist.items);
  const coupon = useSelector((s) => s.cart.coupon);

  const [couponInput, setCouponInput] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <nav className="navbar-expand-lg">
        <div className="text-center">
          <h3>Shopping Cart</h3>
        </div>
      </nav>

      <section>
        <h3>Products</h3>
        {PRODUCTS.map((p) => (
          <div className="custom-card card" key={p.id}>
            <div className="card-body">
              <h4>{p.name}</h4>
              <p>{p.price}</p>

              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(p))}
              >
                Add To Cart
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => dispatch(addToWishlist(p))}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Cart</h3>
        {cartItems.map((item) => (
          <div className="custom-card card" key={item.id}>
            <div className="card-body">
              <h4>{item.name}</h4>
              <p>{item.qty}</p>

              <button
                className="btn btn-warning"
                onClick={() => dispatch(decreaseQty(item.id))}
              >
                -
              </button>

              <button
                className="btn btn-success"
                onClick={() => dispatch(increaseQty(item.id))}
              >
                +
              </button>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <input
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() =>
            dispatch(applyCoupon({ code: couponInput.toUpperCase() }))
          }
        >
          Apply
        </button>

        <button
          className="btn btn-danger"
          onClick={() => dispatch(clearCoupon())}
        >
          Clear
        </button>

        <p>Total: {total}</p>
      </section>

      <section>
        <h3>Wishlist</h3>
        {wishlistItems.map((item) => (
          <div className="custom-card card" key={item.id}>
            <div className="card-body">
              <h4>{item.name}</h4>

              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(item))}
              >
                Add To Cart
              </button>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
