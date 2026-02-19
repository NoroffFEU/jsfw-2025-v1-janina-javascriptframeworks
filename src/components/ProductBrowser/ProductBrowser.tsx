"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product.types";

type Props = {
  products: Product[];
};

type SortKey =
  | "relevance"
  | "title-asc"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

function getEffectivePrice(p: Product) {
  return p.discountedPrice < p.price ? p.discountedPrice : p.price;
}

export default function ProductBrowser({ products }: Props) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("relevance");

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((p) => {
      const haystack = `${p.title} ${p.description} ${(p.tags ?? []).join(
        " "
      )}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [products, normalizedQuery]);

  const sorted = useMemo(() => {
    const copy = [...filtered];

    switch (sort) {
      case "title-asc":
        copy.sort((a, b) => a.title.localeCompare(b.title));
        return copy;
      case "price-asc":
        copy.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        return copy;
      case "price-desc":
        copy.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        return copy;
      case "rating-desc":
        copy.sort((a, b) => b.rating - a.rating);
        return copy;
      case "relevance":
      default:
        return copy;
    }
  }, [filtered, sort]);

  const quickResults = useMemo(() => {
    if (!normalizedQuery) return [] as Product[];
    return sorted.slice(0, 8);
  }, [normalizedQuery, sorted]);

  return (
    <>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
        Online Shop
      </h1>

      <section
        aria-label="Search and sort products"
        style={{
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns: "1fr",
          marginBottom: "1rem",
          maxWidth: "900px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="search"
            style={{ display: "block", fontSize: "0.9rem" }}
          >
            Search
          </label>

          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              marginTop: "6px",
            }}
            autoComplete="off"
          />

          {/* Clickable results container (required by brief) */}
          {normalizedQuery && (
            <div
              role="listbox"
              aria-label="Search results"
              style={{
                position: "absolute",
                zIndex: 20,
                width: "100%",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                background: "#fff",
                overflow: "hidden",
                boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              }}
            >
              {quickResults.length ? (
                quickResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    role="option"
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "10px 12px",
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <img
                      src={p.image.url}
                      alt={p.image.alt || p.title}
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.title}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#555" }}>
                        {getEffectivePrice(p)} · Rating {p.rating}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: "10px 12px", color: "#555" }}>
                  No matches found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sort */}
        <div style={{ display: "grid", gap: "6px" }}>
          <label htmlFor="sort" style={{ fontSize: "0.9rem" }}>
            Sort
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
              color: "#000",
              fontWeight: 500,
            }}
          >
            <option value="relevance">Relevance</option>
            <option value="title-asc">Title (A–Z)</option>
            <option value="price-asc">Price (low → high)</option>
            <option value="price-desc">Price (high → low)</option>
            <option value="rating-desc">Rating (high → low)</option>
          </select>
        </div>
      </section>

      <p style={{ marginBottom: "1rem", color: "#555" }}>
        Showing {sorted.length} product{sorted.length === 1 ? "" : "s"}.
      </p>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {sorted.map((product) => {
          const hasDiscount = product.discountedPrice < product.price;
          const discountPercentage = hasDiscount
            ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
            : 0;

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "12px",
                  position: "relative",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {hasDiscount && (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      fontSize: "12px",
                      padding: "4px 8px",
                      borderRadius: "999px",
                      border: "1px solid #ddd",
                      background: "#f5f5f5",
                    }}
                  >
                    -{discountPercentage}%
                  </span>
                )}

                <img
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h2 style={{ fontSize: "1rem", marginTop: "0.75rem" }}>
                  {product.title}
                </h2>

                <p style={{ margin: "0.5rem 0" }}>
                  {hasDiscount ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "8px",
                          color: "#777",
                        }}
                      >
                        {product.price}
                      </span>
                      <strong>{product.discountedPrice}</strong>
                    </>
                  ) : (
                    <strong>{product.price}</strong>
                  )}
                </p>

                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                  Rating: {product.rating}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
