"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-4">
        🎉 Checkout Successful!
      </h1>

      <p className="mb-6">
        Thank you for your purchase. Your order has been placed.
      </p>

      <Link
        href="/"
        className="inline-block px-4 py-2 border rounded"
      >
        Back to shop
      </Link>
    </main>
  );
}
