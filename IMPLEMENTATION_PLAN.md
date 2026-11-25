# TrueKind Skincare Recreation — Implementation Plan

## Reference Website Analysis Summary

### Site Structure (Section Order)
1. **Announcement bar** — contact email + phone at very top
2. **Header** — logo, nav (Shop, Philosophy, Gallery, Journal, Sign Up/Login), cart icon with count
3. **Hero** — "True to Oneself, kind to Nature" + CTA "Explore All Products" + background video
4. **Brand Commitments** — 4 principles (Clean Beyond Reproach, Radical Transparency, Potent & Multi Tasking, Conscious & Responsible)
5. **Product Collections** — Pure Brilliance, Varnaya Blends (each with product cards, hover image swap)
6. **Ethos / Philosophy** — "Hide Nothing.", Radical Transparency, 100% Transparent Formulas
7. **Quality & Ingredients** — 1800+ unsafe ingredients excluded, vegan & cruelty-free
8. **Promotional** — "Exciting offers *awaits*" + Shop Now CTA
9. **Journal** — Featured article + article grid + See all link
10. **Instagram** — "on instagram" + Instagram link + image grid
11. **Footer** — Explore nav, social links, contact, newsletter form, copyright, legal links

### Key Visual Details
- Currency: Indian Rupee (₹), most products ₹899
- Two images per product (desktop hover swap: `_1.jpg` / `_2.jpg`)
- Images served from `images.prismic.io` and `/_ipx/` (Next.js image optimization)
- Clean minimal aesthetic, lots of white space
- Serif headings, sans-serif body copy
- Footer has desktop/mobile image variants
- Cart is a side drawer/panel overlay

### Pages
- `/` Homepage
- `/products` Shop with filters (Range, Type, Ingredients)
- `/products/[slug]` Product detail (tabs: About, Ingredients, Usage, FAQ)
- `/philosophy` Brand Philosophy
- `/journal` Journal listing
- `/journal/[slug]` Article detail
- `/login` Login
- `/signup` Sign Up
- `/gallery` Gallery
- Cart drawer overlay

## Project Structure (Monorepo)

```
truekind-recreation/
├── apps/web/          # Next.js frontend
├── apps/api/          # NestJS backend
├── packages/shared/   # Shared TypeScript types
├── docker-compose.yml
└── package.json
```

## Implementation Phases

### Phase 1 — Research ✅ COMPLETE
- Inspected homepage, shop, product detail, philosophy, journal, login, signup, gallery
- Documented all sections, products, pricing, images, copy
- Identified image sources (Prismic + /_ipx/)

### Phase 2 — Project Setup
- Initialize monorepo with Next.js (App Router) + NestJS
- Configure Tailwind CSS, TypeScript
- Set up Prisma + PostgreSQL
- Configure shared types package
- Install dependencies (Framer Motion, Lucide React, React Hook Form, Zod, etc.)

### Phase 3 — Frontend Homepage (Section by Section)
1. Header + Announcement bar + Cart drawer
2. Hero section with video background
3. Brand Commitments section
4. Product Collections (Pure Brilliance, Varnaya Blends)
5. Ethos / Philosophy section
6. Quality & Ingredients section
7. Promotional section
8. Journal section
9. Instagram section
10. Newsletter + Footer

### Phase 4 — Backend
- Prisma schema with all models
- NestJS modules: Auth, Users, Products, Cart, Orders, Payments, Newsletter, Blog, Admin
- Migrations + seed data

### Phase 5 — Frontend Integration
- Connect to backend API
- Product fetching, cart, auth, orders, newsletter, blog

### Phase 6 — Additional Pages
- Shop, Product Details, Philosophy, Journal, Article Detail, Login, Register, Cart, Checkout, Account

### Phase 7 — QA & Polish
- Visual comparison, responsive testing, API testing, lint, build