import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const collections = [
  {
    name: "Pure Brilliance",
    slug: "pure-brilliance",
    description: "Stay glowing and healthy without having to think about it.",
    image: "/_ipx/w_3072&f_jpeg&q_95/explore-1.jpg",
  },
  {
    name: "Varnaya Blends",
    slug: "varnaya-blends",
    description: "A Blend of Ayurveda & Science.",
    image: "/_ipx/w_3072&f_jpeg&q_95/explore-2.jpg",
  },
  {
    name: "Daily Dew",
    slug: "daily-dew",
    description: "For Daily Hydration & Nourishment.",
    image: "/_ipx/w_3072&f_jpeg&q_95/explore-3.jpg",
  },
  {
    name: "Clear Difference",
    slug: "clear-difference",
    description: "For Reduce Blackouts & Breakouts.",
    image: "/_ipx/w_3072&f_jpeg&q_95/explore-4.jpg",
  },
  {
    name: "C Luminance",
    slug: "c-luminance",
    description: "For Brightening & Revitalizing.",
    image: "/_ipx/w_3072&f_jpeg&q_95/explore-5.jpg",
  },
];

const categories = [
  { name: "Cleansers", slug: "cleansers" },
  { name: "Toners", slug: "toners" },
  { name: "Tonics", slug: "tonics" },
  { name: "Serums", slug: "serums" },
  { name: "Moisturisers", slug: "moisturisers" },
  { name: "Facial Oils", slug: "facial-oils" },
  { name: "Sleeping Mask", slug: "sleeping-mask" },
];

const products = [
  {
    name: "AHA Brightening Exfoliant Cleanser/Face Wash",
    slug: "aha-brightening-exfoliant-cleanserface-wash",
    price: 899,
    collection: "pure-brilliance",
    category: "cleansers",
    volume: "100 ML",
    images: [
      "https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurDkbVsGrYSvh0X_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Bio Exfoliant Brightening Sleeping Mask",
    slug: "bio-exfoliant-brightening-sleeping-mask",
    price: 899,
    collection: "pure-brilliance",
    category: "sleeping-mask",
    volume: "50 ML",
    images: [
      "https://images.prismic.io/truekind/ZurMbbVsGrYSviXa_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurMb7VsGrYSviXc_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "AHA Brightening Exfoliant Toner/Essence",
    slug: "aha-brightening-exfoliant-toneressence",
    price: 899,
    collection: "pure-brilliance",
    category: "toners",
    volume: "100 ML",
    images: [
      "https://images.prismic.io/truekind/ZurL27VsGrYSviVl_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurL3bVsGrYSviVo_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Rosehip & Bakuchiol Skin Perfecting Oil",
    slug: "rosehip-bakuchiol-skin-perfecting-oil",
    price: 899,
    collection: "varnaya-blends",
    category: "facial-oils",
    volume: "30 ML",
    images: [
      "https://images.prismic.io/truekind/ZurQ9LVsGrYSvimZ_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurQ9rVsGrYSvimb_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Manjistha and Saffron Moisture Gel",
    slug: "manjistha-and-saffron-moisture-gel",
    price: 899,
    collection: "varnaya-blends",
    category: "moisturisers",
    volume: "50 ML",
    images: [
      "https://images.prismic.io/truekind/ZurQjbVsGrYSvik0_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurQj7VsGrYSvik3_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Acne Calming Herb Rescue Mask",
    slug: "acne-calming-herb-rescue-mask",
    price: 899,
    collection: "varnaya-blends",
    category: "sleeping-mask",
    volume: "50 ML",
    images: [
      "https://images.prismic.io/truekind/ZurNf7VsGrYSviaK_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurNgbVsGrYSviaN_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Kumkumadi Radiance Facial Oil",
    slug: "kumkumadi-radiance-facial-oil",
    price: 899,
    collection: "varnaya-blends",
    category: "facial-oils",
    volume: "30 ML",
    images: [
      "https://images.prismic.io/truekind/ZurP_7VsGrYSvijF_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurQAbVsGrYSvijG_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Vitamin C 15% Brightening Serum",
    slug: "vitamin-c-15-brightening-serum",
    price: 899,
    collection: "c-luminance",
    category: "serums",
    volume: "30 ML",
    images: [
      "https://images.prismic.io/truekind/ZurTmbVsGrYSviws_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurTm7VsGrYSviwu_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "BHA & Tea Tree Acne Clearing Toner/Essence",
    slug: "bha-tea-tree-acne-clearing-toneressence",
    price: 899,
    collection: "clear-difference",
    category: "toners",
    volume: "100 ML",
    images: [
      "https://images.prismic.io/truekind/Z9b18ziBA97Gihj7_bha-%26-tea-tree-acne-clearing-toner.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurTBrVsGrYSviuY_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Pomegranate and Mint Hydrating Tonic",
    slug: "pomegranate-and-mint-hydrating-tonic",
    price: 899,
    collection: "daily-dew",
    category: "tonics",
    volume: "100 ML",
    images: [
      "https://images.prismic.io/truekind/ZurSVbVsGrYSvisH_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurSV7VsGrYSvisK_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Phyto-Retinol & Peptide Eye Cream",
    slug: "phyto-retinol-peptide-eye-cream",
    price: 899,
    collection: "daily-dew",
    category: "moisturisers",
    volume: "15 ML",
    images: [
      "https://images.prismic.io/truekind/ZurR3bVsGrYSviqH_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurR3LVsGrYSviqF_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
  {
    name: "Hyaluronic & Squalane Water Crème",
    slug: "hyaluronic-squalane-water-creme",
    price: 899,
    collection: "daily-dew",
    category: "moisturisers",
    volume: "50 ML",
    images: [
      "https://images.prismic.io/truekind/ZurSsrVsGrYSvitW_1.jpg?auto=format,compress",
      "https://images.prismic.io/truekind/ZurStLVsGrYSvitY_2.jpg?auto=format,compress",
    ],
    featured: true,
  },
];

const blogPosts = [
  {
    title: "Beauty Secrets from Around the World: Rituals and Ingredients You Need to Try",
    slug: "beauty-secrets-from-around-the-world-rituals-and-ingredients-you-need-to-try",
    excerpt:
      "Drawing from our rich ayurvedic legacy of over 30 years and embracing dermal science, we aim to create transparent skincare that is incredibly effective, safe and without harming the environment or the planet.",
    image:
      "https://images.prismic.io/truekind/Z-Ac73dAxsiBvxdO_elegant-glass-dropper-bottles.jpg?auto=format,compress",
    date: "2025-02-08",
    featured: true,
  },
  {
    title: "Your Skincare and Makeup Routine Impacts Your Well-Being",
    slug: "your-skincare-and-makeup-routine-impacts-your-well-being",
    excerpt:
      "Discover the connection between your skincare and makeup routine and overall well-being. Learn how daily beauty habits impact mental health, self-esteem, and emotional resilience, and find a healthier approach.",
    image:
      "https://images.prismic.io/truekind/Z-6shXdAxsiBwSng_journal-2.jpg?auto=format,compress",
    date: "2024-12-20",
    featured: false,
  },
  {
    title: "How to Make Your Routine More Eco-Friendly",
    slug: "how-to-make-your-routine-more-eco-friendly",
    excerpt:
      "Simple steps to make your skincare routine more sustainable and environmentally friendly.",
    image:
      "https://images.prismic.io/truekind/Z-6uzHdAxsiBwSpf_journal-3.jpg?auto=format,compress",
    date: "2025-01-25",
    featured: false,
  },
  {
    title: "Is a Toner necessary in your skincare routine?",
    slug: "is-a-toner-necessary-in-your-skincare-routine",
    excerpt: "Everything you need to know about toners and whether your routine needs one.",
    image:
      "https://images.prismic.io/truekind/Z-6siXdAxsiBwSnj_journal-4.jpg?auto=format,compress",
    date: "2025-01-28",
    featured: false,
  },
  {
    title: "The Ultimate Guide to Choosing the Right Foundation for Your Skin Tone",
    slug: "the-ultimate-guide-to-choosing-the-right-foundation-for-your-skin-tone",
    excerpt:
      "Discover global beauty secrets and rituals. Explore unique ingredients and traditions from around the world to elevate your skincare and beauty routine.",
    image:
      "https://images.prismic.io/truekind/Z-6shHdAxsiBwSnf_journal-1.jpg?auto=format,compress",
    date: "2024-11-14",
    featured: false,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clean up
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();

  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@truekind.com" },
    update: {},
    create: {
      email: "admin@truekind.com",
      name: "TrueKind Admin",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  // Create collections
  const collectionMap = new Map<string, string>();
  for (const collection of collections) {
    const created = await prisma.collection.create({
      data: collection,
    });
    collectionMap.set(collection.slug, created.id);
  }

  // Create categories
  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    const created = await prisma.category.create({
      data: category,
    });
    categoryMap.set(category.slug, created.id);
  }

  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        currency: "INR",
        volume: product.volume,
        inStock: true,
        featured: product.featured,
        collectionId: collectionMap.get(product.collection),
        categoryId: categoryMap.get(product.category),
        images: {
          create: product.images.map((url, index) => ({
            url,
            position: index,
          })),
        },
      },
    });
  }

  // Create blog category
  const blogCategory = await prisma.blogCategory.create({
    data: { name: "Skincare", slug: "skincare" },
  });

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.excerpt,
        image: post.image,
        published: true,
        featured: post.featured,
        publishedAt: new Date(post.date),
        categoryId: blogCategory.id,
      },
    });
  }

  console.log("Seed complete!");
  console.log(`Created ${products.length} products`);
  console.log(`Created ${collections.length} collections`);
  console.log(`Created ${blogPosts.length} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });