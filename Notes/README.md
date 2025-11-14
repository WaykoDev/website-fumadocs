# 📚 Documentation Technique

Documentation complète du blog Fumadocs et checklist de performance.

## 📁 Fichiers

### [BLOG.md](./BLOG.md)
Guide complet pour comprendre et utiliser le blog :
- ✅ Comment ajouter un nouvel article
- ✅ Explication du système de slugs
- ✅ Architecture technique (Server/Client)
- ✅ Explication de Zod et excerpt
- ✅ Modifications effectuées
- ✅ Troubleshooting

**Lire en premier si vous voulez :**
- Ajouter un article au blog
- Comprendre comment fonctionne le système
- Customiser les couleurs de tags

### [ARCHITECTURE-CHECK.md](./ARCHITECTURE-CHECK.md)
Checklist complète pour vérifier la séparation Server/Client :
- ✅ Règles Server Components vs Client Components
- ✅ Checklist de vérification
- ✅ Tests de sérialisation
- ✅ Erreurs communes et solutions

**Lire si vous :**
- Modifiez l'architecture des composants
- Ajoutez de nouveaux composants interactifs
- Debuggez des erreurs de sérialisation

### [PERFORMANCE-DIAGNOSTIC.md](./PERFORMANCE-DIAGNOSTIC.md)
Guide de diagnostic de performance :
- ✅ Métriques à surveiller (Core Web Vitals)
- ✅ Diagnostic Three.js et composants 3D
- ✅ Optimisations recommandées
- ✅ Tests de performance
- ✅ Problèmes connus et solutions

**Lire si vous :**
- Constatez des problèmes de performance
- Voulez optimiser le temps de chargement
- Diagnostiquer Three.js / animations lourdes

## 🚀 Quick Start

### Ajouter un article

```bash
# 1. Créer le fichier
touch content/blog/mon-article.mdx

# 2. Ajouter le frontmatter
---
title: "Mon article"
description: "Description"
date: 2025-01-15
tags: ["pentest", "web"]
---

## Contenu

Votre article ici...

# 3. Le blog détecte automatiquement le nouvel article
```

### Vérifier l'architecture

```bash
# Server Components ne doivent pas avoir "use client"
grep -r "use client" src/app/blog/*.tsx src/lib/

# Client Components doivent avoir "use client"
head -n 1 src/components/blog/*.tsx | grep "use client"
```

### Tester les performances

```bash
# Build production
pnpm build

# Lancer Lighthouse dans Chrome DevTools
# Objectif : Score > 90
```

## 📊 Todo List Performance

### À faire maintenant

- [ ] Vérifier directives "use client" (ARCHITECTURE-CHECK.md)
- [ ] Vérifier accès fs dans Client Components
- [ ] Vérifier sérialisation des props

### À faire avant déploiement

- [ ] Mesurer bundle size Three.js
- [ ] Run Lighthouse sur toutes les pages
- [ ] Tester sur mobile (throttling)
- [ ] Vérifier lazy loading des composants lourds

## 🛠️ Outils recommandés

### Chrome DevTools
- **Performance** : Identifier bottlenecks
- **Network** : Waterfall des requêtes
- **Lighthouse** : Audit automatique

### Next.js
```bash
# Analyser le bundle
pnpm build --profile
ANALYZE=true pnpm build
```

### Monitoring
- Vercel Analytics (si déploiement Vercel)
- Core Web Vitals monitoring

## 🎯 Objectifs Performance

**Desktop** :
- Performance Score : 95+
- FCP : < 1.5s
- LCP : < 2s

**Mobile** :
- Performance Score : 90+
- FCP : < 2s
- LCP : < 2.5s

## 📞 Support

Pour toute question :
1. Consulter BLOG.md (usage général)
2. Consulter ARCHITECTURE-CHECK.md (problèmes techniques)
3. Consulter PERFORMANCE-DIAGNOSTIC.md (performances)

## 🔄 Mise à jour

Ces documents sont à jour au **14 janvier 2025**.

Modifications depuis la dernière version :
- ✅ Blog complet avec 4 articles
- ✅ Système de tags avec filtrage
- ✅ Recherche fonctionnelle
- ✅ SEO metadata complètes
- ✅ Architecture Server/Client validée
