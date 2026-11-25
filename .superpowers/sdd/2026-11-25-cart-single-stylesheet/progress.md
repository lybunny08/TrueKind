# SDD ledger — plan: docs/superpowers/plans/2026-11-25-cart-single-stylesheet.md

Pre-flight: no shared interfaces (one task).
Task 1: Ruling: le contrôle initial disait à tort qu'il n'y avait pas de dépôt Git ; le dépôt est présent sur `main` → `origin/main` — coût : aucun pour le code, mais le ledger a dû être corrigé avant le push.
Task 1: Step 1/2 RED observé : `python apps/web/tests/test_cart_single_stylesheet.py` → 4 cas en échec (scope `cart-ui` absent, lien tiroir 48px, `h1.cart-page-title` absent, scope drawer absent) — coût : aucun, c'est l'état attendu.
Task 1: Ruling: le plan donnait `@import "./styles/cart.css"` depuis `src/app/globals.css`, ce qui pointerait vers `src/app/styles/` ; le fichier est créé dans `src/styles/`, donc l'import réel est `../styles/cart.css` — coût : build cassé si le chemin du plan était suivi à la lettre.
Task 1: Ruling: le plan parlait de `text-sm` sur le lien vide de `/checkout`, mais la source porte `text-[1px]` ; la classe remplacée est celle de la source — coût : aucun.
Task 1: Ruling: `/checkout` a deux racines (état vide et formulaire) ; `cart-ui checkout-page` est ajouté aux deux pour que le lien vide soit bien dans le scope — coût : léger doublon de classe, sans effet de style hors règles dédiées.
Task 1: Ruling: les variables reprennent les valeurs intentionnelles des classes Tailwind (ex. `text-lg` = 1,125rem) ; elles deviennent réellement calculées là où le reset non-layeré de `original.css` les neutralisait — coût : titres et CTA des pages `/cart` et `/checkout` passent de 12px calculés à leur taille de classe, ce qui est l'objectif de la normalisation.
Task 1: complete (commit ajouté ensuite sur `ui/cart` ; tests: `python apps/web/tests/test_cart_single_stylesheet.py` → 4/4 OK, `python apps/web/tests/test_cart_drawer_sizing.py` → 3/3 OK ; build `npm run build` → OK ; CSS compilé : `--cart-link:12px` après `font-size:100%` dans le chunk produit)
Final review: sous-agent reviewer indépendant, revue directe des fichiers (branche créée après la revue).
Final: reviewer → 0 Critical, 0 Important, 3 Minor, Ready to merge: Yes.
Final: minor (deferred): les assertions desktop de `test_cart_single_stylesheet.py` sont une-sided (`assertLessEqual`) ; une valeur à 1px passerait.
Final: minor (deferred): pas d'assertion calculée pour `cart-section-title`, `cart-page-cta`, le lien `/cart` à 375px ni le lien vide checkout ; le passage 12px → 13,5px du gros CTA reste non verrouillé.
Final: minor (deferred): `text-[2.5rem]` et `text-[4rem] max-md:text-[3.8rem]` restent dans `CartDrawer.tsx` comme doublons inertes, ce qui affaiblit l'unicité de la source.
Final: Ruling: h1 de l'état vide checkout reste à ~12px — le plan dit explicitement de ne pas y toucher et le spec interdit la refonte — coût : ce titre reste plus petit que les autres titres de page.
Final: Ruling: racine de l'état vide checkout reste sans `bg-white` — différence préexistante hors plan — coût : fond inchangé sur cet état.
Final: Ruling: frontière 768px du CSS contre 767,99px dans `original.css` — le plan et l'ancien `md:` utilisaient 768px — coût : bande fractionnaire inchangée.
Final: Ruling: géométrie et transition du tiroir — non-goal explicite — coût : tiroir toujours à 400px avec la même animation.
Final: Ruling: règles globales dupliquées dans `globals.css` — dette de cascade préexistante hors périmètre — coût : cascade inchangée ailleurs.
Final: Ruling: classes arbitraires non liées aux neuf tokens (`text-[1rem]`, `text-[0.9rem]`, `text-[1.4rem]`, `h-[75%]`, `mb-[5vh]`) — le plan ne mandate que `text-[1px]` et les six `md:!` — coût : ces valeurs restent dispersées.
Final: Ruling: padding et line-height du `Button size="large"` — le plan ne modifie que `font-size` — coût : ces propriétés restent telles quelles.
Final: Ruling: dépôt Git présent sur `main` ; la branche `ui/cart` est créée et poussée à la demande — coût : intégration à gérer via la branche/PR.
Final: Ruling: harness Playwright (port 3000, attentes de 1000ms) — hérité de la suite existante et imposé par le plan — coût : suite non autonome, serveur requis.
Final: Ruling: `/checkout/success` non scoppé `.cart-ui` — hors des trois écrans définis — coût : son style reste inchangé.
Final: Ruling: commentaires et documents en français — choix de style, aucun effet sur le comportement — coût : aucun.
Final: Ruling: workspace conservé et commité avec le ledger — coût : fichiers de scratch versionnés.
Push: Ruling: `node_modules/web` est un junction de workspace npm déjà versionné ; les quatre chemins miroir sont stagés avec les fichiers `apps/web` pour garder l'arbre cohérent, sans restructurer le dépôt — coût : le commit contient des doublons hérités du premier commit.
