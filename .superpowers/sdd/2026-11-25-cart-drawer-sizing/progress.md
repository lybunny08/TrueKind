# SDD ledger — plan: docs/superpowers/plans/2026-11-25-cart-drawer-sizing.md

Pre-flight: no shared interfaces (one task).

Task 1: Ruling: le test statique du plan vérifiait du texte source, pas un comportement — remplacé par un test Playwright qui lit les styles calculés dans le navigateur à 1440px et 375px, avec un serveur de dev déjà en écoute sur le port 3000 — coût : il faut que le serveur de dev soit disponible pour rejouer le test ; le build reste la vérification hors navigateur.
Task 1: Ruling: le répertoire n'est pas un dépôt Git — pas de worktree, pas de commit, ledger écrit directement dans `.superpowers/sdd/2026-11-25-cart-drawer-sizing/` — coût : pas d'historique Git pour les fichiers modifiés.
Task 1: Ruling: `original.css` est non-layeré et bat les utilitaires Tailwind en couche à spécificité égale — les six surcharges desktop portent donc le `!` final — coût : sans lui, les anciennes valeurs reviennent silencieusement.
Task 1: complete (pas de commits ; tests: `python apps/web/tests/test_cart_drawer_sizing.py` → 3/3 OK ; build `npm run build` → OK)
Final review: sous-agent reviewer indépendant, revue directe des fichiers (pas de plage Git disponible).
Final: fixed documentation incohérente — plan et spec alignés sur le `!` requis et sur la valeur mobile réelle `2,380952381rem` ; aucun changement de code.
Final: minor (deferred): pas de cas de test à exactement 768px — le cas 1440px exerce la même branche `md:`, risque résiduel faible.
Final: minor (deferred): les seuils du test (≤20, ≤25, ≤8, tolérance 0,5) sont des littéraux non dérivés du `rem` racine — corrects pour les viewports fixés.
Final: minor (deferred): pas de script `test:sizing` dans `package.json` — commande documentée dans le plan uniquement.
Final: minor (deferred): le test mobile ne vérifie que `paddingLeft`, `paddingTop` et la largeur de flèche — `px`/`py`/`w`/`h` étant symétriques.
Final: Ruling: état vide du panier — hors des trois réglages demandés — coût : l'état vide garde sa typographie actuelle.
Final: Ruling: largeur du tiroir et transition de glissement — le spec vise le padding, pas la géométrie — coût : le tiroir reste à 400px.
Final: Ruling: tailles du sous-total et de la note de livraison — non demandées — coût : ces textes gardent leur taille actuelle.
Final: Ruling: contrôles de quantité et de suppression — hors périmètre CTA/titre/padding — coût : ces contrôles restent inchangés.
Final: Ruling: animation GSAP et visibilité du tiroir — non-goal explicite — coût : comportement d'ouverture inchangé.
Final: Ruling: hauteur et scroll de `.cart-drawer__list` — non-goal explicite — coût : scroll inchangé.
Final: Ruling: accessibilité des boutons de fermeture et d'ajout rapide — non-goal explicite — coût : accessibilité inchangée.
Final: Ruling: page `/cart` — non-goal explicite — coût : cette page garde son style actuel.
Final: Ruling: pilier panier du header — hors périmètre — coût : taille inchangée.
Final: Ruling: intervalle 767,98–768px où `original.css` applique le desktop mais pas `md:` — désaccord de breakpoint préexistant — coût : comportement inchangé dans cette bande d'un pixel.
Final: Ruling: lisibilité de `0,6rem`/`1,6rem` à 768px avec `rem` proportionnel à la largeur — valeurs imposées par le spec — coût : texte très petit sur les écrans étroits.
Final: Ruling: absence de commit/worktree — pas de dépôt Git — coût : intégration manuelle à la charge de l'utilisateur.
Final: Ruling: remplacement du test statique prévu par un test Playwright — décision de méthode, déjà consignée — coût : le test exige un serveur sur le port 3000.
Final: Ruling: workspace conservé — il contient les captures et le seul ledger existant (pas de Git) — coût : dossiers `.superpowers/` et `tests/` laissés en place.
