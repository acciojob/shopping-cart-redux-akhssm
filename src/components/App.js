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
  {
    id: 1,
    name: "Blue Denim Shirt",
    price: 1799,
    image: "http://via.placeholder.com/200x240?text=Denim+Shirt",
  },
  {
    id: 2,
    name: "Red Hoodie",
    price: 3599,
    image: "http://via.placeholder.com/200x240?text=Red+Hoodie",
  },
  {
    id: 3,
    name: "Navy T-Shirt",
    price: 1599,
    image: "http://via.placeholder.com/200x240?text=Navy+TShirt",
  },
  {
    id: 4,
    name: "Black Chino Pants",
    price: 6999,
    image: "http://via.placeholder.com/200x240?text=Chino+Pants",
  },
];

export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const wishlistItems = useSelector((s) => s.wishlist.items);
  const coupon = useSelector((s) => s.cart.coupon);
  const [couponInput, setCouponInput] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const total = subtotal - discount;

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <section>
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="custom-card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <h4>{p.name}</h4>
                <p>Rs {p.price}</p>

                <button
                  className="btn"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to Cart
                </button>

                <button
                  className="btn"
                  onClick={() => dispatch(addToWishlist(p))}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="custom-card">
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>Rs {item.price}</p>
                <p>Qty: {item.qty}</p>

                <button
                  className="btn"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>

                <button
                  className="btn"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>

                <button
                  className="btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <input
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Coupon"
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

        <p>Total: Rs {total}</p>
      </section>

      <section>
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="custom-card">
              <div className="card-body">
                <h4>{item.name}</h4>

                <button
                  className="btn"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to Cart
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
        </div>
      </section>
    </div>
  );
}
