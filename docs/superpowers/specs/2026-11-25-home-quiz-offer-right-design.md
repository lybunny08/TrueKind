# Home — offre « Exciting offers awaits » sur la droite (approuvé ?)

## Intent
Dans la section juste au-dessus de `#journal` (`#quiz` / `PromotionalSection`), déplacer le texte « Exciting offers awaits », sa description « Shop now to get a chance to win 2 extra products. Grab the offer before it ends. » et le bouton `Shop Now` vers `/products` sur le côté droit, par-dessus la photo, parce qu’ils sont censés s’y trouver.

## Current state
`PromotionalSection.tsx` contient deux frères indépendants dans `.half__grid-content` :
- `.offer__text` en absolu à `left:4.375rem; top:5rem` (x≈52px à 1440px) ;
- `.offer__cta` en absolu à `right:5rem; top:9.75rem` (x≈600px).
La colonne de gauche occupe 0–720px et l’image `offer.jpg` occupe 720–1440px. Le CTA est donc déjà à droite de la colonne texte, mais pas sur la photo.

## Goals
- Regrouper `.offer__text`, sa description et `.offer__cta` dans un seul wrapper `.offer__copy`.
- Positionner ce wrapper sur la moitié droite de la section, par-dessus `offer.jpg`, sur desktop.
- Garder le texte, la description et le lien `/products` exactement tels quels.
- Mettre tous les nouveaux styles dans `apps/web/src/app/globals.css`, sous le scope `#quiz`.

## Non-goals
- Aucun changement de texte, d’URL, d’image, d’animation de scroll ou de parallaxe.
- Aucun changement de la mise en page mobile (le texte et le CTA gardent leurs positions absolues actuelles).
- Aucune modification de `original.css` ni des autres sections.

## Constraints
- Next.js 16.4.6 / Tailwind 4 ; `.half__grid-content` est `position:relative` et `overflow:visible` dans `#quiz`, donc un enfant absolu peut déborder sur l’image.
- Les règles historiques `#quiz .offer__text` et `#quiz .offer__cta` sont dans `original.css` ; les surcharges dans `globals.css` doivent être scopeées et chargées après.

## Approaches
1. **Grouper dans `.offer__copy` + position desktop sur la photo** — retenu : un seul div contient texte et bouton, comme demandé ; le mobile reste inchangé car les règles ne s’appliquent qu’à `min-width:768px`.
2. Déplacer les deux blocs existants avec seulement des changements de `left/right/top` — écarté : le texte et le CTA resteraient deux éléments indépendants et pourraient se désynchroniser.
3. Déplacer les blocs dans le DOM de `.half__grid-img` — écarté : changerait le conteneur de référence et risquerait de casser le parallaxe de l’image.

## Decisions (builder calls)
- Desktop : `.offer__copy` en absolu, `left: calc(100% + 4.375rem)`, `top: 5rem`, `width: min(34rem, 70%)`, `z-index: 4`, `display:flex; flex-direction:column; align-items:flex-start`.
- Dans ce wrapper, `.offer__text` et `.offer__cta` repassent en `position:static` sur desktop ; le CTA prend `margin-top:1.5rem`.
- Mobile : aucune règle `.offer__copy` ; les règles historiques de `original.css` continuent de positionner les deux enfant en absolu.

## Verification
- Playwright à 1440px : `.offer__copy` et ses deux enfants ont un `x >= 720` (moitié droite) ; le lien `a.offer__more` a `href="/products"` ; les textes sont présents.
- Playwright à 375px : positions du texte et du CTA identiques à l’état initial (≈22px et ≈285px) ; lien toujours `/products`.
- `npm run build` dans `apps/web`.

## Revision (correction utilisateur, 2026-11-25)
- Sur les écrans larges (`min-width: 1200px`), le bouton `Shop Now` doit être beaucoup plus près du bord droit, pas seulement sous le texte.
- Le wrapper `.offer__copy` garde sa position à gauche de la photo ; sa largeur passe à `calc(100% - 6.25rem)` et le CTA passe en `align-self: flex-end`.
- Résultat mesuré : bord droit du CTA à `1417.5px` sur 1440px et `1575px` sur 1600px (≈ 23–25px du bord).
- Le texte reste à gauche du wrapper ; le mobile et les tailles intermédiaires (< 1200px) gardent le comportement précédent.
- Vérification étendue : nouveau test `ctaRight >= gridWidth - 120` à 1440px et 1600px, en plus des assertions initiales.
