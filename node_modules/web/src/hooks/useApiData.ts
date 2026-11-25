"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, BLOG_POSTS } from "@/lib/data";
import type { Product, BlogPost } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

type ApiImage = { id: string; url: string; position: number };
type ApiRelation = { id: string; name: string; slug: string };

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | number;
  currency: string;
  volume: string | null;
  inStock: boolean;
  featured: boolean;
  category: ApiRelation | null;
  collection: ApiRelation | null;
  images: ApiImage[];
  createdAt: string;
  updatedAt: string;
};

type ApiBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: ApiRelation | null;
};

function normalizeProduct(p: ApiProduct): Product {
  return {
    ...p,
    description: p.description || "",
    price: Number(p.price),
    currency: "₹",
    category: p.category?.name || "",
    collection: p.collection?.name || "",
    images: (p.images || []).map((img: ApiImage) => img.url),
    features: [],
    recommendedFor: [],
    suitableFor: [],
    keyIngredients: [],
    fullIngredientList: [],
    usage: {
      whenToApply: "",
      howToUse: "",
      goodToKnow: "",
      dose: "",
      precautions: "",
    },
    faqs: [],
    benefits: [],
    volume: p.volume || "",
  };
}

function normalizeBlogPost(p: ApiBlogPost): BlogPost {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || "",
    content: p.content || "",
    image: p.image || "",
    date: p.publishedAt || p.createdAt,
    featured: p.featured,
    category: p.category?.name || "",
  };
}

/**
 * Fetch products from the backend, falling back to static data on failure.
 * Keeps the site functional when the API is unavailable while rendering
 * from backend data when it is available.
 */
export function useProducts(): {
  products: Product[];
  loading: boolean;
  source: "api" | "static";
} {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "static">("static");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch(`${API_URL}/products`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json() as Promise<ApiProduct[]>;
      })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(normalizeProduct));
          setSource("api");
        }
      })
      .catch(() => {
        // Fall back to static data
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { products, loading, source };
}

export function useBlogPosts(): {
  posts: BlogPost[];
  loading: boolean;
  source: "api" | "static";
} {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "static">("static");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch(`${API_URL}/blog`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json() as Promise<ApiBlogPost[]>;
      })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.map(normalizeBlogPost));
          setSource("api");
        }
      })
      .catch(() => {
        // Fall back to static data
      })
      .finally(() => {
        clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { posts, loading, source };
}