import { fetchProducts } from "@/services/onlineShop";
import ProductBrowser from "@/components/ProductBrowser/ProductBrowser";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main style={{ padding: "1.5rem" }}>
      <ProductBrowser products={products} />
    </main>
  );
}
