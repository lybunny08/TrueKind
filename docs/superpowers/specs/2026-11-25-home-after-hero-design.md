# Home — section sous le hero (approuvé 2026-11-25)

## Intent
Corriger l’apparence de la section située juste sous le hero sur la page d’accueil pour correspondre au visuel fourni : titre « CLEAN, CONCISE, CONSCIOUS skincare. », tagline, blob pêche avec visage, feuille, zeste d’agrume et quatre cartes positionnées autour.

## Current state
La section est `BrandCommitments` (`src/components/sections/BrandCommitments.tsx`), rendue juste après `<Hero />` dans `src/app/page.tsx`, avec l’id `#ingredients`. Elle affiche aujourd’hui « Clean, Conscious, Performance skincare. », quatre cartes en deux rangées autour de `ingredients-clip.jpg` masqué en elliptique. Les styles actuels vivent dans `original.css` sous `#ingredients .ingredients__…`.

## Goals
- Remplacer le markup de `BrandCommitments` par celui fourni, adapté au projet.
- Conserver le nom d’export `BrandCommitments`, l’id `#ingredients` et l’animation `useScrollReveal` sur les cartes.
- Mettre **tous** les nouveaux styles dans `src/app/globals.css`, sous un bloc dédié `.cc…`. Aucun fichier `concise.css`, aucun `@import` complémentaire.
- Utiliser `/ingredients-clip.jpg` comme visage dans le blob (choix de l’utilisateur).
- Styles calculés identiques à ceux fournis pour la scène, les cartes et les décorations, aux largeurs 1440px et 375px.

## Non-goals
- Aucune modification de `page.tsx`, du hero ou des autres sections.
- Aucune modification de `original.css` ni des règles `#ingredients` existantes (elles deviennent inertes).
- Aucun nouvel asset, aucune génération d’image, aucune dépendance.
- Aucun changement de comportement hors animation existante conservée.

## Constraints
- Next.js 16.4.6 / Tailwind CSS 4.3.3.
- `globals.css` importe déjà `original.css`, `tailwindcss` et `cart.css` en tête de fichier ; le bloc ajouté va à la fin.
- Le projet utilise un `rem` racine proportionnel à la largeur (`original.css`) : ne pas convertir les valeurs en pixels, sauf `--cart-link` déjà défini ailleurs.
- Les règles globales `body section` et `body #ingredients` avec `!important` restent telles quelles.

## Approaches
1. Réécrire `BrandCommitments.tsx` + bloc `.cc…` dans `globals.css` — **choisi** : un seul composant, une seule source de styles, aucune structure intermédiaire.
2. Nouveau composant `Concise.tsx` + changement d’import dans `page.tsx` — écarté : fichier supplémentaire et risque de double source.
3. Surcharger uniquement les classes `.ingredients__…` existantes — écarté : impossible d’obtenir le blob, la feuille et le zeste sans changer le markup.

## Decisions (builder calls)
- Polices : conserver les polices auto-hébergées du projet (`PP Mori` pour le sans, `Editorial New` italique pour le serif) au lieu d’ajouter l’`@import` Google `Inter Tight` / `Playfair Display` fourni. Le rendu sera proche mais pas typographiquement identique ; dis-le si tu veux l’import Google exact.
- Image : `<Image>` de `next/image` avec `width`/`height` explicites, surchargés en CSS, au lieu d’un `<img>` nu — évite l’avertissement ESLint et garde le contrôle CSS des dimensions.
- Décors : SVG inline conservés tels quels (arc, feuille, zeste, icônes des cartes), avec `aria-hidden`.
- Ratio : `.cc__stage` garde `container-type: inline-size` et `aspect-ratio: 357 / 406` ; les positions restent en pourcentages et les tailles en `cqw`.

## Verification
- Playwright : styles calculés de `.cc__title`, `.cc__serif`, `.cc__tag`, `.cc__blob`, `.cc__face`, `.cc__card` à 1440px et 375px ; présence du texte exact.
- `npm run build` dans `apps/web`.

## Revision (correction utilisateur, 2026-11-25)
- Finalement, **seul le haut de la section change** : le nouveau titre « CLEAN, CONCISE, CONSCIOUS » + `skincare.` en serif et la tagline, avec la flèche d’origine conservée.
- Tout le reste (quatre cartes, image elliptique, feuille, empress, deux rangées) revient exactement à la version précédente.
- Le bloc CSS `.cc…` est réduit au haut : `.cc__top` (largeur `min(100%, 820px)`, `container-type: inline-size`), `.cc__title`, `.cc__serif`, `.cc__tag`. Le blob, le visage, le zeste et les cartes positionnées sont supprimés.
- Polices : `PP Mori` + `Editorial New` conservées (choix utilisateur), sans import Google. Casse : titre en majuscules, `skincare.` en minuscules.
- `.cc__tag` surcharge `max-width: 34%` et `margin-left: 0` pour battre `.maxwidth` et la règle mobile de `original.css`.
- Vérification finale : `.cc__top`, titre, serif, tagline, flèche, cartes/images d’origine, absence de la nouvelle scène, et régression fiche produit, à 1440px et 375px.
