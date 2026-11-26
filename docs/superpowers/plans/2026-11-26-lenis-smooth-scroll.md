# Lenis Smooth Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activer un scroll fluide global avec Lenis, synchronisé avec GSAP et sans casser le panier ni l’accessibilité.

**Architecture:** Un seul Client Component `SmoothScroll` monte `ReactLenis` depuis le root layout via `AppShell`. Lenis utilise le ticker GSAP au lieu de son propre RAF, et s’arrête pendant l’ouverture du tiroir panier.

**Tech Stack:** Next.js 16.4.6, React 19.3.0, `lenis` 1.3.x, GSAP 3.15.1, Playwright Python.

**Spec:** `docs/superpowers/specs/2026-11-26-lenis-smooth-scroll-design.md`

## Global Constraints

- Next.js 16.4.6 / React 19.3.0 : tout code navigateur reste dans un Client Component.
- Conserver les URLs et la structure DOM `Header → main → Footer`.
- Ne pas remplacer les animations GSAP existantes ; un seul RAF via `gsap.ticker`.
- Respecter `prefers-reduced-motion`.
- Le serveur de dev doit être relancé après l’installation de `lenis`.

## Review Focus

- `prefers-reduced-motion: reduce` → le scroll doit rester natif, sans animation Lenis — test `test_reduced_motion_uses_native_scroll` (Task 1).
- Molette sur une page storefront → le scroll doit être animé, pas instantané — test `test_wheel_scroll_is_animated` (Task 1).
- Tiroir panier ouvert → sa liste doit garder son scroll natif — test `test_cart_list_is_excluded_from_smooth_scroll` (Task 3).
- Navigation entre routes → le scroll doit revenir en haut — vérification manuelle/build dans Task 4.
- ScrollTrigger existant → ne pas créer de jitter avec une seconde boucle RAF — `autoRaf: false` dans Task 2.

---

### Task 1: Failing acceptance tests

**Files:**
- Test: `apps/web/tests/test_lenis_smooth_scroll.py`

**Interfaces:**
- Produces: three Playwright tests pinning smooth wheel, reduced motion and cart-list scroll isolation.

- [ ] **Step 1: Write the failing tests**

Create `apps/web/tests/test_lenis_smooth_scroll.py` with `LenisSmoothScrollTest.test_wheel_scroll_is_animated`, `test_reduced_motion_uses_native_scroll`, and `test_cart_list_is_excluded_from_smooth_scroll` as specified in the Review Focus.

- [ ] **Step 2: Run test to verify it fails**

Run: `python apps/web/tests/test_lenis_smooth_scroll.py -v`
Expected: FAIL because `html` has no `lenis` class and `.cart-drawer__list` has no `data-lenis-prevent`.

- [ ] **Step 3: Commit**

```bash
git add apps/web/tests/test_lenis_smooth_scroll.py
git commit -m "test: assert lenis smooth scroll behavior"
```

### Task 2: Global Lenis provider

**Files:**
- Modify: `apps/web/package.json`, `apps/web/package-lock.json`
- Create: `apps/web/src/components/layout/SmoothScroll.tsx`
- Modify: `apps/web/src/components/layout/AppShell.tsx`

**Interfaces:**
- Consumes: `gsap`, `ScrollTrigger` from `@/lib/gsap`; `usePathname` from `next/navigation`; `ReactLenis`, `useLenis` from `lenis/react`.
- Produces: `SmoothScroll` default export; `AppShell` wraps `children` with it.

- [ ] **Step 1: Install Lenis**

Run from `apps/web`: `npm install lenis@^1.3.28`
Expected: package and lockfile updated.

- [ ] **Step 2: Read the installed `lenis/react` API**

Verify the exact `ReactLenis` props and `useLenis` callback signature from `apps/web/node_modules/lenis/react` before writing the component.

- [ ] **Step 3: Implement `SmoothScroll`**

Create `apps/web/src/components/layout/SmoothScroll.tsx`. It must be `"use client"`, import `lenis/dist/lenis.css`, configure `autoRaf: false`, drive `lenis.raf(time * 1000)` from `gsap.ticker`, call `ScrollTrigger.update()` on Lenis scroll, and call `lenis.scrollTo(0, { immediate: true })` when `pathname` changes.

- [ ] **Step 4: Mount the provider**

Wrap `children` in `AppShell` with `<SmoothScroll>` without changing the existing `CartProvider`/`Preloader` order.

- [ ] **Step 5: Restart the dev server**

Stop the current `next dev` process and start it again so the new dependency is resolved.

- [ ] **Step 6: Run the first two tests**

Run: `python apps/web/tests/test_lenis_smooth_scroll.py -v`
Expected: `test_wheel_scroll_is_animated` and `test_reduced_motion_uses_native_scroll` PASS; cart test may still FAIL.

- [ ] **Step 7: Commit**

```bash
git add apps/web/package.json apps/web/package-lock.json apps/web/src/components/layout/SmoothScroll.tsx apps/web/src/components/layout/AppShell.tsx
git commit -m "feat: add lenis smooth scroll provider"
```

### Task 3: Cart drawer scroll isolation

**Files:**
- Modify: `apps/web/src/components/cart/CartDrawer.tsx`
- Modify: `apps/web/src/components/layout/SmoothScroll.tsx`

**Interfaces:**
- Consumes: `isOpen` from `useCart`; `useLenis` from `lenis/react`.
- Produces: Lenis stops while the cart is open and restarts when it closes.

- [ ] **Step 1: Mark the scrollable cart list**

Add `data-lenis-prevent` to `.cart-drawer__list` in `CartDrawer.tsx`.

- [ ] **Step 2: Stop Lenis while the drawer is open**

In `SmoothScroll.tsx`, consume `isOpen` from `useCart()` and call `lenis.stop()` / `lenis.start()` in an effect keyed on `isOpen`.

- [ ] **Step 3: Run the Lenis suite**

Run: `python apps/web/tests/test_lenis_smooth_scroll.py -v`
Expected: all three tests PASS.

- [ ] **Step 4: Commit**

```bash
git add apps/web/src/components/cart/CartDrawer.tsx apps/web/src/components/layout/SmoothScroll.tsx
git commit -m "feat: keep cart drawer scroll native"
```

### Task 4: Verify and finish

**Files:**
- Doc: `docs/superpowers/specs/2026-11-26-lenis-smooth-scroll-design.md`
- Doc: `docs/superpowers/plans/2026-11-26-lenis-smooth-scroll.md`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: green full suite, green build, committed docs.

- [ ] **Step 1: Run every Playwright test**

Run each from repo root: `test_route_chrome.py`, `test_home_after_hero.py`, `test_cart_single_stylesheet.py`, `test_cart_drawer_sizing.py`, `test_lenis_smooth_scroll.py`.
Expected: all PASS.

- [ ] **Step 2: Run lint and build**

From `apps/web`: `npm run lint` then `npm run build`.
Expected: build PASS; report any pre-existing lint errors explicitly.

- [ ] **Step 3: Commit docs**

```bash
git add docs/superpowers/specs/2026-11-26-lenis-smooth-scroll-design.md docs/superpowers/plans/2026-11-26-lenis-smooth-scroll.md
git commit -m "docs: record lenis smooth scroll design and plan"
```
