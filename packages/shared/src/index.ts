// Shared types between frontend and backend

export type Role = "CUSTOMER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  volume: string | null;
  inStock: boolean;
  featured: boolean;
  category: { id: string; name: string; slug: string } | null;
  collection: { id: string; name: string; slug: string } | null;
  images: Array<{ id: string; url: string; position: number }>;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  category: { id: string; name: string; slug: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemDto {
  id: string;
  productId: string;
  quantity: number;
  product: ProductDto;
}

export interface CartDto {
  id: string;
  items: CartItemDto[];
  subtotal: number;
  itemCount: number;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SubscribeRequest {
  email: string;
}

export interface CreateOrderRequest {
  addressId?: string;
  items: Array<{ productId: string; quantity: number }>;
  shipping?: number;
  tax?: number;
}
