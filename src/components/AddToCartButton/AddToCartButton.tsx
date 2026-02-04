"use client";

import toast from "react-hot-toast";
import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/product.types";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <button
      onClick={() => {
        addToCart(product);
        toast.success("Added to cart");
      }}
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
