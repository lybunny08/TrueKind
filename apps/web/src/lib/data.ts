import type { Product, BlogPost, Collection, Category } from "@/types";

const productImages = {
  ahaCleanser: [
    "https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurDkbVsGrYSvh0X_2.jpg?auto=format,compress",
  ],
  bioMask: [
    "https://images.prismic.io/truekind/ZurMbbVsGrYSviXa_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurMb7VsGrYSviXc_2.jpg?auto=format,compress",
  ],
  ahaToner: [
    "https://images.prismic.io/truekind/ZurL27VsGrYSviVl_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurL3bVsGrYSviVo_2.jpg?auto=format,compress",
  ],
  rosehipOil: [
    "https://images.prismic.io/truekind/ZurQ9LVsGrYSvimZ_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurQ9rVsGrYSvimb_2.jpg?auto=format,compress",
  ],
  manjisthaGel: [
    "https://images.prismic.io/truekind/ZurQjbVsGrYSvik0_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurQj7VsGrYSvik3_2.jpg?auto=format,compress",
  ],
  acneMask: [
    "https://images.prismic.io/truekind/ZurNf7VsGrYSviaK_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurNgbVsGrYSviaN_2.jpg?auto=format,compress",
  ],
  kumkumadiOil: [
    "https://images.prismic.io/truekind/ZurP_7VsGrYSvijF_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurQAbVsGrYSvijG_2.jpg?auto=format,compress",
  ],
  vitaminC: [
    "https://images.prismic.io/truekind/ZurTmbVsGrYSviws_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurTm7VsGrYSviwu_2.jpg?auto=format,compress",
  ],
  bhaToner: [
    "https://images.prismic.io/truekind/Z9b18ziBA97Gihj7_bha-%26-tea-tree-acne-clearing-toner.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurTBrVsGrYSviuY_2.jpg?auto=format,compress",
  ],
  pomegranateTonic: [
    "https://images.prismic.io/truekind/ZurSVbVsGrYSvisH_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurSV7VsGrYSvisK_2.jpg?auto=format,compress",
  ],
  eyeCream: [
    "https://images.prismic.io/truekind/ZurR3bVsGrYSviqH_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurR3LVsGrYSviqF_2.jpg?auto=format,compress",
  ],
  waterCreme: [
    "https://images.prismic.io/truekind/ZurSsrVsGrYSvitW_1.jpg?auto=format,compress",
    "https://images.prismic.io/truekind/ZurStLVsGrYSvitY_2.jpg?auto=format,compress",
  ],
};

function makeProduct(
  id: string,
  name: string,
  slug: string,
  collection: string,
  category: string,
  volume: string,
  images: string[],
  description = ""
): Product {
  return {
    id,
    name,
    slug,
    description,
    price: 899,
    currency: "₹",
    category,
    collection,
    images,
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
    volume,
    inStock: true,
    featured: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  };
}

export const PRODUCTS: Product[] = [
  makeProduct(
    "1",
    "AHA Brightening Exfoliant Cleanser/Face Wash",
    "aha-brightening-exfoliant-cleanserface-wash",
    "Pure Brilliance",
    "Cleansers",
    "100 ML",
    productImages.ahaCleanser
  ),
  makeProduct(
    "2",
    "Bio Exfoliant Brightening Sleeping Mask",
    "bio-exfoliant-brightening-sleeping-mask",
    "Pure Brilliance",
    "Sleeping Mask",
    "50 ML",
    productImages.bioMask
  ),
  makeProduct(
    "3",
    "AHA Brightening Exfoliant Toner/Essence",
    "aha-brightening-exfoliant-toneressence",
    "Pure Brilliance",
    "Toners",
    "100 ML",
    productImages.ahaToner
  ),
  makeProduct(
    "4",
    "Rosehip & Bakuchiol Skin Perfecting Oil",
    "rosehip-bakuchiol-skin-perfecting-oil",
    "Varnaya Blends",
    "Facial Oils",
    "30 ML",
    productImages.rosehipOil
  ),
  makeProduct(
    "5",
    "Manjistha and Saffron Moisture Gel",
    "manjistha-and-saffron-moisture-gel",
    "Varnaya Blends",
    "Moisturisers",
    "50 ML",
    productImages.manjisthaGel
  ),
  makeProduct(
    "6",
    "Acne Calming Herb Rescue Mask",
    "acne-calming-herb-rescue-mask",
    "Varnaya Blends",
    "Sleeping Mask",
    "50 ML",
    productImages.acneMask
  ),
  makeProduct(
    "7",
    "Kumkumadi Radiance Facial Oil",
    "kumkumadi-radiance-facial-oil",
    "Varnaya Blends",
    "Facial Oils",
    "30 ML",
    productImages.kumkumadiOil
  ),
  makeProduct(
    "8",
    "Vitamin C 15% Brightening Serum",
    "vitamin-c-15-brightening-serum",
    "C Luminance",
    "Serums",
    "30 ML",
    productImages.vitaminC,
    "Your Glow-Up in a bottle. This skin elixir is a brilliant cocktail of brightening & revitalizing ingredients, Combining a potent dose of direct-acting Vitamin C (Ethyl Ascorbic Acid) with Niacinamide, Hyaluronic Acid, and Natural AHAs."
  ),
  makeProduct(
    "9",
    "BHA & Tea Tree Acne Clearing Toner/Essence",
    "bha-tea-tree-acne-clearing-toneressence",
    "Clear Difference",
    "Toners",
    "100 ML",
    productImages.bhaToner
  ),
  makeProduct(
    "10",
    "Pomegranate and Mint Hydrating Tonic",
    "pomegranate-and-mint-hydrating-tonic",
    "Daily Dew",
    "Tonics",
    "100 ML",
    productImages.pomegranateTonic
  ),
  makeProduct(
    "11",
    "Phyto-Retinol & Peptide Eye Cream",
    "phyto-retinol-peptide-eye-cream",
    "Daily Dew",
    "Moisturisers",
    "15 ML",
    productImages.eyeCream
  ),
  makeProduct(
    "12",
    "Hyaluronic & Squalane Water Crème",
    "hyaluronic-squalane-water-creme",
    "Daily Dew",
    "Moisturisers",
    "50 ML",
    productImages.waterCreme
  ),
];

export const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    name: "Pure Brilliance",
    slug: "pure-brilliance",
    description: "Stay glowing and healthy without having to think about it.",
    image: "/explore-1.jpg",
    products: PRODUCTS.filter((p) => p.collection === "Pure Brilliance"),
  },
  {
    id: "c2",
    name: "Varnaya Blends",
    slug: "varnaya-blends",
    description: "A Blend of Ayurveda & Science.",
    image: "/explore-2.jpg",
    products: PRODUCTS.filter((p) => p.collection === "Varnaya Blends"),
  },
];

export const CATEGORIES: Category[] = [
  { id: "cat1", name: "Serums", slug: "serums" },
  { id: "cat2", name: "Toners", slug: "toners" },
  { id: "cat3", name: "Cleansers", slug: "cleansers" },
  { id: "cat4", name: "Tonics", slug: "tonics" },
  { id: "cat5", name: "Sleeping Mask", slug: "sleeping-mask" },
  { id: "cat6", name: "Moisturisers", slug: "moisturisers" },
  { id: "cat7", name: "Facial Oils", slug: "facial-oils" },
];

const BLOG_IMAGES = {
  beauty:
    "https://images.prismic.io/truekind/Z-Ac73dAxsiBvxdO_elegant-glass-dropper-bottles.jpg?auto=format,compress",
  wellbeing:
    "https://images.prismic.io/truekind/Z-6shXdAxsiBwSng_journal-2.jpg?auto=format,compress",
  eco: "https://images.prismic.io/truekind/Z-6uzHdAxsiBwSpf_journal-3.jpg?auto=format,compress",
  toner:
    "https://images.prismic.io/truekind/Z-6siXdAxsiBwSnj_journal-4.jpg?auto=format,compress",
  foundation:
    "https://images.prismic.io/truekind/Z-6shHdAxsiBwSnf_journal-1.jpg?auto=format,compress",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title:
      "Beauty Secrets from Around the World: Rituals and Ingredients You Need to Try",
    slug: "beauty-secrets-from-around-the-world-rituals-and-ingredients-you-need-to-try",
    excerpt:
      "Drawing from our rich ayurvedic legacy of over 30 years and embracing dermal science, we aim to create transparent skincare that is incredibly effective, safe and without harming the environment or the planet.",
    content:
      "Drawing from our rich ayurvedic legacy of over 30 years and embracing dermal science, we aim to create transparent skincare that is incredibly effective, safe and without harming the environment or the planet. Discover beauty rituals from around the world that have stood the test of time, and the ingredients that make them effective.",
    image: BLOG_IMAGES.beauty,
    date: "2025-02-08",
    featured: true,
    category: "Skincare",
  },
  {
    id: "b2",
    title: "Is a Toner necessary in your skincare routine?",
    slug: "is-a-toner-necessary-in-your-skincare-routine",
    excerpt:
      "Everything you need to know about toners and whether your routine needs one.",
    content:
      "Toners have been a subject of much debate in the skincare world. Are they essential or just an extra step? Learn about the benefits of toners and how to determine if your skincare routine would benefit from one.",
    image: BLOG_IMAGES.toner,
    date: "2025-01-28",
    featured: false,
    category: "Skincare",
  },
  {
    id: "b3",
    title: "How to Make Your Routine More Eco-Friendly",
    slug: "how-to-make-your-routine-more-eco-friendly",
    excerpt:
      "Simple steps to make your skincare routine more sustainable and environmentally friendly.",
    content:
      "Making your skincare routine more eco-friendly doesn't have to be complicated. Discover simple swaps and habits that reduce waste and environmental impact without compromising on results.",
    image: BLOG_IMAGES.eco,
    date: "2025-01-25",
    featured: false,
    category: "Lifestyle",
  },
  {
    id: "b4",
    title: "Your Skincare and Makeup Routine Impacts Your Well-Being",
    slug: "your-skincare-and-makeup-routine-impacts-your-well-being",
    excerpt:
      "Discover the connection between your skincare and makeup routine and overall well-being. Learn how daily beauty habits impact mental health, self-esteem, and emotional resilience, and find a healthier approach.",
    content:
      "Discover the connection between your skincare and makeup routine and overall well-being. Learn how daily beauty habits impact mental health, self-esteem, and emotional resilience, and find a healthier approach to your daily rituals.",
    image: BLOG_IMAGES.wellbeing,
    date: "2024-12-20",
    featured: false,
    category: "Wellness",
  },
  {
    id: "b5",
    title:
      "The Ultimate Guide to Choosing the Right Foundation for Your Skin Tone",
    slug: "the-ultimate-guide-to-choosing-the-right-foundation-for-your-skin-tone",
    excerpt:
      "Discover global beauty secrets and rituals. Explore unique ingredients and traditions from around the world to elevate your skincare and beauty routine.",
    content:
      "Finding the right foundation can transform your entire look. This comprehensive guide covers everything from understanding your undertones to selecting the perfect shade and formula for your skin type.",
    image: BLOG_IMAGES.foundation,
    date: "2024-11-14",
    featured: false,
    category: "Makeup",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}