import type {
  Product,
  BlogPost,
  Collection,
  Category,
  User,
  CartItem,
  Order,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const productsApi = {
  async getAll(): Promise<Product[]> {
    return fetchApi<Product[]>("/products");
  },

  async getBySlug(slug: string): Promise<Product> {
    return fetchApi<Product>(`/products/${slug}`);
  },

  async getByCollection(collection: string): Promise<Product[]> {
    return fetchApi<Product[]>(`/products?collection=${collection}`);
  },

  async getFeatured(): Promise<Product[]> {
    return fetchApi<Product[]>("/products?featured=true");
  },
};

export const collectionsApi = {
  async getAll(): Promise<Collection[]> {
    return fetchApi<Collection[]>("/collections");
  },

  async getBySlug(slug: string): Promise<Collection> {
    return fetchApi<Collection>(`/collections/${slug}`);
  },
};

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    return fetchApi<Category[]>("/categories");
  },
};

export const blogApi = {
  async getAll(): Promise<BlogPost[]> {
    return fetchApi<BlogPost[]>("/blog");
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    return fetchApi<BlogPost>(`/blog/${slug}`);
  },

  async getFeatured(): Promise<BlogPost[]> {
    return fetchApi<BlogPost[]>("/blog/featured");
  },
};

export const authApi = {
  async login(email: string, password: string) {
    return fetchApi<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string) {
    return fetchApi<{
      user: User;
      accessToken: string;
      refreshToken: string;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};

export const newsletterApi = {
  async subscribe(email: string) {
    return fetchApi("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

export const cartApi = {
  async get(token: string): Promise<CartItem[]> {
    return fetchApi<CartItem[]>("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async add(productId: string, token: string, quantity = 1) {
    return fetchApi("/cart/items", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity }),
    });
  },
};

export const ordersApi = {
  async getAll(token: string): Promise<Order[]> {
    return fetchApi<Order[]>("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async create(data: unknown, token: string) {
    return fetchApi<Order>("/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },
};

export const paymentsApi = {
  async createCheckout(
    orderId: string,
    token: string,
    successUrl: string,
    cancelUrl: string
  ) {
    return fetchApi<{ url: string; sessionId: string; mock: boolean }>(
      "/payments/checkout",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId, successUrl, cancelUrl }),
      }
    );
  },
};