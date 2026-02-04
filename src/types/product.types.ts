export type ApiListResponse<T> = {
  data: T[];
  meta?: unknown;
};

export type ApiSingleResponse<T> = {
  data: T;
  meta?: unknown;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  rating: number;
  tags?: string[];
  reviews?: Array<{
    id?: string;
    username?: string;
    rating?: number;
    description?: string;
  }>;
  image: {
    url: string;
    alt: string;
  };
};
