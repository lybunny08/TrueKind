# Design — Header/Footer uniquement sur la boutique publique

## Intention

Le `Header` (navbar, bouton panier) et le `Footer` sont aujourd’hui rendus globalement par `AppShell`, donc visibles sur toutes les routes. Ils doivent être réservés à la boutique publique. Les écrans d’authentification (`/login`, `/signup`) et le dashboard (`/account`) doivent s’afficher sans navbar ni footer.

## Pourquoi

Le projet distingue deux zones : une boutique publique avec navigation et pied de page, et des écrans d’application (auth + compte) qui doivent rester autonomes, sans chrome de boutique.

## Objectifs

- Garder `Header` + `Footer` sur `/`, `/products`, `/products/[slug]`, `/journal`, `/journal/[slug]`, `/philosophy`, `/gallery`, `/cart`, `/checkout`, `/checkout/success`.
- Ne rien rendre de `Header`/`Footer` sur `/login`, `/signup`, `/account`.
- Conserver les URL exactes.
- Conserver le DOM existant de la boutique (`Header`, `main`, `Footer`) pour ne pas casser le CSS global ni les tests Playwright qui utilisent `#cart-nav`.

## Non-objectifs

- Refondre visuellement le header ou le footer.
- Ajouter une navigation de remplacement dans le dashboard (il a déjà sa nav latérale).
- Supprimer `CartProvider` ou le preloader global.
- Toucher aux pages backend/API.

## Anti-objectifs

- Cacher le chrome avec une liste de chemins en dur dans un client component (risk de flash et d’oubli).
- Dupliquer le header/footer dans chaque page.

## Contraintes

- Next.js 16.4.6 / React 19.3.0, App Router avec `src/app`.
- La documentation installée (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route-groups.md`) confirme que les route groups `(folder)` n’affectent pas l’URL et permettent de compartimenter les layouts.
- Un seul root layout doit rester : utiliser des route groups imbriqués, pas plusieurs root layouts, afin d’éviter les rechargements complets entre groupes.
- `Header` utilise `usePathname()` pour détecter la home ; déplacer `page.tsx` dans un groupe ne change pas le pathname `/`.

## Approche retenue — route groups

1. `src/app/layout.tsx` reste le root layout unique : `<html>`, `<body>`, CSS global, métadonnées, `CartProvider` et `Preloader`. Il ne rend plus ni `Header`, ni `Footer`, ni `<main>`.
2. Nouveau `src/app/(storefront)/layout.tsx` : `Header`, `<main>{children}</main>`, `Footer`, `CartDrawer`.
3. Nouveau `src/app/(app)/layout.tsx` : `<main>{children}</main>` uniquement.
4. Déplacer sans renommage de contenu :
   - vers `(storefront)/` : `page.tsx`, `products/`, `journal/`, `philosophy/`, `gallery/`, `cart/`, `checkout/` ;
   - vers `(app)/` : `login/`, `signup/`, `account/`.
5. Aucune modification du CSS global n’est prévue : la structure `Header > main > Footer` reste identique sur la boutique.

## Approches écartées

- **Rendu conditionnel dans `AppShell` avec `usePathname()`** : plus petit diff, mais la liste de routes est codée en dur côté client, avec risque de flash et de maintenance manquée.
- **Inclusion par page** : duplication du wrapper sur chaque page et perte des layouts imbriqués.

## Ce que l’implémentation devra vérifier

- `npm run lint` et `npm run build` dans `apps/web`.
- Les pages auth/compte ne contiennent aucun `#header` ni `#footer`.
- La boutique contient toujours `#header`, `#footer` et `#cart-nav`.
- Ajouter si possible un test Python Playwright léger asserting ces présences/absences.
