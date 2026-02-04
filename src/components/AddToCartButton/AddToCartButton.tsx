"use client";

import toast from "react-hot-toast";

export default function AddToCartButton() {
  return (
    <button
      onClick={() => toast.success("Added to cart")}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      Add to Cart
    </button>
  );
}
