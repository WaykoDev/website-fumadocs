# 📋 Feature Backlog - Website Fumadocs

**Date de création**: 2025-11-20
**Dernière mise à jour**: 2025-11-20

Ce fichier contient les idées de fonctionnalités et améliorations futures pour le site.

---

## 🎨 Features UX/UI

### F001 - 3D Hover Effect sur Headers d'Articles ⭐
**Priorité**: P3 (Enhancement)
**Statut**: 🚧 En cours
**Date ajoutée**: 2025-11-20
**Date démarrée**: 2025-11-20
**Branch**: `002-feature-3d-hover-effect`
**Spec**: `specs/002-feature-3d-hover-effect/spec.md`

**Description**:
Ajouter un effet 3D interactif sur les headers des articles de blog qui réagit au mouvement de la souris.

**Détails techniques**:
- **Fichier cible**: `src/app/blog/[...slug]/page.tsx` (ligne 26-47, header section)
- **Technologies suggérées**:
  - CSS `transform: perspective()` et `rotateX/rotateY`
  - React hook `onMouseMove` pour tracker la position de la souris
  - Calcul de l'angle de rotation basé sur la position relative de la souris
  - Smooth transition avec `transition: transform 0.1s ease-out`
- **Compatibilité**: Desktop uniquement (désactiver sur mobile/tablet)
- **Accessibilité**: Respecter `prefers-reduced-motion` media query

**Inspiration**:
```tsx
// Exemple de logique pour calculer l'effet 3D
const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // Position X dans l'élément
  const y = e.clientY - rect.top;  // Position Y dans l'élément

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10; // Max ±10deg
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};
```

**Considérations**:
- Performance: Utiliser `requestAnimationFrame` si nécessaire
- Ne pas appliquer sur mobile (touch events différents)
- Tester avec dark mode
- Effet subtil pour ne pas distraire de la lecture
- Ajouter un gradient glow/shine qui suit la souris (optionnel)

**Fichiers à modifier**:
1. `src/app/blog/[...slug]/page.tsx` - Ajouter les event handlers
2. Potentiellement créer un composant réutilisable `<Interactive3DCard>`

**Tâches estimées**:
- [ ] T001: Créer un hook `useMouseParallax` réutilisable
- [ ] T002: Implémenter l'effet sur le header d'article
- [ ] T003: Ajouter detection mobile et `prefers-reduced-motion`
- [ ] T004: Tests sur différents navigateurs
- [ ] T005: Optimisation performance si nécessaire

**Temps estimé**: 2-3 heures

**Dépendances**: Aucune

**Liens utiles**:
- [CSS perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## 🚀 Features Performance

### F002 - Optimisation Images Blog
**Priorité**: P2 (Important)
**Statut**: 🔍 À investiguer
**Date ajoutée**: 2025-11-20

**Description**:
Ajouter la prise en charge automatique des images optimisées dans les articles MDX.

**Détails**:
- Utiliser Next.js `<Image>` component dans MDX components
- Lazy loading automatique
- Formats WebP/AVIF
- Responsive srcset

**Fichier cible**: `src/mdx-components.tsx`

---

## 📝 Features Contenu

### F003 - Table of Contents Interactive
**Priorité**: P2 (Important)
**Statut**: 📋 Planifié
**Date ajoutée**: 2025-11-20

**Description**:
Ajouter une table des matières sticky sur le côté droit des articles (desktop).

**Détails**:
- Extraction automatique des headings H2/H3
- Highlighting de la section active pendant le scroll
- Sticky positioning
- Responsive (masqué sur mobile/tablet)

**Fichier cible**: `src/app/blog/[...slug]/page.tsx`

---

## 🎯 Features Navigation

### F004 - Prev/Next Navigation
**Priorité**: P3 (Enhancement)
**Statut**: 💡 Idée
**Date ajoutée**: 2025-11-20

**Description**:
Ajouter des liens "Article précédent / suivant" en bas de chaque article.

**Détails**:
- Logique pour trouver l'article précédent/suivant
- Cards avec preview (titre + excerpt)
- Animations au hover

**Fichier cible**: `src/app/blog/[...slug]/page.tsx`

---

## 📊 Features Analytics

### F005 - Reading Time Calculation
**Priorité**: P3 (Enhancement)
**Statut**: 💡 Idée
**Date ajoutée**: 2025-11-20

**Description**:
Calculer automatiquement le temps de lecture basé sur le contenu MDX.

**Détails**:
- Calcul: ~200 mots/minute
- Afficher dans BlogMeta
- Stocker dans metadata

**Fichier cible**: `src/lib/blog-source.ts`

---

## 🎨 Features Theme

### F006 - Custom Syntax Highlighting Theme
**Priorité**: P3 (Enhancement)
**Statut**: 💡 Idée
**Date ajoutée**: 2025-11-20

**Description**:
Créer un thème de syntax highlighting personnalisé pour les code blocks qui matche mieux le design du site.

**Détails**:
- Dark mode avec violet/pink accents
- Light mode avec palette harmonisée

---

## 📝 Workflow de Gestion

### Statuts possibles:
- 💡 **Idée**: Concept initial, à approfondir
- 🔍 **À investiguer**: Recherche de faisabilité en cours
- 📋 **Planifié**: Spec écrite, prêt à implémenter
- 🚧 **En cours**: Implémentation en cours
- ✅ **Terminé**: Feature complétée et mergée
- ❌ **Abandonné**: Feature rejetée ou obsolète

### Priorités:
- **P1 (Critique)**: Bugs bloquants, problèmes critiques
- **P2 (Important)**: Features importantes, améliorations significatives
- **P3 (Enhancement)**: Nice to have, polish, optimisations

### Processus:
1. Ajouter l'idée dans ce fichier avec statut 💡
2. Investiguer la faisabilité si nécessaire (🔍)
3. Créer une spec détaillée quand prêt (📋)
4. Créer une branche et implémenter (🚧)
5. Marquer comme terminé après merge (✅)

---

## 📊 Statistiques

**Total features**: 6
**Nouvelles idées (💡)**: 3
**En cours (🚧)**: 1
**Planifiées (📋)**: 1
**À investiguer (🔍)**: 1

**Par priorité**:
- P2: 2 features
- P3: 4 features

---

**Dernière révision**: 2025-11-20
