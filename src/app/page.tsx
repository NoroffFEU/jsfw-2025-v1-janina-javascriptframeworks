import { fetchProducts } from "@/services/onlineShop";
import ProductBrowser from "@/components/ProductBrowser/ProductBrowser";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Something New</h1>

          <p>
            Browse quality products, discover great deals,
            and enjoy a seamless shopping experience.
          </p>
        </div>
      </section>

      <div className="page-container">
        <ProductBrowser products={products} />
      </div>
    </main>
  );
}
