import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
  clearCoupon,
} from "./cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "./wishlistSlice";

const PRODUCTS = [
  {
    id: 1,
    name: 'Blue Denim Shirt',
    desc: 'Shirt - Blue',
    price: 1799,
    image:
      "https://cdn.pixabay.com/photo/2016/03/27/22/22/denim-shirt-1284417_1280.jpg",
  },
  {
    id: 2,
    name: 'Red Hoodie',
    desc: 'Hoodie - Red',
    price: 3599,
    image:
      "https://cdn.pixabay.com/photo/2019/10/21/23/55/hoodie-4573426_1280.jpg",
  },
  {
    id: 3,
    name: 'Navy T-Shirt',
    desc: 'TShirt - Navy',
    price: 1599,
    image:
      "https://cdn.pixabay.com/photo/2016/10/04/12/48/t-shirt-1715850_1280.png",
  },
  {
    id: 4,
    name: 'Black Chino Pants',
    desc: 'Chino Pants - Black',
    price: 6999,
    image:
      "https://cdn.pixabay.com/photo/2016/11/19/17/17/trousers-1840889_1280.jpg",
  },
];

export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.cart.coupon);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [couponInput, setCouponInput] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discount = coupon
    ? Math.round((subtotal * coupon.discountPercent) / 100)
    : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    dispatch(applyCoupon({ code: couponInput.trim().toUpperCase() }));
    setCouponInput('');
  };

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
              <h3>{p.name}</h3>
              <p className="desc">{p.desc}</p>
              <p className="price">Rs {p.price}</p>
              <div className="btn-row">
                <button
                  onClick={() => dispatch(addToCart(p))}
                  className="btn btn-primary"
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => dispatch(addToWishlist(p))}
                  className="btn btn-secondary"
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
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="custom-card card cart-card">
                <h3>{item.name}</h3>
                <p className="price">Rs {item.price}</p>
                <div className="qty-control">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="btn btn-secondary btn-small"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="btn btn-secondary btn-small"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="btn btn-danger btn-small"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="summary">
          <p>Subtotal: Rs {subtotal}</p>
          {coupon && (
            <p>
              Coupon {coupon.code}: -Rs {discount} ({coupon.discountPercent}%)
            </p>
          )}
          <p className="total">Total: Rs {total}</p>
        </div>

        <div className="coupon-row">
          <input
            type="text"
            placeholder="Enter coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button
            onClick={handleApplyCoupon}
            className="btn btn-primary btn-small"
          >
            Apply
          </button>
          {coupon && (
            <button
              onClick={() => dispatch(clearCoupon())}
              className="btn btn-secondary btn-small"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      <section>
        <h2>Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="custom-card card wishlist-card">
                <h3>{item.name}</h3>
                <p className="price">Rs {item.price}</p>
                <div className="btn-row">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="btn btn-primary btn-small"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
