import { fetchProductById } from "@/services/onlineShop";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // ✅ unwrap params promise
  const product = await fetchProductById(id);

  const hasDiscount = product.discountedPrice < product.price;

  return (
    <main style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <img
        src={product.image.url}
        alt={product.image.alt || product.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <h1 style={{ marginTop: "1rem" }}>{product.title}</h1>

      <p style={{ margin: "0.75rem 0", color: "#555" }}>
        {product.description}
      </p>

      <p>
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

      <p style={{ marginTop: "0.5rem" }}>Rating: {product.rating}</p>

      {product.tags?.length ? (
        <div style={{ marginTop: "1rem" }}>
          <strong>Tags:</strong>
          <ul>
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {product.reviews?.length ? (
        <div style={{ marginTop: "1rem" }}>
          <strong>Reviews:</strong>
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index}>
                {review.description} ({review.rating}/5)
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div style={{ marginTop: "1.5rem" }}>
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
