import type { Product } from "@/types";

/** Detailed product data extracted from the original TrueKind product pages. */
export interface ProductDetailData {
  subtitle?: string;
  goesWellWith?: string;
  badges: string[];
  headline?: string;
  keyIngredients: Array<{ name: string; description: string; image?: string }>;
  fullIngredientList: Array<{ ingredient: string; ewgRating: number; concentration: string }>;
  usage: {
    whenToApply: string;
    howToUse: string;
    goodToKnow: string;
    dose: string;
    precautions: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  benefits: Array<{ name: string; icon?: string }>;
  recommendedFor: string[];
  suitableFor: string[];
}

const VITAMIN_C_DETAILS: ProductDetailData = {
  subtitle: "Your Glow-Up in a bottle. This skin elixir is a brilliant cocktail of brightening & revitalizing ingredients, Combining a potent dose of direct-acting Vitamin C (Ethyl Ascorbic Acid) with Niacinamide, Hyaluronic Acid, and Natural AHAs.",
  goesWellWith: "bha-tea-tree-acne-clearing-toneressence",
  badges: ["30 Days Return", "Free Shipping", "Vegan & Cruelty Free", "Kind to planet Packeging"],
  headline: "Gradual glow with vitamins B, C, and AHAs for radiant, even-toned, luminous skin.",
  keyIngredients: [
    {
      name: "Ethyl Ascorbic Acid",
      description: "Ethyl Ascorbic Acid, a potent Vitamin C derivative and antioxidant, brightens dull skin, fades dark spots, boosts collagen, and clarifies skin tone and texture.",
      image: "https://images.prismic.io/truekind/Z9b4bDiBA97GihkM_1.Ethyl-Ascorbic-Acid-Vitamin-C-1.jpg?auto=format,compress",
    },
    {
      name: "Hyaluronic Acid",
      description: "A natural skin component, it holds 1000x its weight in water, boosting moisture, soothing dryness, and defending against moisture loss for hydrated and plump skin.",
      image: "https://images.prismic.io/truekind/Z9SEjDiBA97Gigj__hyaluronic-acid.jpg?auto=format,compress",
    },
    {
      name: "Niacinamide",
      description: "Multi-tasking skincare superstar with anti-aging, brightening, and barrier repair benefits. It accelerates epidermal cell growth and boosts collagen production for smoother, brighter skin.",
      image: "https://images.prismic.io/truekind/Z9SEjTiBA97GigkA_niacinamide.jpg?auto=format,compress",
    },
    {
      name: "Natural AHA blend",
      description: "This blend of Vaccinium myrtillus, Sugarcane, Orange, Lemon & Sugar Maple gently exfoliates, revealing a radiant and even-toned complexion, free of dark spots and imperfections.",
      image: "https://images.prismic.io/truekind/Z9b4aziBA97GihkL_3.Natural-AHA-blend-Alpha-Hydroxy-Acid.jpg?auto=format,compress",
    },
  ],
  fullIngredientList: [
    { ingredient: "Aqua", ewgRating: 1, concentration: "30% to 50%" },
    { ingredient: "1% Hyaluronic Acid Solution", ewgRating: 1, concentration: "25% to 40%" },
    { ingredient: "Ethyl Ascorbic Acid", ewgRating: 1, concentration: "17% to 18%" },
    { ingredient: "Water & Vaccinium Myrtillus Fruit/ Leaf Extract & Saccharum Officinarum (Sugar Cane) Extract & Citrus Fruit Extract & Citrus Limon (Lemon) Fruit Extract & Acer Saccharum (Sugar Maple) Extract", ewgRating: 1, concentration: "2.5% to 5%" },
    { ingredient: "Niacinamide", ewgRating: 1, concentration: "2% to 3%" },
    { ingredient: "Caprylyl Glycol (and) Phenoxythanol", ewgRating: 1, concentration: "≤ 1%" },
    { ingredient: "Xantham Gum", ewgRating: 1, concentration: "≤ 0.3%" },
    { ingredient: "Sodium Hydroxide", ewgRating: 1, concentration: "≤ 0.1%" },
  ],
  usage: {
    whenToApply: "AM & PM.",
    howToUse: "Apply 3-4 drops on your cleansed face and neck. Wait a few minutes before making your next skincare move.",
    goodToKnow: "Use after cleansing and toning and before moisturising During the day, always follow through the Moisturiser or SPF.",
    dose: "Daily.",
    precautions: "External use only.",
  },
  faqs: [
    { question: "Can I use other serums with Vitamin C?", answer: "Yes. Vitamin C layers & combines well with other actives & products." },
    { question: "Should I apply Vitamin C once or twice a day?", answer: "Vitamin C is most effectively used on the skin in the morning. It can be useful in the evening to repair and quicken the healing of skin." },
    { question: "What is the correct way to store a Vitamin C serum?", answer: "To keep your vitamin C serum from degrading or losing efficacy, take care of the serum so it will take care of you! Keep it in a cool, dark place with its cap intact." },
    { question: "What colour should my Vitamin C serum be?", answer: "Your serum should be clear, white, or a light champagne colour." },
    { question: "Why is there no Vitamin C in the ingredient details of this product?", answer: "We have Ethyl Ascorbic Acid which is one of the purest forms of Vitamin C which is used in our serum." },
  ],
  benefits: [
    { name: "Moisturises Skin", icon: "https://truekind.cdn.prismic.io/truekind/Z9SC-ziBA97Gigjm_icon-moist.svg" },
    { name: "Brightens Skin", icon: "https://truekind.cdn.prismic.io/truekind/Z7vuxJ7c43Q3gG_N_icon-skinbrightening.svg" },
    { name: "Gently Exfoliates", icon: "https://truekind.cdn.prismic.io/truekind/Z7vu757c43Q3gG_Q_icon-exfoliating.svg" },
    { name: "Anti-oxidant Rich", icon: "https://truekind.cdn.prismic.io/truekind/Z7vu7Z7c43Q3gG_O_icon-antioxidant.svg" },
  ],
  recommendedFor: ["Dull Skin", "Uneven Skin Texture", "Uneven Skin Tone"],
  suitableFor: ["Unisex skin care for all Skin Types", "Pregnancy Safe"],
};

const DEFAULT_DETAILS: ProductDetailData = {
  badges: ["30 Days Return", "Free Shipping", "Vegan & Cruelty Free", "Kind to planet Packeging"],
  keyIngredients: [],
  fullIngredientList: [],
  usage: {
    whenToApply: "AM & PM.",
    howToUse: "Apply on cleansed face and neck.",
    goodToKnow: "Always follow through the Moisturiser or SPF.",
    dose: "Daily.",
    precautions: "External use only.",
  },
  faqs: [],
  benefits: [],
  recommendedFor: ["Dull Skin", "Uneven Skin Texture", "Uneven Skin Tone"],
  suitableFor: ["Unisex skin care for all Skin Types", "Pregnancy Safe"],
};

export function getProductDetails(slug: string): ProductDetailData {
  if (slug.includes("vitamin-c")) return VITAMIN_C_DETAILS;
  return DEFAULT_DETAILS;
}