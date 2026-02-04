import type { Product } from "@/types/product.types";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();
  return json.data;
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const json = await res.json();
  return json.data;
}
