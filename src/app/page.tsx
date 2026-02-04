import { fetchProducts } from "@/services/onlineShop";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Online Shop
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => {
          const hasDiscount = product.discountedPrice < product.price;
          const discountPercentage = hasDiscount
            ? Math.round(
                ((product.price - product.discountedPrice) /
                  product.price) *
                  100
              )
            : 0;

          return (
            <article
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "12px",
                position: "relative",
                background: "#fff",
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
          );
        })}
      </div>
    </main>
  );
}
