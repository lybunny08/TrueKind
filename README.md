# TrueKind Skincare — Full-Stack Recreation

A faithful recreation of [truekindskincare.com](https://truekindskincare.com/) built with Next.js (App Router), NestJS, Prisma and PostgreSQL.

> **Note:** This is a learning/recreation project and is not affiliated with TrueKind Skincare.

## Project Structure

```
truekind-recreation/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   └── src/
│   │       ├── app/            # App Router pages
│   │       ├── components/     # Modular UI components
│   │       ├── contexts/       # React contexts (cart)
│   │       ├── hooks/
│   │       ├── lib/            # Utilities + static fallback data
│   │       ├── services/       # API client layer
│   │       ├── styles/
│   │       └── types/
│   └── api/                    # NestJS backend
│       └── src/
│           ├── auth/           # JWT auth, registration, login
│           ├── users/          # Profiles, addresses
│           ├── products/       # Product CRUD
│           ├── categories/
│           ├── collections/
│           ├── cart/           # Shopping cart
│           ├── orders/         # Orders
│           ├── payments/       # Stripe integration
│           ├── newsletter/     # Subscriptions
│           ├── blog/           # Journal articles
│           ├── admin/          # Admin endpoints
│           └── prisma/         # Prisma service
├── packages/shared/            # Shared TypeScript types
├── docker-compose.yml          # PostgreSQL container
└── package.json                # Workspace scripts
```

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for PostgreSQL) or a local PostgreSQL instance
- npm 11+

### 1. Start PostgreSQL

```bash
docker-compose up -d postgres
```

### 2. Backend setup

```bash
cd apps/api
npm install
npx prisma generate
npx prisma migrate dev      # or: npx prisma migrate deploy
npm run prisma:seed
npm run start:dev            # API runs on http://localhost:3001
```

Swagger docs: `http://localhost:3001/api/docs`

### 3. Frontend setup

```bash
cd apps/web
npm install
npm run dev                  # Web runs on http://localhost:3000
```

### Environment variables

**Backend** (`apps/api/.env`):

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/truekind` |
| `JWT_ACCESS_SECRET` | JWT access token secret | (set your own) |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | (set your own) |
| `STRIPE_SECRET_KEY` | Stripe secret key | (placeholder) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | (placeholder) |
| `PORT` | API port | `3001` |

**Frontend** (`apps/web/.env.local`):

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/api` |

## Visual Fidelity

The frontend was rebuilt to faithfully match the original site's design system:

- **Exact fonts**: PP Mori (400/600) and Editorial New (regular/italic/light italic) downloaded from the original site into `apps/web/public/fonts/`
- **Exact colors**: text `#3b3b3b`, hero `#f3e8e7`, ethos `#f5f5f5`, journal `#222`, footer email `#232323`, product cards `#f0cbce`
- **Exact original CSS**: the complete original CSS (46KB, including all responsive media queries at 767.98px) is in `apps/web/src/app/original.css`, imported before Tailwind so all section styles match pixel-for-pixel
- **Original DOM structure**: components use the exact original class names (`.half__grid`, `.ingredients__item`, `.journal__card`, `.connect__title-2`, `.navbar-cta`, etc.) and Bootstrap-style grid (`.row`, `.col-md-2`, etc.) so responsive behavior is identical
- **Fluid typography**: `html { font-size: 0.833333vw }` (16px @ 1920px, 3.73333vw on mobile)
- **Uppercase headings**: 4.5rem / 600 weight, plus Editorial New italic serif accents
- **Original layout patterns**: fixed transparent→white header, pill CTAs with circular arrows, pink rounded product cards with hover image crossfade, dark journal section, parallax footer with overlapping dark newsletter
- **Original assets**: real images and SVG icons downloaded into `apps/web/public/`
- **GSAP animations**: `gsap`, `ScrollTrigger`, `CustomEase`, `@gsap/react` with the site's signature `cubic-bezier(.18,.71,.11,1)` easing, parallax effects, scroll reveals, and header scroll behavior
- **Preloader**: the original's preloader with an Editorial New number counter, spinner, and two dark curtains that split to reveal the site (with a fallback for throttled rAF)
- **Exact DOM structure verified**: `.half__grid` sections sit at full viewport width (outside `.container`), the Quality block is integrated into the Quiz section (not standalone), the Journal uses the exact `.col-md-6` + `.col-md-6 d-flex flex-column` layout, and the hero has both desktop (2050×1080) and mobile (1080×1920) videos with posters
- **Product card pixel-perfect**: `<a href="/products/[slug]">` wrapping `.product__card-head` (`.product__card-category.pill-fill` + `.product__card-quickcart` white cart circle) and `.product__content` (two crossfading `.media-img.product__card-img/2` + `.product__card-foot` with title `max-width:70%` and price). Background `#f1cccf`, radius 14px, padding `1.5rem 1rem`, 233px wide. The slider has a `grab` cursor with drag-to-scroll, and the white Lucide `ArrowRight` sits on the collection title's `.slider-arrow` button, not on the product title
- **Footer parallax image**: `footer.jpg` renders at 942×574 inside a 517px `.footer__parallax` container, exactly like the original
- **Responsive verified at 375px and 942px** via an injected iframe: fluid base font (14px mobile / 7.85px desktop), mobile/desktop video swap, `.col-md-*` stacking, `.d-none/.d-md-block` visibility toggles, 92% swiper slides on mobile, 184.5px cards on desktop, dark journal stacking, and full-width newsletter panel on mobile — all matching the original's 92 media queries at the 767.98px breakpoint
- **Product detail page** rebuilt from the original webfetch data: product hero with collection label, volume, price, QTY stepper and "Add to cart" pill; "Goes well with" cross-sell; badges (30 Days Return, Free Shipping, Vegan & Cruelty Free, Kind to planet Packaging); headline with Editorial New italic; "all about the Product" tabs (About/Ingredients/Usage/FAQ) with key ingredients, full EWG ingredient table, usage info and 5 FAQs; "Zero toxics Given, 1800+ Restricted Ingredients" section; and featured products. Detailed copy lives in `apps/web/src/lib/product-details.ts`
- **Real hero videos**: `/hero.mp4` and `/hero-m.mp4` downloaded from the original site (with posters)
- **Exact typographic details** verified against the original DOM:
  - Hero title: 6.5rem PP Mori with "True" and "Nature" in Editorial New italic
  - "skincare." and "pure potency": 1.4em Editorial New italic, underlined
  - "Hide" in Editorial New italic uppercase, "Nothing." in PP Mori
  - "on instagram" entirely in Editorial New italic with a `<br>`
  - Collection titles: first word PP Mori, second word Editorial New italic
  - Journal "clean" at 1.4em serif italic
  - Footer "Hear more from Us" as uppercase h5

## Features

### Frontend
- Responsive homepage with all 10 sections matching the reference
- Shop page with filters (Range, Type, Ingredients)
- Product detail pages with About/Ingredients/Usage/FAQ tabs
- Philosophy, Gallery, Journal, and Article detail pages
- Login, Sign Up, Cart, Checkout, Account pages
- Cart drawer with quantity controls and subtotal
- Mobile navigation menu
- Newsletter subscription
- Framer Motion animations (respecting `prefers-reduced-motion`)
- Semantic HTML and accessible components

### Backend
- JWT authentication with refresh tokens
- bcrypt password hashing
- Protected routes with role-based access control
- Full CRUD for products, categories, collections
- Cart persistence for authenticated users
- Order management
- Stripe checkout sessions and webhook handling
- Newsletter subscription with duplicate prevention
- Blog article management
- Swagger API documentation
- Input validation with class-validator DTOs

## Seed Data

The seed script creates:

- 5 collections (Pure Brilliance, Varnaya Blends, Daily Dew, Clear Difference, C Luminance)
- 7 categories
- 12 products with images from the original website
- 5 blog articles
- 1 admin user (`admin@truekind.com` / `admin123`)

## Known Limitations

- **Hero video**: The original background video asset is not publicly downloadable. A poster image placeholder is used with the video element.
- **Decorative images**: Some /_ipx/ source images from the original site were not available; proportionally correct placeholder SVGs are used.
- **Stripe**: Payment integration is prepared but requires real Stripe API keys to process payments. Without keys, a mock checkout flow is used.
- **External images**: Product images are served from Prismic CDN; they require internet access to display.

## Development Notes

- Products render from a static fallback layer in `apps/web/src/lib/data.ts` when the backend is unavailable, ensuring the site always works.
- The API service layer in `apps/web/src/services/api.ts` centralizes all backend communication.
- Shared types live in `packages/shared/src/index.ts`.
