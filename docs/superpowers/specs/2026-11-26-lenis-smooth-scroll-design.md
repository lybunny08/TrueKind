# Design — Lenis smooth scroll

## Intent

Rendre le défilement plus fluide sur toute l’application sans casser les animations GSAP/ScrollTrigger déjà présentes, ni la navigation, ni l’accessibilité.

## Goals

- Activer Lenis sur les routes storefront et app via un seul provider global.
- Synchroniser Lenis avec `gsap.ticker` pour éviter un décalage d’une frame avec ScrollTrigger.
- Réinitialiser le scroll en haut à chaque changement de route.
- Laisser le scroll natif dans la liste du tiroir panier (`data-lenis-prevent`) et arrêter Lenis tant que le tiroir est ouvert.
- Respecter `prefers-reduced-motion`.

## Non-goals

- Changer le rendu visuel, les URLs ou la structure `Header → main → Footer`.
- Réécrire les animations GSAP existantes.
- Ajouter un paramètre utilisateur pour désactiver le smooth scroll.

## Constraints

- Next.js 16.4.6 / React 19 : le provider doit être un Client Component.
- Le projet importe déjà `lenis` nulle part ; la version cible est `1.3.x`.
- Le serveur de dev doit être redémarré après installation d’une dépendance.
- Les tests Playwright Python existants supposent un scroll natif utilisable.

## Approaches

1. **`ReactLenis` + ticker GSAP (retenu)** — `autoRaf: false`, `gsap.ticker` appelle `lenis.raf()`, `ScrollTrigger.update()` sur scroll. Cohérent avec l’animation existante, un seul RAF.
2. **`ReactLenis` avec son propre RAF** — plus simple mais deux boucles d’animation et risque de jitter avec ScrollTrigger.
3. **`new Lenis()` manuel** — plus de code de lifecycle, pas de hook `useLenis` intégré. Écarté.

L’utilisateur a demandé d’avancer sans nouvelle validation ; l’approche 1 est donc retenue.

## How it will be built

- Installer `lenis` dans `apps/web`.
- Créer `src/components/layout/SmoothScroll.tsx` (`"use client"`) avec `ReactLenis`, `useLenis`, `usePathname`, `gsap` et `ScrollTrigger`.
- Importer `lenis/dist/lenis.css` depuis le composant global.
- Monter `SmoothScroll` dans `AppShell` autour de `children`.
- Ajouter `data-lenis-prevent` à `.cart-drawer__list` et synchroniser l’état ouvert du panier avec `lenis.stop()` / `lenis.start()` via le contexte partagé.
- Tester en Playwright : scroll animé, `reduced-motion`, zone de scroll exclue.

## What is left to the builder

- Vérifier les API exactes de `lenis/react` dans le paquet installé.
- Garder le provider hors des composants qui ont besoin d’un DOM déjà hydraté.
- Rerun la suite Playwright complète, lint et build.
