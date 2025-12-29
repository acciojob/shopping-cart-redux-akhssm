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
            <p>{p.name}</p>
            <p>₹{p.price}</p>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
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
  );
}

export default ProductList;
