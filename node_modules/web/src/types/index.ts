export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  collection: string;
  images: string[];
  features: string[];
  recommendedFor: string[];
  suitableFor: string[];
  keyIngredients: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  fullIngredientList: Array<{
    ingredient: string;
    ewgRating: number;
    concentration: string;
  }>;
  usage: {
    whenToApply: string;
    howToUse: string;
    goodToKnow: string;
    dose: string;
    precautions: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  benefits: Array<{
    name: string;
    icon?: string;
  }>;
  volume: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  featured: boolean;
  category: string;
};

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
};

export type Order = {
  id: string;
  userId: string;
  items: Array<{ productId: string; quantity: number; price: number }>;
  total: number;
  status: string;
  createdAt: string;
};