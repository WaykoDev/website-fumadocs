# 📋 Feature Backlog - Website Fumadocs

**Date de création**: 2025-11-20
**Dernière mise à jour**: 2025-11-20

Ce fichier contient les idées de fonctionnalités et améliorations futures pour le site.

---

## 🎨 Features UX/UI

### F001 - Interactive Light Effect sur Titre d'Articles ⭐
**Priorité**: P3 (Enhancement)
**Statut**: ✅ Terminé
**Date ajoutée**: 2025-11-20
**Date démarrée**: 2025-11-20
**Date terminée**: 2025-11-20
**Branch**: `002-feature-3d-hover-effect`
**Spec**: `specs/002-feature-3d-hover-effect/spec.md`

**Description**:
Animation GSAP interactive sur le titre des articles de blog - effet de lumière qui suit le curseur avec ombres dynamiques.

**Implémentation finale**:
- **Technologies utilisées**:
  - GSAP v3.13.0 pour animations fluides
  - React hooks (useRef, useEffect, useState)
  - Text splitting lettre par lettre pour animations individuelles
  - Easing: power2.out

- **Effets implémentés** (version finale - clean & elegant):
  - ✅ Float effect - lettres montent vers le haut (-10px max)
  - ✅ Gentle scale (1.08x max)
  - ✅ Brightness glow effect (luminosité +30%)
  - ✅ Effet localisé (90px radius)
  - ✅ Smooth transitions (0.3s in, 0.5s out)

- **Compatibilité & Accessibilité**:
  - ✅ Desktop uniquement (< 1024px = désactivé)
  - ✅ Détection touch devices (désactivé)
  - ✅ Respect `prefers-reduced-motion` media query
  - ✅ Performance optimale avec GSAP

**Fichiers créés/modifiés**:
1. `src/components/blog/AnimatedBlogHeader.tsx` - Nouveau composant client GSAP
2. `src/app/blog/[...slug]/page.tsx` - Intégration du composant
3. `package.json` - Ajout dépendance `gsap@3.13.0`

**Commits**:
- 9dfbe4ac - Initial spec setup
- a6d9d926 - Spotlight effect (initial)
- 97d62921 - Shadow effect iteration
- 6f88ba72 - Final clean float + glow effect
- 0ad5fb79 - Merge to main

**Notes techniques**:
- Calcul de distance vectorielle pour chaque lettre
- Intensité basée sur proximité au curseur (quadratic falloff)
- Effect radius: 90px (localized)
- Performance: GSAP gère l'optimisation RAF automatiquement
- Simple et fiable - pas de changements de couleur complexes

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
**Terminées (✅)**: 1
**Planifiées (📋)**: 1
**À investiguer (🔍)**: 1

**Par priorité**:
- P2: 2 features
- P3: 4 features

---

**Dernière révision**: 2025-11-20
