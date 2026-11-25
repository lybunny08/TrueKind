# Home Quiz Offer On The Right Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Regrouper le texte « Exciting offers awaits » et le bouton `Shop Now` dans un seul bloc positionné sur la photo, à droite de la section `#quiz` de la home.

**Architecture:** Une seule tâche : modifier le markup de `PromotionalSection.tsx` pour introduire `.offer__copy`, puis ajouter un bloc scope `#quiz` en fin de `globals.css`. Le mobile reste régi par `original.css` : les nouvelles règles sont derrière `@media (min-width: 768px)`.

**Tech Stack:** Next.js 16.4.6, React 19.3, Tailwind CSS 4.3.3, Playwright Python.

**Spec:** `docs/superpowers/specs/2026-11-25-home-quiz-offer-right-design.md`

## Global Constraints

- Desktop = `min-width: 768px` ; mobile = dessous, inchangé.
- Tous les nouveaux styles vont dans `apps/web/src/app/globals.css`, ajoutés à la fin. Aucune modification de `original.css`.
- Le texte, la description, le `href="/products"` et les SVG existants restent exactement identiques.
- `.half__grid-content` dans `#quiz` est `position:relative` et `overflow:visible` : le wrapper peut déborder sur l’image de droite.
- Aucun changement d’animation, de parallaxe, d’accessibilité ou d’asset.
- Branche de travail : `ui/home` (déjà créée). Ne pas pusher sans demande explicite.

## Review Focus

- À 1440px, le bloc ne doit pas rester dans la colonne gauche : le wrapper et ses deux enfants doivent être dans la moitié droite — couvert par des assertions sur `x >= grid.width / 2`.
- Le bouton doit rester fonctionnel et pointer vers `/products` — couvert par une assertion sur `a.offer__more[href="/products"]`.
- Le texte et le CTA doivent être dans le **même** div — couvert par `copy.contains(text)` et `copy.contains(cta)`.
- À 375px, rien ne doit bouger : texte à x≈22px et CTA à x≈285px — couvert par des assertions avec delta 3.
- Le wrapper ne doit pas devenir absolu sur mobile — couvert par `position === "static"` à 375px.

---

### Task 1: Déplacer l’offre sur la photo

**Files:**
- Modify: `apps/web/src/components/sections/PromotionalSection.tsx`
- Modify: `apps/web/src/app/globals.css` (ajout en fin de fichier)
- Test: `apps/web/tests/test_home_quiz_offer_right.py`

**Interfaces:**
- Consumes: `Link` de `next/link`, `MediaImg` de `@/components/ui/MediaImg`, classes existantes `.half__grid`, `.offer__text`, `.offer__cta`, `.offer__more`.
- Produces: `.offer__copy` contenant `.offer__text` et `.offer__cta`. Aucun export ni signature modifié ; `PromotionalSection` reste exporté tel quel et `page.tsx` n’est pas touché.

- [x] **Step 1: Écrire le test qui échoue**

Créer `apps/web/tests/test_home_quiz_offer_right.py` avec `unittest` + Playwright, serveur sur `http://localhost:3000`. Après `page.goto(BASE_URL, wait_until="networkidle")`, évaluer un JS qui retourne, pour `#quiz` :
- `gridWidth` : largeur de `.half__grid` ;
- `copyExists`, `copyPosition`, `copyX`, `copyContainsText`, `copyContainsCta` ;
- `textX`, `ctaX`, `ctaHref`, `titleText`, `descriptionText`, `ctaText`.

Assertions :
- 1440px : `copyExists === true` ; `copyPosition === "absolute"` ; `copyX >= gridWidth / 2` ; `textX >= gridWidth / 2` ; `ctaX >= gridWidth / 2` ; `copyContainsText && copyContainsCta`.
- 1440px et 375px : `titleText` normalisé contient `Exciting offers awaits` ; `descriptionText` contient `Shop now to get a chance to win 2 extra products.` ; `ctaText === "Shop Now"` ; `ctaHref === "/products"`.
- 375px : `copyPosition === "static"` ; `textX` ≈ 22.4 (delta 3) ; `ctaX` ≈ 285.4 (delta 3).

- [x] **Step 2: Vérifier que le test échoue**

Run (depuis la racine) : `python apps/web/tests/test_home_quiz_offer_right.py`
Expected : échec sur l’absence de `.offer__copy` à 1440px.

- [x] **Step 3: Regrouper les deux blocs dans `.offer__copy`**

Dans `PromotionalSection.tsx`, remplacer les deux `<div className="offer__text">…</div>` et `<div className="offer__cta">…</div>` par :

```tsx
<div className="offer__copy">
  <div className="offer__text">… contenu inchangé …</div>
  <div className="offer__cta">… contenu inchangé …</div>
</div>
```

Conserver mot pour mot le `<h3>`, le `<p>` et le `<Link href="/products" className="offer__more">`.

- [x] **Step 4: Ajouter le CSS dans `globals.css`**

Ajouter à la fin de `apps/web/src/app/globals.css` :

```css
/* ===== HOME — OFFRE À DROITE DE LA SECTION QUIZ ===== */
@media (min-width: 768px) {
  #quiz .offer__copy {
    position: absolute;
    left: calc(100% + 4.375rem);
    top: 5rem;
    width: min(34rem, 70%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #quiz .half__grid .offer__text,
  #quiz .half__grid .offer__cta {
    position: static;
    left: auto;
    right: auto;
    top: auto;
  }
  #quiz .half__grid .offer__cta {
    margin-top: 1.5rem;
  }
}
```

Ne pas ajouter de règles pour mobile : `original.css` continue de positionner `.offer__text` et `.offer__cta` en absolu sous 768px.

- [x] **Step 5: Vérifier que le test passe**

Run : `python apps/web/tests/test_home_quiz_offer_right.py`
Expected : tous les tests passent.

- [x] **Step 6: Vérifier le build et les régressions**

Run (depuis `apps/web`) : `npm run build`
Run (depuis la racine) : `python apps/web/tests/test_home_after_hero.py` et `python apps/web/tests/test_cart_single_stylesheet.py`
Expected : build OK et suites vertes.

- [x] **Step 7: Commit**

Sur `ui/home`, committer avec `style(home): move quiz offer copy to the right`. Ne pas pusher.

## Revision (correction utilisateur, 2026-11-25)

Pendant l’exécution, l’utilisateur a précisé que sur les grands écrans le bouton doit être beaucoup plus proche de l’extrémité droite. Une règle `@media (min-width: 1200px)` a été ajoutée : `.offer__copy { width: calc(100% - 6.25rem) }` et `.offer__cta { align-self: flex-end }`. Le test `apps/web/tests/test_home_quiz_offer_right.py` a été étendu avec `ctaRight >= gridWidth - 120` à 1440px et 1600px. Le commit reste `style(home): move quiz offer copy to the right`.
