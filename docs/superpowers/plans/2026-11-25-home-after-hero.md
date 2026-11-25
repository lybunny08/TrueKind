# Home After Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la section sous le hero de la page d’accueil par le visuel « Clean, Concise, Conscious » fourni, avec tous les styles dans `globals.css`.

**Architecture:** Une seule tâche, un composant réécrit (`BrandCommitments.tsx`) et un bloc CSS ajouté à `globals.css`. Le markup fourni est adapté pour garder l’export et l’id existants ; l’animation `useScrollReveal` est conservée sur les cartes. Aucun fichier CSS supplémentaire, aucun changement de `page.tsx`.

**Tech Stack:** Next.js 16.4.6, React 19.3, Tailwind CSS 4.3.3, Playwright Python.

**Spec:** `docs/superpowers/specs/2026-11-25-home-after-hero-design.md`

## Global Constraints

- Desktop = `min-width: 768px` ; mobile = dessous. Le bloc CSS ne change pas les marges `#ingredients` existantes.
- Tous les nouveaux styles vont dans `apps/web/src/app/globals.css`, ajoutés à la fin du fichier. Aucun `@import` Google Fonts, aucun `concise.css`.
- Polices : sans = `PP Mori`, serif = `Editorial New` italique (polices déjà auto-hébergées dans le projet).
- Image du visage : `/ingredients-clip.jpg`, rendue via `next/image` avec `width={800} height={1000}`, dimensions surchargées en CSS.
- Ratio de la scène : `357 / 406`, `container-type: inline-size`, largeur `min(100%, 820px)`.
- Texte exact du serif : `skincare.`. Tagline exacte : `Unreservedly honest products that truly work, be kind to skin and the planet – no exceptions!`.
- Quatre cartes, dans l’ordre `left`, `top`, `right`, `bottom`, avec les titres et textes fournis.
- Les SVG décoratifs et d’icônes sont `aria-hidden="true"`.

## Review Focus

- Le titre doit afficherexactement « CLEAN, CONCISE, / CONSCIOUS » avec `skincare.` en serif souligné — couvert par une assertion sur le `innerText` normalisé et la police calculée de `.cc__serif`.
- Le visage doit utiliser `ingredients-clip.jpg` et non une image cassée — couvert par une assertion sur l’`src` de `.cc__face`.
- Les quatre cartes doivent être présentes avec leurs titres — couvert par une assertion sur le nombre de `.cc__card` et leurs `h3`.
- Les tailles `cqw` doivent suivre la largeur réelle du stage à 1440px et 375px — couvert par des assertions calculées à partir de `document.documentElement.clientWidth`.
- L’animation de scroll doit rester active sur les cartes — couvert par la présence de `useScrollReveal(root, ".cc__card", …)` dans le composant et un test visuel de non-régression du build.

---

### Task 1: Section « Clean, Concise, Conscious »

**Files:**
- Modify: `apps/web/src/components/sections/BrandCommitments.tsx`
- Modify: `apps/web/src/app/globals.css` (ajout en fin de fichier)
- Test: `apps/web/tests/test_home_after_hero.py`

**Interfaces:**
- Consumes: `useScrollReveal` depuis `@/lib/useScrollReveal` ; `Image` depuis `next/image` ; type `ReactNode` depuis `react`.
- Produces: `.cc`, `.cc__stage`, `.cc__title`, `.cc__serif`, `.cc__tag`, `.cc__blob`, `.cc__face`, `.cc__leaf`, `.cc__peel`, `.cc__card`, `.cc__icon`, `.cc__arc`. Le composant garde l’export `BrandCommitments` et `page.tsx` n’est pas modifié.

- [x] **Step 1: Écrire le test qui échoue**

Créer `apps/web/tests/test_home_after_hero.py` avec `unittest` + Playwright, serveur sur `http://localhost:3000`. Le test lit `#ingredients` après `page.goto(BASE_URL, wait_until="networkidle")`.

Assertions à 1440px et 375px :
- `.cc__stage` existe ; `getComputedStyle(stage).aspectRatio` vaut `357 / 406`.
- La largeur calculée du stage vaut `min(clientWidth - 48, 820)` (clientWidth = `document.documentElement.clientWidth`).
- Le `innerText` normalisé de `.cc__title` contient `CLEAN, CONCISE, CONSCIOUS` ; `.cc__serif` vaut `skincare.` ; `.cc__tag` contient `Unreservedly honest products`.
- `getComputedStyle(.cc__title).fontSize` ≈ `0.064 × stageWidth` ; `.cc__serif` ≈ `0.088 × stageWidth` ; `.cc__tag` ≈ `max(7, 0.0145 × stageWidth)`.
- `.cc__blob` et `.cc__face` ont une largeur ≈ `0.66 × stageWidth` et `0.39 × stageWidth`.
- `.cc__face` a un attribut `src` contenant `ingredients-clip.jpg`.
- `document.querySelectorAll(".cc__card").length === 4` ; les `h3` contiennent « Clean, Beyond Reproach », « Radical Transparency », « Conscious & Responsible », « Potent & Multi Tasking ».
- `.cc__card h3` ≈ `max(7, 0.0165 × stageWidth)` ; `.cc__card p` ≈ `max(5.5, 0.012 × stageWidth)`.
- `.cc__card--left`, `cc__card--top`, `cc__card--right`, `cc__card--bottom` existent.

Test supplémentaire à 1440px : la fiche produit reste inchangée (`button.btn__icon` ≈ 9,6px) — régression déjà couverte, rejouée.

- [x] **Step 2: Vérifier que le test échoue**

Run (depuis la racine) : `python apps/web/tests/test_home_after_hero.py`
Expected : échec sur l’absence de `.cc__stage` et des sélecteurs `.cc__…`. Le test de régression fiche produit passe encore.

- [x] **Step 3: Réécrire `BrandCommitments.tsx`**

Remplacer tout le contenu par le composant fourni, adapté :
- garder `"use client"`, `useRef` et `useScrollReveal(root, ".cc__card", { start: "top 90%", y: 40, stagger: 0.12 })` ;
- `import type { ReactNode } from "react"` ; `import Image from "next/image"` ;
- `const FACE = "/ingredients-clip.jpg"` ;
- `const ic` avec les huit propriétés fournies (`width`, `height`, `viewBox`, `fill`, `stroke`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin`) plus `aria-hidden: true` ;
- `type Card = { id: string; title: string[]; text: string; icon: ReactNode }` ;
- `CARDS` exactement les quatre objets fournis, avec leurs titres, textes et SVG ;
- racine `<section ref={root} id="ingredients" className="cc">` ;
- dans l’ordre : `.cc__arc`, `.cc__title`, `.cc__serif`, `.cc__tag`, `.cc__blob`, `.cc__face`, `.cc__leaf`, `.cc__peel`, puis les quatre `<article>` ;
- `.cc__face` est un `<Image src={FACE} alt="Visage du visuel Clean, Concise, Conscious" width={800} height={1000} className="cc__face" />` ;
- les h3 restent rendus par `title.map((l) => <span key={l}>{l}</span>)`.

Aucun `import "./concise.css"`, aucune modification de `page.tsx`.

- [x] **Step 4: Ajouter le bloc CSS dans `globals.css`**

Ajouter à la fin de `apps/web/src/app/globals.css` :

```css
/* ===== HOME — SECTION SOUS LE HERO (Clean, Concise, Conscious) ===== */
#ingredients.cc {
  --cc-ink: #3a3a3a;
  --cc-peach: #f7c3b2;
  --cc-sans: "PP Mori", system-ui, sans-serif;
  --cc-serif: "Editorial New", Georgia, serif;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #fff;
  color: var(--cc-ink);
  font-family: var(--cc-sans);
}

#ingredients .cc__stage {
  position: relative;
  container-type: inline-size;
  width: min(100%, 820px);
  aspect-ratio: 357 / 406;
}
#ingredients .cc__stage > * { position: absolute; }

#ingredients .cc__title {
  left: 5.6%; top: 8.4%;
  font-size: 6.4cqw; font-weight: 500; line-height: 1.02;
  letter-spacing: -0.02em; white-space: nowrap;
}
#ingredients .cc__serif {
  left: 38.4%; top: 14.8%;
  font-family: var(--cc-serif); font-style: italic;
  font-size: 8.8cqw; line-height: 1; letter-spacing: -0.02em;
  text-decoration: underline; text-decoration-thickness: 1px;
  text-underline-offset: 0.12em;
}
#ingredients .cc__tag {
  left: 5.6%; top: 19.5%; width: 34%;
  font-size: max(7px, 1.45cqw); line-height: 1.3;
}
#ingredients .cc__arc {
  inset: 0; width: 100%; height: 100%;
  fill: none; stroke: var(--cc-ink); stroke-width: 0.8; pointer-events: none;
}

#ingredients .cc__blob {
  left: 19%; top: 36%; width: 66%; height: 58%;
  background: var(--cc-peach);
  border-radius: 58% 42% 52% 48% / 46% 54% 46% 54%;
  transform: rotate(-8deg);
}
#ingredients .cc__face {
  left: 32.5%; top: 42%; width: 39%; height: 50%;
  object-fit: cover; object-position: center top;
  border-radius: 46% 46% 40% 40% / 38% 38% 62% 62%;
}

#ingredients .cc__leaf { left: 71%; top: 26%; width: 9%; transform: rotate(-22deg); filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.15)); }
#ingredients .cc__peel { left: 9.5%; top: 74.5%; width: 13%; }

#ingredients .cc__card {
  width: 21.5%; padding: 2.2cqw 1.6cqw 2cqw;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  background: #fff; border-radius: 1.8cqw;
  box-shadow: 0 1.2cqw 3.5cqw rgb(0 0 0 / 0.09);
}
#ingredients .cc__icon {
  display: grid; place-items: center;
  width: 4.9cqw; height: 4.9cqw; margin-bottom: 1.4cqw;
  border-radius: 50%; background: #f1f1f1;
}
#ingredients .cc__icon svg { width: 55%; height: 55%; }
#ingredients .cc__card h3 {
  display: flex; flex-direction: column;
  font-size: max(7px, 1.65cqw); font-weight: 600; line-height: 1.12;
}
#ingredients .cc__card p {
  margin-top: 1.1cqw; font-size: max(5.5px, 1.2cqw); line-height: 1.3; color: #777;
}

#ingredients .cc__card--left { left: 5.6%; top: 40%; }
#ingredients .cc__card--top { left: 28%; top: 28.3%; }
#ingredients .cc__card--right { left: 73.4%; top: 56%; }
#ingredients .cc__card--bottom { left: 50.7%; top: 67.7%; }
```

Ne pas ajouter les resets `*` / `body` de l’extrait fourni. Ne pas modifier `original.css`.

- [x] **Step 5: Vérifier que le test passe**

Run : `python apps/web/tests/test_home_after_hero.py`
Expected : tous les tests passent.

- [x] **Step 6: Vérifier le build**

Run (depuis `apps/web`) : `npm run build`
Expected : build terminé sans erreur TypeScript ni CSS.

- [x] **Step 7: Commit**

Créer une branche locale `ui/home-after-hero` depuis la branche courante, committer avec `feat(home): replace section below hero with clean concise conscious visual`, ne pas pusher sans demande explicite.

## Revision (correction utilisateur, 2026-11-25)

Les étapes 3 et 4 ci-dessus ont été réécrites pendant l’exécution : seul le haut change, le reste revient à la version précédente. Le test `apps/web/tests/test_home_after_hero.py` a été remplacé par une suite qui vérifie le nouveau haut, la flèche, le retour des cartes/images d’origine et l’absence de la scène `.cc__stage/.cc__blob/.cc__card`. Le message de commit est ajusté en conséquence : `style(home): refresh copy and typography of section below hero`.
