# Cart Drawer Sizing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réduire sur desktop la taille du titre, du texte du CTA et du padding horizontal du tiroir panier, sans changer le mobile ni les fiches produit.

**Architecture:** Une seule task, un seul fichier de production modifié : `apps/web/src/components/cart/CartDrawer.tsx`. Les surcharges sont des classes utilitaires Tailwind `md:` portées par les éléments du tiroir, avec le modificateur `!` nécessaire face au CSS non-layeré `original.css`. Un test Playwright mesure les styles calculés dans le navigateur, avant et après le changement.

**Tech Stack:** Next.js 16.4.6, React 19.3, Tailwind CSS 4.3.3, Playwright Python (déjà disponible dans l'environnement, aucune dépendance ajoutée).

**Spec:** `docs/superpowers/specs/2026-11-25-cart-drawer-sizing-design.md`

## Global Constraints

- Desktop = `@media (min-width: 768px)` (breakpoint Tailwind `md`).
- Valeurs exactes : titre `1,6rem`, padding horizontal `2rem`, texte CTA `0,6rem`, boîte de flèche `2rem`, padding vertical CTA `0,75rem`.
- Mobile strictement inchangé : titre `2,380952381rem` (≈33,33px à 375px), padding `2rem`, texte CTA `0,8rem`, boîte de flèche `3rem`, padding vertical CTA `1,5rem`.
- Aucune règle CSS globale ajoutée ; aucun fichier CSS modifié.
- `globals.css` importe `original.css` en CSS non-layeré avant Tailwind (utilitaires en couche) : `original.css` l'emporte à spécificité égale. Utiliser le modificateur `!` en fin d'utilitaire sur chaque surcharge desktop.

## Review Focus

- Desktop à exactement 768px : les classes `md:` doivent être actives — couvert indirectement par le cas 1440px (même branche de media query) ; le cas limite exact est reporté, voir ledger.
- Mobile sous 768px : le titre doit rester à `2,380952381rem` — couvert par l'assertion Playwright à 375px (≈33,33px).
- `.btn__icon` dans `ProductDetail.tsx` : aucune classe ajoutée sur ce fichier — couvert par l'assertion de style calculé sur la fiche produit (9,6px à 1440px).
- Cascade avec `original.css` : `.btn__icon` impose `font-size:.8rem`, `padding:1.5rem .5rem` et `.btn__icon-arrow` impose `3rem` — couvert par les assertions Playwright sur les styles calculés du tiroir.
- Orientation du padding : retirer `md:p-[2rem_4rem]` (4rem horizontal) — couvert par l'assertion Playwright à 1440px (≤25px).

---

### Task 1: Sizing desktop du tiroir panier

**Files:**
- Modify: `apps/web/src/components/cart/CartDrawer.tsx:41-45` (conteneur + titre)
- Modify: `apps/web/src/components/cart/CartDrawer.tsx:92-95` (CTA + flèche)
- Test: `apps/web/tests/test_cart_drawer_sizing.py`

**Interfaces:**
- Consumes: `useCart()` depuis `@/contexts/cart` ; classes sémantiques `cart-drawer-content`, `cart-drawer__header-title`, `btn__icon`, `btn__icon-arrow` définies dans `src/app/original.css`.
- Produces: aucun nouveau symbole. Le rendu du tiroir garde les mêmes props, états et handlers.

- [ ] **Step 1: Écrire le test qui échoue**

Créer `apps/web/tests/test_cart_drawer_sizing.py` avec `unittest` et `playwright.sync_api`. Le serveur de dev doit répondre sur `http://localhost:3000`.

Trois tests :
- `test_desktop_sizes_are_reduced` : à 1440px, ouvrir le tiroir et lire `getComputedStyle` de `.cart-drawer__header-title`, `.cart-drawer-content`, `.cart-drawer__footer-checkout` et de sa flèche. Assertions : titre ≤ 20px, padding gauche/droit ≤ 25px, texte CTA ≤ 8px, padding haut/bas CTA ≤ 10px, flèche ≤ 25px en largeur et hauteur.
- `test_mobile_sizes_are_unchanged` : à 375px, mêmes sélecteurs ; titre ≈33,33px, padding gauche 28px, texte CTA 11,2px, padding haut 21px, flèche 42px.
- `test_product_detail_button_is_unchanged` : à 1440px sur une fiche produit, `button.btn__icon` ≈9,6px.

- [ ] **Step 2: Vérifier que le test échoue**

Run (depuis la racine) : `python apps/web/tests/test_cart_drawer_sizing.py`
Expected : seul `test_desktop_sizes_are_reduced` échoue, sur le titre à 30px ; les deux autres passent.

- [ ] **Step 3: Appliquer les classes Tailwind dans CartDrawer.tsx**

Dans `apps/web/src/components/cart/CartDrawer.tsx` :
- conteneur : remplacer `p-8 md:p-[2rem_4rem]` par `p-8 md:px-8!` ;
- titre : conserver `text-[2.5rem]` et ajouter `md:text-[1.6rem]!` ;
- CTA : ajouter `md:py-[0.75rem]! md:text-[0.6rem]!` à la liste de classes du `<Link>` ;
- flèche : ajouter `md:h-[2rem]! md:w-[2rem]!` au `<span className="btn__icon-arrow bg-white">`.

Le `!` est indispensable : sans lui, les règles non-layerées de `original.css` gagnent et aucune taille ne change. Aucune autre ligne du composant n'est modifiée. Aucune classe n'est ajoutée à `ProductDetail.tsx`.

- [ ] **Step 4: Vérifier que le test passe**

Run (depuis la racine) : `python apps/web/tests/test_cart_drawer_sizing.py`
Expected : 3 tests passent.

- [ ] **Step 5: Vérifier le build**

Run (depuis `apps/web`) : `npm run build`
Expected : build terminé sans erreur TypeScript ni ESLint bloquant.

- [ ] **Step 6: Contrôle visuel**

Capturer le tiroir à 1440px et 375px via Playwright, ainsi qu'une fiche produit. Les captures sont enregistrées dans `.superpowers/sdd/2026-11-25-cart-drawer-sizing/`. Le modèle en cours ne peut pas les afficher : la vérification repose donc sur les styles calculés du test.

- [ ] **Step 7: Commit**

Ce répertoire n'est pas un dépôt Git : ne pas initialiser Git. Laisser les fichiers modifiés en place.
