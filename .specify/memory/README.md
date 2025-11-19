# .specify/memory - Documentation du Projet

Ce répertoire contient la documentation de spécification et de planification pour le projet website-fumadocs.

## 📋 Fichiers Disponibles

### 1. `constitution.md` ⭐ IMPORTANT
**Constitution du projet** - Principes fondamentaux et règles de développement

**Contient**:
- Core Principles (Mobile-First, Performance, Dark Mode, etc.)
- Technology Stack Requirements
- Development Workflow (Git, PRs, commits)
- Code Quality Gates
- Testing Requirements
- Performance & Accessibility Standards
- Governance

**Quand le consulter**:
- Avant de commencer une nouvelle feature
- Quand on a des doutes sur les best practices
- Avant de créer une PR
- Pour les code reviews

### 2. `spec-blog-improvements.md` 🎯
**Spécification des améliorations du blog/writeups**

**Contient**:
- Analyse du contexte actuel (architecture, problèmes identifiés)
- User Stories avec priorités (P1, P2, P3)
- Requirements (Functional + Non-Functional)
- Success Criteria
- Solutions proposées
- Fichiers à modifier

**Basé sur**:
- Analyse des 6 derniers commits
- TODOs identifiés dans les commits (responsive, scrollbar)
- Architecture actuelle du blog Fumadocs

**User Stories**:
1. **P1 (Critique)**: Fix Responsive Design sur mobile
2. **P2 (Important)**: Fix Scrollbar inutile en plein écran
3. **P3 (Optionnel)**: Améliorations UX (TOC, animations, navigation)

### 3. `tasks-blog-improvements.md` ✅
**Liste de tâches concrètes pour implémenter les améliorations**

**Contient**:
- 49 tâches organisées en phases
- Dépendances entre les tâches
- Estimation de temps par phase
- Strategy d'implémentation (séquentielle vs parallèle)
- Validation checklist final

**Structure**:
- **Phase 1**: Investigation & Audit (7 tâches)
- **Phase 2**: User Story 1 - Responsive Design (15 tâches) 🎯 MVP
- **Phase 3**: User Story 2 - Scrollbar Fix (6 tâches)
- **Phase 4**: User Story 3 - UX Improvements (16 tâches) - OPTIONNEL
- **Phase 5**: Polish & Documentation (5 tâches)

### 4. `backlog.md` 📋 NOUVEAU
**Feature backlog - Idées et améliorations futures**

**Contient**:
- Liste des features futures (P2/P3)
- Statuts: 💡 Idée, 🔍 À investiguer, 📋 Planifié, 🚧 En cours, ✅ Terminé
- Détails techniques pour chaque feature
- Exemples de code et ressources
- Estimation de temps

**Features actuelles**:
- **F001**: 3D Hover Effect sur headers d'articles ⭐ (P3)
- **F002**: Optimisation images blog (P2)
- **F003**: Table of Contents interactive (P2)
- **F004**: Prev/Next navigation (P3)
- **F005**: Reading time calculation (P3)
- **F006**: Custom syntax highlighting theme (P3)

**Quand le consulter**:
- Quand on cherche de nouvelles features à implémenter
- Pour planifier les prochains sprints
- Pour documenter des idées

## 🚀 Comment Utiliser Ces Fichiers

### Workflow Recommandé

1. **Lire la Constitution** (`constitution.md`)
   ```bash
   cat .specify/memory/constitution.md
   ```
   - Comprendre les principes du projet
   - Mémoriser les gates de qualité
   - Comprendre le workflow Git

2. **Comprendre la Spec** (`spec-blog-improvements.md`)
   ```bash
   cat .specify/memory/spec-blog-improvements.md
   ```
   - Comprendre le contexte et les problèmes
   - Lire les User Stories
   - Comprendre les Requirements
   - Noter les Success Criteria

3. **Suivre les Tasks** (`tasks-blog-improvements.md`)
   ```bash
   cat .specify/memory/tasks-blog-improvements.md
   ```
   - Commencer par Phase 1 (Audit)
   - Suivre l'ordre des phases
   - Cocher les tâches au fur et à mesure
   - Respecter les dépendances

### Exemple de Session de Travail

```bash
# 1. Consulter la constitution pour les règles
cat .specify/memory/constitution.md | grep -A 10 "Mobile-First"

# 2. Voir la prochaine tâche à faire
cat .specify/memory/tasks-blog-improvements.md | grep -A 5 "Phase 1"

# 3. Travailler sur la tâche T001 par exemple
# Tester tous les articles sur viewport 375px

# 4. Documenter les résultats
# Ajouter les notes dans un fichier de travail

# 5. Passer à la tâche suivante
# Suivre l'ordre défini dans tasks-blog-improvements.md
```

## 📊 État Actuel du Projet

### Problèmes Identifiés (via git commits)

1. **Responsive Design** ⚠️ CRITIQUE
   - Commit: `dce7741a` - "tryfix menu bar docs TODO fix writeups responsive"
   - Impact: Les articles ne s'affichent pas correctement sur mobile
   - Priorité: P1 (Must Fix)

2. **Scrollbar Inutile** ⚠️ IMPORTANT
   - Commit: `befd1187` - "TODO FIX useless scroll when full screen"
   - Impact: UX dégradée en mode plein écran
   - Priorité: P2 (Should Fix)

### Architecture Actuelle

```
Website Fumadocs
├── Next.js 16 (App Router)
├── React 19
├── Tailwind CSS v4
├── Fumadocs (Blog & Docs)
├── React Three Fiber (3D)
└── TypeScript

Blog Structure:
content/blog/
├── intro/
├── pentest/
└── thoughts/

src/
├── app/blog/
│   ├── page.tsx (liste)
│   ├── layout.tsx
│   └── [...slug]/
│       ├── page.tsx (article)
│       ├── layout.tsx (DocsLayout)
│       └── blog-post.css
├── components/blog/
└── lib/blog-source.ts
```

### Derniers Commits Analysés

```
a4a296b8 - save before writup modifications
dce7741a - tryfix menu bar docs TODO fix writeups responsive ⚠️
cf67b507 - fix: improve blog article layout with mobile-first
07c776ab - fix: restore prose styles for blog article MDX
cf8ac986 - refactor: simplify blog page header and rename
2fae4c65 - feat: implement hybrid blog navigation
```

## 🎯 Prochaines Étapes Recommandées

### Sprint 1 - Semaine 1 (P1 - CRITIQUE)

**Objectif**: Rendre le blog complètement responsive

1. **Jour 1**: Audit complet
   - T001-T007: Tester tous les viewports
   - Documenter tous les problèmes
   - Identifier les conflits CSS

2. **Jour 2-3**: Fixes de layout
   - T008-T012: Analyser et fixer les containers
   - T013: Fixer les styles prose
   - T014: Fixer les blocs de code

3. **Jour 4**: Fixes d'images et tables
   - T015-T018: Images responsive, tables scrollables
   - Fix sidebar Fumadocs

4. **Jour 5**: Testing
   - T019-T022: Tests sur tous les devices
   - Validation mobile + dark mode

### Sprint 2 - Semaine 2 (P2 - IMPORTANT)

**Objectif**: Éliminer la scrollbar inutile

1. **Jour 1-2**: Investigation et fix
   - T023-T026: Identifier et fixer la scrollbar
   - T027-T028: Testing

2. **Jour 3-5**: Polish
   - T045-T049: Nettoyage, documentation, commit

### Sprint 3+ (P3 - OPTIONNEL)

**Objectif**: Améliorations UX

- T029-T044: TOC, animations, navigation améliorée
- À faire si temps disponible

## 📚 Ressources Utiles

### Documentation
- [Fumadocs](https://fumadocs.vercel.app/)
- [Next.js 16](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

### Outils
- Chrome DevTools (Responsive mode)
- Lighthouse
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Testing
- Test mobile: Chrome DevTools (375px, 768px, 1024px+)
- Test navigateurs: Chrome, Firefox, Safari, Edge
- Test dark mode: Toggle dans DevTools
- Test performance: Lighthouse (Performance > 90, Accessibility > 95)

## ⚙️ Scripts Disponibles

Dans `.specify/scripts/bash/`:
- `create-new-feature.sh` - Créer une nouvelle feature
- `setup-plan.sh` - Setup planning
- `update-agent-context.sh` - Update agent context
- `check-prerequisites.sh` - Check prerequisites
- `common.sh` - Common utilities

## 🔄 Maintenance de Ce Répertoire

### Quand Mettre à Jour

**Constitution** (`constitution.md`):
- Quand on découvre de nouveaux principes
- Quand on change le workflow Git
- Quand on ajoute de nouveaux outils

**Specs** (`spec-*.md`):
- Quand on commence une nouvelle feature
- Quand les requirements changent
- Quand on découvre de nouveaux problèmes

**Tasks** (`tasks-*.md`):
- Quand on termine une phase
- Quand on découvre de nouvelles tâches
- Quand les priorités changent

### Format de Versioning

Utiliser Semantic Versioning dans les fichiers:
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes, restructuration majeure
- **MINOR** (1.0.0 → 1.1.0): Nouvelles features, nouvelles sections
- **PATCH** (1.0.0 → 1.0.1): Corrections, clarifications

## 📝 Notes

- Ces fichiers sont **VIVANTS** - ils doivent être mis à jour régulièrement
- La **Constitution** est la source de vérité pour les principes
- Les **Specs** définissent le QUOI et le POURQUOI
- Les **Tasks** définissent le COMMENT et le QUAND
- Suivre le workflow défini dans la Constitution pour garantir la qualité

---

**Créé**: 2025-11-16 | **Dernière mise à jour**: 2025-11-16
