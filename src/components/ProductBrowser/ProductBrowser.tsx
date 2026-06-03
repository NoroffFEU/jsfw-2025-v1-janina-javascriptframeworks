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
      )
        } `.toLowerCase();

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
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Online Shop </h1>


      <section
        aria-label="Search and sort products"
        style={{
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns: "1fr",
          marginBottom: "1.5rem",
          maxWidth: "900px",
        }}
      >
        <div style={{ position: "relative" }}>
          <label
            htmlFor="search"
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Search
          </label>

          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            autoComplete="off"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              marginTop: "6px",
            }}
          />

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

                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#555",
                        }}
                      >
                        ${getEffectivePrice(p)} · ⭐ {p.rating}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  style={{
                    padding: "10px 12px",
                    color: "#555",
                  }}
                >
                  No matches found.
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: "6px" }}>
          <label
            htmlFor="sort"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Sort
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
              color: "#000",
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

      <p
        style={{
          marginBottom: "1.5rem",
          color: "#6b7280",
          fontWeight: 500,
        }}
      >
        Showing {sorted.length} product{sorted.length === 1 ? "" : "s"}.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {sorted.map((product) => {
          const hasDiscount = product.discountedPrice < product.price;

          const discountPercentage = hasDiscount
            ? Math.round(
              ((product.price - product.discountedPrice) /
                product.price) *
              100
            )
            : 0;

          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#fff",
                  transition: "all 0.25s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  {hasDiscount && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        zIndex: 2,
                        background: "#111827",
                        color: "#fff",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      🔥 SAVE {discountPercentage}%
                    </span>
                  )}

                  <img
                    src={product.image.url}
                    alt={product.image.alt || product.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "1rem",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {product.title}
                  </h2>

                  <p
                    style={{
                      color: "#f59e0b",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                    }}
                  >
                    ⭐ {product.rating}/5
                  </p>

                  <p>
                    {hasDiscount ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#9ca3af",
                            marginRight: "8px",
                          }}
                        >
                          ${product.price}
                        </span>

                        <strong
                          style={{
                            fontSize: "1.1rem",
                          }}
                        >
                          ${product.discountedPrice}
                        </strong>
                      </>
                    ) : (
                      <strong
                        style={{
                          fontSize: "1.1rem",
                        }}
                      >
                        ${product.price}
                      </strong>
                    )}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
