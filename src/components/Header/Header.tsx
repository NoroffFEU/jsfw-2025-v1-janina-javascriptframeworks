"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        background: "#000",
        zIndex: 10,
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <strong style={{ fontSize: "1.1rem" }}>Online Shop</strong>
      </Link>

      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link href="/contact" style={{ textDecoration: "none" }}>
          Contact
        </Link>

        <Link href="/cart" style={{ textDecoration: "none", position: "relative" }}>
          Cart
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "22px",
              height: "22px",
              padding: "0 6px",
              borderRadius: "999px",
              background: "#000",
              color: "#fff",
              marginLeft: "8px",
              fontSize: "12px",
            }}
          >
            {itemCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}
