// src/components/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "../redux/actions";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-grid">
      {wishlist.map((p) => (
        <div className="custom-card card" key={p.id}>
          <div className="card-body">
            <p>{p.name}</p>
            <p>₹{p.price}</p>

            <button
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-danger"
              onClick={() => dispatch(removeFromWishlist(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;

