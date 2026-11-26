# Storefront-Only Chrome Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render `Header` and `Footer` only on public storefront routes, leaving `/login`, `/signup` and `/account` without storefront chrome.

**Architecture:** Keep one root layout for global providers, then split routes into two App Router route groups: `(storefront)` with header/main/footer/cart drawer and `(app)` with main only. Route groups preserve every existing URL and the storefront DOM shape.

**Tech Stack:** Next.js 16.4.6, React 19.3.0, TypeScript, Tailwind CSS 4, Python Playwright tests.

**Spec:** `docs/superpowers/specs/2026-11-26-storefront-only-chrome-design.md`

## Global Constraints

- Next.js 16.4.6 / React 19.3.0, App Router with `src/app`.
- A single root layout must remain; use nested route groups `(storefront)` and `(app)`, not multiple root layouts.
- Route groups `(folder)` do not change URLs; every URL must stay identical.
- Storefront DOM must stay `Header` → `main` → `Footer` because global CSS selects `main > div > section:first-child` and `#footer`.
- `CartProvider` and `Preloader` stay global; `CartDrawer` stays on storefront only.
- Storefront must keep `#cart-nav` (existing Playwright cart tests click it).
- No visual changes to `Header` or `Footer`.
- Python Playwright tests assume a dev server at `http://localhost:3000`.

## Review Focus

- `/account` without a token redirects to `/login`; the absence test must seed `token` and `user` in `localStorage` first — Task 1, `test_account_has_no_storefront_chrome`.
- The storefront cart button `#cart-nav` must remain reachable — Task 1, `test_storefront_has_header_footer_cart_button`.
- Moving files into route groups must not change URLs — Task 1 storefront paths plus Task 4 build and existing Playwright runs.
- Global CSS depends on the `Header`/`main`/`Footer` DOM order — Task 1 count assertions plus Task 4 existing home/cart Playwright runs.
- `/cart` and `/checkout/success` belong to the storefront and must keep both components — Task 1 `STOREFRONT_PATHS`.

---

### Task 1: Add failing route-chrome test

**Files:**
- Create: `apps/web/tests/test_route_chrome.py`

**Interfaces:**
- Consumes: dev server on `http://localhost:3000`.
- Produces: `RouteChromeTest` with three `unittest` test methods used as the acceptance gate for Tasks 2–3.

- [ ] **Step 1: Write the failing test**

Create `apps/web/tests/test_route_chrome.py` with exactly this content:

```python
"""Vérifie que le chrome boutique est réservé aux pages publiques.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

STOREFRONT_PATHS = ["/", "/products", "/cart", "/checkout/success"]
APP_PATHS = ["/login", "/signup"]


class RouteChromeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def test_storefront_has_header_footer_cart_button(self):
        for path in STOREFRONT_PATHS:
            page = self.browser.new_page()
            try:
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                self.assertEqual(page.locator("#header").count(), 1, msg=f"header {path}")
                self.assertEqual(page.locator("#footer").count(), 1, msg=f"footer {path}")
                self.assertEqual(page.locator("#cart-nav").count(), 1, msg=f"cart-nav {path}")
            finally:
                page.close()

    def test_app_pages_have_no_storefront_chrome(self):
        for path in APP_PATHS:
            page = self.browser.new_page()
            try:
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                self.assertEqual(page.locator("#header").count(), 0, msg=f"header {path}")
                self.assertEqual(page.locator("#footer").count(), 0, msg=f"footer {path}")
            finally:
                page.close()

    def test_account_has_no_storefront_chrome(self):
        page = self.browser.new_page()
        try:
            page.add_init_script(
                "localStorage.setItem('token','test-token');"
                "localStorage.setItem('user', JSON.stringify({id:'1',email:'a@b.c',name:'Test',role:'user'}));"
            )
            page.goto(f"{BASE_URL}/account", wait_until="networkidle")
            page.wait_for_selector("text=My Account", state="visible")
            self.assertEqual(page.locator("#header").count(), 0, msg="header account")
            self.assertEqual(page.locator("#footer").count(), 0, msg="footer account")
        finally:
            page.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run the test to verify it fails**

Ensure the dev server is running (`npm run dev` in `apps/web`), then from the repo root run:

`python apps/web/tests/test_route_chrome.py -v`

Expected: FAIL on `test_app_pages_have_no_storefront_chrome` and `test_account_has_no_storefront_chrome` with `header /login` / `header /account` showing 1 instead of 0. `test_storefront_has_header_footer_cart_button` should already pass.

- [ ] **Step 3: Commit the failing test**

```bash
git add apps/web/tests/test_route_chrome.py
git commit -m "test: assert storefront-only header and footer"
```

### Task 2: Split global shell from route-group layouts

**Files:**
- Modify: `apps/web/src/components/layout/AppShell.tsx`
- Create: `apps/web/src/app/(storefront)/layout.tsx`
- Create: `apps/web/src/app/(app)/layout.tsx`

**Interfaces:**
- Consumes: existing `CartProvider`, `Preloader`, `Header`, `Footer`, `CartDrawer` exports.
- Produces: `StorefrontLayout` and `AppLayout` default exports; `AppShell` now renders only providers and preloader.

- [ ] **Step 1: Reduce `AppShell` to global providers**

Replace `apps/web/src/components/layout/AppShell.tsx` with:

```tsx
"use client";

import { useState } from "react";
import { CartProvider } from "@/contexts/cart";
import { Preloader } from "@/components/layout/Preloader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <CartProvider>
      {showPreloader && <Preloader onDone={() => setShowPreloader(false)} />}
      {children}
    </CartProvider>
  );
}
```

- [ ] **Step 2: Create the storefront layout**

Create `apps/web/src/app/(storefront)/layout.tsx` with:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
```

- [ ] **Step 3: Create the app layout**

Create `apps/web/src/app/(app)/layout.tsx` with:

```tsx
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
```

- [ ] **Step 4: Commit the layout split**

```bash
git add apps/web/src/components/layout/AppShell.tsx 'apps/web/src/app/(storefront)/layout.tsx' 'apps/web/src/app/(app)/layout.tsx'
git commit -m "refactor: split storefront and app layouts"
```

### Task 3: Move pages into the two route groups

**Files:**
- Move: `apps/web/src/app/page.tsx` → `apps/web/src/app/(storefront)/page.tsx`
- Move: `apps/web/src/app/products/` → `apps/web/src/app/(storefront)/products/`
- Move: `apps/web/src/app/journal/` → `apps/web/src/app/(storefront)/journal/`
- Move: `apps/web/src/app/philosophy/` → `apps/web/src/app/(storefront)/philosophy/`
- Move: `apps/web/src/app/gallery/` → `apps/web/src/app/(storefront)/gallery/`
- Move: `apps/web/src/app/cart/` → `apps/web/src/app/(storefront)/cart/`
- Move: `apps/web/src/app/checkout/` → `apps/web/src/app/(storefront)/checkout/`
- Move: `apps/web/src/app/login/` → `apps/web/src/app/(app)/login/`
- Move: `apps/web/src/app/signup/` → `apps/web/src/app/(app)/signup/`
- Move: `apps/web/src/app/account/` → `apps/web/src/app/(app)/account/`

**Interfaces:**
- Consumes: the two group layouts from Task 2.
- Produces: identical public URLs for every existing route.

- [ ] **Step 1: Create group directories and move pages**

From `apps/web`, run:

```powershell
New-Item -ItemType Directory -Force 'src/app/(storefront)', 'src/app/(app)' | Out-Null
git mv src/app/page.tsx 'src/app/(storefront)/page.tsx'
git mv src/app/products 'src/app/(storefront)/products'
git mv src/app/journal 'src/app/(storefront)/journal'
git mv src/app/philosophy 'src/app/(storefront)/philosophy'
git mv src/app/gallery 'src/app/(storefront)/gallery'
git mv src/app/cart 'src/app/(storefront)/cart'
git mv src/app/checkout 'src/app/(storefront)/checkout'
git mv src/app/login 'src/app/(app)/login'
git mv src/app/signup 'src/app/(app)/signup'
git mv src/app/account 'src/app/(app)/account'
```

- [ ] **Step 2: Confirm no page files remain at the old root**

Run from `apps/web`:

`Get-ChildItem src/app -File | Select-Object -ExpandProperty Name`

Expected: exactly `layout.tsx`, `globals.css` and `original.css`; `page.tsx` must no longer appear at `src/app/page.tsx`.

- [ ] **Step 3: Commit the page moves**

```bash
git add -A apps/web/src/app
git commit -m "refactor: group storefront and app routes"
```

### Task 4: Verify and finish

**Files:**
- Test: `apps/web/tests/test_route_chrome.py`
- Test: `apps/web/tests/test_home_after_hero.py`
- Test: `apps/web/tests/test_cart_single_stylesheet.py`
- Test: `apps/web/tests/test_cart_drawer_sizing.py`
- Doc: `docs/superpowers/specs/2026-11-26-storefront-only-chrome-design.md`
- Doc: `docs/superpowers/plans/2026-11-26-storefront-only-chrome.md`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: green acceptance test, green existing tests, green lint/build, committed docs and code.

- [ ] **Step 1: Run the acceptance test**

From repo root: `python apps/web/tests/test_route_chrome.py -v`

Expected: PASS for all three tests.

- [ ] **Step 2: Run existing Playwright tests**

From repo root, run each:

`python apps/web/tests/test_home_after_hero.py -v`

`python apps/web/tests/test_cart_single_stylesheet.py -v`

`python apps/web/tests/test_cart_drawer_sizing.py -v`

Expected: all PASS.

- [ ] **Step 3: Run lint and build**

From `apps/web`, run:

`npm run lint`

`npm run build`

Expected: both exit 0.

- [ ] **Step 4: Commit docs**

```bash
git add docs/superpowers/specs/2026-11-26-storefront-only-chrome-design.md docs/superpowers/plans/2026-11-26-storefront-only-chrome.md
git commit -m "docs: record storefront-only chrome design and plan"
```
