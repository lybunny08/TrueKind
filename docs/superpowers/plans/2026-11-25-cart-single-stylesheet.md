# Cart Single Stylesheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Regrouper les tailles et espacements des trois écrans du panier dans `cart.css` et fixer « Browse Products » à 12px, sans changer le reste du rendu.

**Architecture:** Un fichier CSS unique `apps/web/src/styles/cart.css`, importé depuis `globals.css` après Tailwind, porte des variables et des règles sous le scope `.cart-ui`. Les trois composants ajoutent `.cart-ui` à leur racine et perdent leurs classes arbitraires de taille. `original.css` n'est pas modifié.

**Tech Stack:** Next.js 16.4.6, React 19.3, Tailwind CSS 4.3.3, Playwright Python.

**Spec:** `docs/superpowers/specs/2026-11-25-cart-single-stylesheet-design.md`

## Global Constraints

- Desktop = `min-width: 768px` ; mobile = dessous.
- Valeurs exactes des variables : `--cart-drawer-title` `2,380952381rem` / `1,6rem`, `--cart-page-title` `1,875rem` / `2,25rem`, `--cart-summary-title` `1,25rem`, `--cart-page-cta` `1,125rem`, `--cart-link` `12px`, `--cart-cta` `0,8rem` / `0,6rem`, `--cart-cta-arrow` `3rem` / `2rem`, `--cart-cta-pad-y` `1,5rem` / `0,75rem`, `--cart-pad-x` `2rem`.
- `cart.css` est importé après `@import "tailwindcss"` dans `globals.css`.
- Aucune règle avec `!important` ; la spécificité des sélecteurs scoped suffit.
- Aucune modification de `original.css`, de structure, de comportement ou de la fiche produit.

## Review Focus

- Lien « Browse Products » à 12px dans le tiroir vide malgré le reset `span, button, a { font-size: 100% }` de `original.css` — couvert par une assertion Playwright sur le style calculé à 1440px et 375px.
- Même lien sur la page `/cart`, où le texte vit dans le `<Button>` lui-même — couvert par une assertion dédiée.
- Typo `BrowseProducts` — couvert par une assertion sur le texte exact.
- Valeurs du tiroir déjà validées (titre, CTA, flèche, padding) — couvert par les assertions existantes rejouées.
- Fiche produit inchangée malgré le partage de `.btn__icon` — couvert par l'assertion à 1440px.

---

### Task 1: Fichier de styles unique du panier

**Files:**
- Create: `apps/web/src/styles/cart.css`
- Modify: `apps/web/src/app/globals.css` (import après Tailwind)
- Modify: `apps/web/src/components/cart/CartDrawer.tsx`
- Modify: `apps/web/src/app/cart/page.tsx`
- Modify: `apps/web/src/app/checkout/page.tsx`
- Test: `apps/web/tests/test_cart_single_stylesheet.py`

**Interfaces:**
- Consumes: classes sémantiques déjà présentes (`cart-drawer`, `cart-drawer__header-title`, `cart-drawer-content`, `cart-drawer-emptystate`, `icon-global`, `btn__icon`, `btn__icon-arrow`) et le composant `Button` (`className` accepté).
- Produces: `.cart-ui` sur les trois racines ; classes de liaison `cart-page-title`, `cart-section-title`, `cart-empty-link`, `cart-page-cta` ; variables CSS listées dans les contraintes.

- [x] **Step 1: Écrire le test qui échoue**

Créer `apps/web/tests/test_cart_single_stylesheet.py` avec `unittest` + Playwright, serveur sur `http://localhost:3000`. Tests :
- `test_drawer_empty_link_is_12px_and_spelled_correctly` : à 1440px et 375px, ouvrir le tiroir vide, vérifier que `.cart-drawer` porte `cart-ui`, que le texte du span est exactement `Browse Products` et que son `font-size` calculé vaut 12px.
- `test_cart_page_empty_link_is_12px` : sur `/cart`, vérifier que la racine porte `cart-ui cart-page`, que le bouton porte `cart-empty-link` et que son `font-size` calculé vaut 12px.
- `test_checkout_title_uses_shared_variable` : ajouter un produit, naviguer vers `/checkout` par le lien du tiroir, vérifier que la racine porte `cart-ui checkout-page` et que `h1.cart-page-title` a 27px à 1440px et 26,25px à 375px.
- `test_drawer_existing_sizes_are_preserved` : reprendre les assertions de `apps/web/tests/test_cart_drawer_sizing.py` pour 1440px et 375px, plus le bouton de fiche produit à 1440px.

- [x] **Step 2: Vérifier que le test échoue**

Run : `python apps/web/tests/test_cart_single_stylesheet.py`
Expected : échec sur le texte/scope du lien du tiroir (48px mesurés, classe `cart-ui` absente) et sur les scopes des deux pages ; le test des tailles existantes passe encore.

- [x] **Step 3: Créer `cart.css` et l'importer**

Créer `apps/web/src/styles/cart.css` avec, dans cet ordre :
- le bloc `.cart-ui { … }` définissant les neuf variables ci-dessus (valeurs mobile) ;
- le bloc `@media (min-width: 768px) { .cart-ui { … } }` surchargeant uniquement `--cart-drawer-title`, `--cart-page-title`, `--cart-cta`, `--cart-cta-arrow`, `--cart-cta-pad-y` ;
- les règles scoped : `.cart-ui.cart-drawer .cart-drawer__header-title` (font-size), `.cart-ui.cart-drawer .cart-drawer-content` (padding gauche/droit), `.cart-ui.cart-drawer .cart-drawer-emptystate .icon-global span` (font-size), `.cart-ui.cart-drawer .cart-drawer__footer-checkout` (font-size et padding haut/bas), `.cart-ui.cart-drawer .cart-drawer__footer-checkout .btn__icon-arrow` (largeur/hauteur), `.cart-ui .cart-page-title`, `.cart-ui .cart-section-title`, `.cart-ui .cart-empty-link`, `.cart-ui .cart-page-cta`. Les h1/h2 de l'état vide ne portent pas ces classes et restent inchangés.

Dans `apps/web/src/app/globals.css`, ajouter `@import "../styles/cart.css";` après `@import "tailwindcss";` et avant toute autre règle (chemin relatif depuis `src/app/`). Aucune autre règle de `globals.css` n'est modifiée.

- [x] **Step 4: Brancher les trois composants**

- `CartDrawer.tsx` : ajouter `cart-ui` à la classe du `<div>` racine ; retirer `md:text-[1.6rem]!`, `md:px-8!`, `md:py-[0.75rem]!`, `md:text-[0.6rem]!`, `md:h-[2rem]!`, `md:w-[2rem]!` ; remplacer `BrowseProducts` par `Browse Products` et retirer `text-[1px]` du span.
- `cart/page.tsx` : ajouter `cart-ui cart-page` à la racine ; ajouter `cart-page-title` au `<h1>` et `cart-section-title` au `<h2>` ; remplacer `className="text-[1px] "` du `<Button>` par `className="cart-empty-link"` ; ajouter `cart-page-cta` au `<Button size="large">`.
- `checkout/page.tsx` : ajouter `cart-ui checkout-page` aux deux racines (état vide et formulaire) ; ajouter `cart-page-title` au `<h1>` principal et `cart-section-title` aux deux `<h2>` « Shipping Information » et « Order Summary » ; remplacer `text-[1px]` du lien vide par `cart-empty-link` ; ne pas toucher au bouton « Place Order » ni au `<h1>` de l'état vide.

- [x] **Step 5: Vérifier que le test passe**

Run : `python apps/web/tests/test_cart_single_stylesheet.py`
Expected : 4 tests passent.

- [x] **Step 6: Vérifier le build**

Run (depuis `apps/web`) : `npm run build`
Expected : build terminé sans erreur TypeScript ni CSS.

- [x] **Step 7: Commit**

Pas de dépôt Git : ne pas initialiser Git. Laisser les fichiers modifiés en place.
