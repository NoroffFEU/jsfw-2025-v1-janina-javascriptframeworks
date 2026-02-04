"use client";

import { useCartStore } from "@/stores/cart.store";
import toast from "react-hot-toast";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotal,
    clearCart,
  } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <h2 className="font-medium">{product.title}</h2>
              <p>{product.discountedPrice}</p>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  updateQuantity(product.id, Number(e.target.value))
                }
                className="mt-2 w-16 border rounded px-2"
              />
            </div>

            <button
              onClick={() => {
                removeFromCart(product.id);
                toast.success("Item removed");
              }}
              className="text-sm text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <strong>Total: {getTotal()}</strong>

        <button
          onClick={() => {
            clearCart();
            toast.success("Checkout successful");
          }}
          className="px-4 py-2 border rounded"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
