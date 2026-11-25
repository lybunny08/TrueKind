# Cart — fichier de styles unique (approuvé 2026-11-25)

## Intent
Regrouper dans un seul fichier les tailles et espacements des trois écrans du panier (`CartDrawer`, `/cart`, `/checkout`) afin qu'une modification se fasse en un seul endroit, et corriger le lien « Browse Products » à 12px.

## Root cause
`original.css` contient une règle non-layerée `span, button, a … { font-size: 100% }`. Les utilitaires Tailwind vivent dans une couche ; une règle non-layerée gagne à spécificité égale. Les classes `text-[…]` des composants sont donc ignorées (mesuré : 48px dans le tiroir, 12px sur `/cart` malgré `text-[1px]`). Le `!` utilisé précédemment contournait le problème sans le supprimer.

## Goals
- Un seul fichier `apps/web/src/styles/cart.css`, importé dans `globals.css` après Tailwind.
- Classe `.cart-ui` sur les racines des trois écrans.
- Variables en tête de fichier : `--cart-drawer-title` (2,380952381rem mobile / 1,6rem desktop), `--cart-page-title` (1,875rem / 2,25rem), `--cart-summary-title` (1,25rem), `--cart-page-cta` (1,125rem), `--cart-link` (12px), `--cart-cta` (0,8rem / 0,6rem), `--cart-cta-arrow` (3rem / 2rem), `--cart-cta-pad-y` (1,5rem / 0,75rem), `--cart-pad-x` (2rem).
- Règles scoped `.cart-ui …` assez spécifiques pour battre `original.css` sans `!`.
- « Browse Products » à 12px sur les trois écrans, avec l'espace corrigé (`BrowseProducts` → `Browse Products`).
- Retrait des classes arbitraires de taille dans les trois composants.

## Non-goals
- Aucune refonte visuelle : toutes les autres valeurs restent identiques.
- Aucune modification de `original.css`, ni de la structure des composants.
- Aucun changement de comportement, d'animation, d'accessibilité ou de scroll.

## Constraints
- Next.js 16.4.6 / Tailwind CSS 4.3.3.
- `original.css` non-layeré est importé avant Tailwind ; `cart.css` est importé après Tailwind dans `globals.css`.
- Le `rem` racine est `0.833333vw` sur desktop et `3.73333vw` sur mobile.
- `.btn__icon` est partagé avec `ProductDetail.tsx` : les règles restent sous `.cart-ui`.

## Approaches
1. `cart.css` unique + scope `.cart-ui` — **choisi**.
2. Fichier de tokens TypeScript exportant des classes Tailwind — écarté : cascade toujours fragile.
3. Composant `CartLayout` partagé — écarté : trop lourd pour un réglage de typographie.

## Verification
- Playwright : styles calculés des trois écrans en 1440px et 375px, plus fiche produit à 1440px.
- `npm run build` dans `apps/web`.
