// src/components/ProductList.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../redux/actions";

const products = [
  { id: 1, name: "Laptop", price: 40000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 },
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div className="custom-card card" key={p.id}>
          <div className="card-body">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            {/* FIRST BUTTON → ADD TO CART */}
            <button
              className="btn btn-add-cart"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </button>

            {/* SECOND BUTTON → WISHLIST */}
            <button
              className="btn btn-add-wishlist"
              onClick={() => dispatch(addToWishlist(p))}
            >
              Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
