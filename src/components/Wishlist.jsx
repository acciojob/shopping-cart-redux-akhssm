// src/components/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/actions";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-grid">
      {wishlist.map((p) => (
        <div className="custom-card card" key={p.id}>
          <div className="card-body">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            {/* ONLY ONE BUTTON */}
            <button
              className="btn btn-remove-wishlist"
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
