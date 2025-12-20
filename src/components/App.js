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
    desc: "SHIRT - BLUE",
    price: 1799,
    image: "http://via.placeholder.com/200x240?text=Denim+Shirt",
  },
  {
    id: 2,
    name: "Red Hoodie",
    desc: "HOODIE - RED",
    price: 3599,
    image: "http://via.placeholder.com/200x240?text=Red+Hoodie",
  },
  {
    id: 3,
    name: "Navy T-Shirt",
    desc: "TSHIRT - NAVY",
    price: 1599,
    image: "http://via.placeholder.com/200x240?text=Navy+TShirt",
  },
  {
    id: 4,
    name: "Black Chino Pants",
    desc: "CHINO PANTS - BLACK",
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
      <nav className="navbar navbar-expand-lg">
        <div className="text-center">
          <h1>Shopping Cart</h1>
        </div>
      </nav>

      <section>
        <h2>All Products</h2>
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="custom-card card">
              <img src={p.image} alt={p.name} />
              <div className="card-body">
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
                <p>Rs {p.price}</p>

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
        </div>
      </section>

      <section>
        <h2>Cart</h2>
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="custom-card card">
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>Rs {item.price}</p>

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
                  className="btn btn-danger"
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
          placeholder="Enter coupon"
        />
        <button
          className="btn btn-primary"
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
        <h2>Wishlist</h2>
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="custom-card card">
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
        </div>
      </section>
    </div>
  );
}
