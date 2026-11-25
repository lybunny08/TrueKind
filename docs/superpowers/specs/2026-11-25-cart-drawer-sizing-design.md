# Cart drawer sizing — design (approved 2026-11-25)

## Intent
Resserrer l'apparence du tiroir panier sur desktop : texte du bouton plus petit, padding horizontal réduit, titre « Your Cart » plus petit.

## Goals
- Desktop (≥ 768px) : titre `2,5rem → 1,6rem`, padding horizontal `4rem → 2rem`, texte du CTA `0,8rem → 0,6rem`.
- Proportion du CTA conservée : flèche `3rem → 2rem`, padding vertical `1,5rem → 0,75rem` (décision de l'implémenteur, approuvée).
- Mobile strictement inchangé : le titre reste à `2,380952381rem` (valeur d'origine de `original.css`, ≈33,33px à 375px), pas à `2,5rem`.

## Non-goals
- Aucune refonte de structure, aucun changement de comportement.
- Aucun correctif d'accessibilité, de scroll ou d'animation.
- La page `/cart` n'est pas modifiée.

## Constraints
- `.btn__icon` est partagé avec `ProductDetail.tsx` : toutes les surcharges doivent rester sur les éléments du tiroir.
- Next.js 16.4.6 / React 19.3 / Tailwind CSS 4.3.3. Utiliser des classes Tailwind `md:`, pas de CSS global supplémentaire.
- Le `rem` racine est `0.833333vw` sur desktop et `3.73333vw` sur mobile (`original.css`) : ne pas convertir les valeurs en pixels.
- `original.css` est importé en CSS non-layeré avant Tailwind (utilitaires en couche) : il bat les utilitaires à spécificité égale. Chaque surcharge desktop doit donc utiliser le modificateur `!` en fin d'utilitaire.

## Approaches
1. Surcharges ciblées dans `globals.css` — écarté au profit de 2.
2. Classes Tailwind `md:` directement dans `CartDrawer.tsx` — **choisi** : style au plus près du markup, aucun fichier CSS partagé touché.
3. Réécriture complète du tiroir — écarté : disproportionné.

## Verification
- Test Playwright des styles calculés à 1440px et 375px, plus de la fiche produit à 1440px.
- `npm run build` dans `apps/web`.
- Contrôle visuel desktop/mobile du tiroir et absence d'effet de bord sur `ProductDetail`.
