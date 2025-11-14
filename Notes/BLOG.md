# Documentation Blog Fumadocs

## 📝 Vue d'ensemble

Le blog est construit avec **Fumadocs MDX** et suit une architecture Server/Client Components de Next.js.

## 🚀 Ajouter un nouvel article

### 1. Créer le fichier MDX

Créez un fichier dans `content/blog/` avec le nom du slug :

```bash
content/blog/mon-super-article.mdx
```

Le **slug** est le nom du fichier sans l'extension. Il devient l'URL de l'article :
- Fichier : `content/blog/pentest-webapp-2024.mdx`
- URL : `/blog/pentest-webapp-2024`

### 2. Frontmatter (métadonnées)

En haut du fichier MDX, ajoutez les métadonnées :

```mdx
---
title: "Mon article de pentest"
description: "Description courte pour SEO et preview"
date: 2025-01-15
author: Franck Chevalier
tags:
  - pentest
  - web
  - ctf
image: /images/article-preview.png  # Optionnel
excerpt: Résumé court pour les cards   # Optionnel
---

## Introduction

Votre contenu Markdown ici...
```

### 3. C'est tout !

Le système détecte automatiquement le nouveau fichier et l'ajoute au blog.

## 🔧 Architecture technique

### Séparation Server/Client

**Server Components** (pas de "use client") :
- `src/app/blog/page.tsx` - Charge les données depuis le système de fichiers
- `src/app/blog/[slug]/page.tsx` - Charge l'article individuel
- `src/lib/blog-source.ts` - Loader Fumadocs

**Client Components** ("use client") :
- `src/components/blog/BlogPageClient.tsx` - Gère les interactions (recherche, filtres)
- `src/components/blog/BlogList.tsx` - Liste interactive avec filtres
- `src/components/blog/BlogCard.tsx` - Card d'article
- `src/components/blog/TagBadge.tsx` - Tags interactifs

**Pourquoi cette séparation ?**

Les Server Components peuvent accéder au système de fichiers (fs/promises) pour lire les MDX. Les Client Components gèrent les interactions utilisateur (useState, onClick, etc.) mais ne peuvent pas accéder à fs.

### Sérialisation des données

Le problème : on ne peut pas passer directement les objets `BlogPost` du serveur au client (ils contiennent des méthodes non sérialisables).

**Solution** : Type `SerializableBlogPost` dans `blog-source.ts`

```typescript
// ❌ Ne peut pas être passé au client
type BlogPost = {
  data: { title, description, ... },
  getText: () => Promise<string>,  // ← Méthode = non sérialisable
  getMDAST: () => ...,
}

// ✅ Peut être passé au client
type SerializableBlogPost = {
  url: string,
  title: string,
  description?: string,
  tags?: string[],
  // Seulement des données simples
}
```

La fonction `getSerializableBlogPosts()` convertit les BlogPost en objets sérialisables.

## 📚 Outils utilisés

### Zod - Validation de schéma

**À quoi ça sert ?**

Zod valide la structure des données dans le frontmatter des articles MDX.

```typescript
// Dans source.config.ts
schema: frontmatterSchema.extend({
  author: z.string().default('Franck Chevalier'),
  date: z.string().or(z.date()),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
})
```

**Avantages :**
- ✅ Type-safety : TypeScript sait exactement quels champs existent
- ✅ Validation automatique : erreur si le frontmatter est incorrect
- ✅ Valeurs par défaut : `author` est automatiquement "Franck Chevalier"

**Exemple de validation :**

```mdx
---
title: "Mon article"
date: "not-a-date"  # ❌ Erreur Zod : format de date invalide
tags: "pentest"     # ❌ Erreur Zod : tags doit être un array
---
```

### Excerpt (extrait)

**À quoi ça sert ?**

L'`excerpt` est un **résumé court** de l'article affiché dans les cards sur la page d'accueil du blog.

```mdx
---
title: "SQL Injection avancée"
excerpt: Guide complet des techniques d'injection SQL modernes
---
```

**Où apparaît-il ?**
- Preview cards dans la grille d'articles
- Métadonnées SEO
- Snippets de recherche

Si absent, le système peut extraire automatiquement les premières lignes de l'article avec `getExcerpt()` dans `blog-utils.ts`.

## 🔄 Modifications effectuées

### 1. Configuration Fumadocs

**Fichier** : `source.config.ts`
- Ajout collection `blog` avec schema personnalisé (author, date, tags, excerpt)
- Séparé de la collection `docs`

### 2. Source Blog

**Fichier** : `src/lib/blog-source.ts`
- Loader Fumadocs pour `/blog`
- Type `SerializableBlogPost` pour serialization
- Fonctions : `getAllBlogPosts()`, `getSerializableBlogPosts()`, `getAllTags()`

### 3. Composants créés

**Pages** :
- `src/app/blog/page.tsx` - Server Component, liste des articles
- `src/app/blog/[slug]/page.tsx` - Server Component, page article
- `src/app/blog/layout.tsx` - Metadata SEO globales

**Composants Client** :
- `BlogPageClient.tsx` - Wrapper avec StarfieldBackground
- `BlogList.tsx` - Recherche + filtres interactifs
- `BlogCard.tsx` - Card avec animations hover
- `BlogMeta.tsx` - Display author/date/reading time
- `TagBadge.tsx` - Tag simple
- `LinkTagBadge.tsx` - Tag cliquable (redirige vers filtres)

**Utils** :
- `src/lib/blog-utils.ts` - Formatage dates, temps de lecture, couleurs tags

**Styles** :
- `src/app/blog/[slug]/blog-post.css` - Styles prose pour articles

### 4. Fonctionnalités

✅ **Recherche par titre/description**
- Input de recherche en temps réel
- Filtrage côté client (instant)

✅ **Filtrage par tags**
- Sélection de tag via boutons ou URL (`/blog?tag=pentest`)
- Compteur d'articles filtrés
- Tags cliquables dans les articles

✅ **Navigation**
- Liste des articles triés par date (plus récent en premier)
- Liens vers articles
- Bouton retour au blog depuis les articles

✅ **SEO**
- OpenGraph tags complets
- Twitter cards
- Metadata dynamiques par article
- Sitemap automatique (Next.js)

✅ **UX**
- Animations fade-in-up au scroll
- Hover effects sur cards
- Responsive mobile-first
- StarfieldBackground cosmic

## 🎨 Customisation

### Ajouter une couleur de tag

**Fichier** : `src/lib/blog-utils.ts`

```typescript
export const tagColors: Record<string, string> = {
  'pentest': 'bg-red-500/10 text-red-500 border-red-500/20',
  'nouveau-tag': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  // ...
};
```

### Modifier le style des articles

**Fichier** : `src/app/blog/[slug]/blog-post.css`

Modifiez les classes `.prose` pour customiser le rendu Markdown.

## 📊 Structure des données

```
Fumadocs MDX
     ↓
  BlogPost (avec méthodes)
     ↓ serializeBlogPost()
  SerializableBlogPost (données uniquement)
     ↓ Props
  Client Components
```

## 🐛 Troubleshooting

**Erreur : "Cannot find module '@/.source'"**
- Lancez `pnpm run postinstall` pour compiler les MDX

**Erreur : "Cannot read properties of undefined"**
- Vérifiez que vous utilisez `SerializableBlogPost` dans les Client Components

**Article non affiché**
- Vérifiez le frontmatter (date valide, titre présent)
- Redémarrez le serveur dev
