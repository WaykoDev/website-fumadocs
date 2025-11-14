# Checklist Architecture Server/Client

## ✅ Server Components (pas de "use client")

Ces composants peuvent :
- ✅ Accéder au système de fichiers (fs/promises)
- ✅ Accéder aux bases de données
- ✅ Utiliser des secrets (API keys)
- ❌ Ne peuvent PAS utiliser useState, useEffect, onClick, etc.

### Fichiers à vérifier

- [ ] `src/app/blog/page.tsx`
  - Doit charger les données depuis `blog-source`
  - Doit passer des props sérialisables à `BlogPageClient`

- [ ] `src/app/blog/[slug]/page.tsx`
  - Doit charger l'article depuis `blogSource.getPage()`
  - Ne doit pas avoir de state ou d'interactions

- [ ] `src/lib/blog-source.ts`
  - Peut utiliser Fumadocs loader
  - Les fonctions `get*()` sont server-only

## ✅ Client Components ("use client")

Ces composants peuvent :
- ✅ Utiliser hooks React (useState, useEffect, etc.)
- ✅ Gérer les interactions utilisateur
- ✅ Accéder au DOM
- ❌ Ne peuvent PAS accéder au système de fichiers
- ❌ Ne doivent PAS recevoir de props non-sérialisables

### Fichiers à vérifier

- [ ] `src/components/blog/BlogPageClient.tsx`
  - Doit avoir "use client"
  - Reçoit `SerializableBlogPost[]` (pas `BlogPost[]`)
  - Gère StarfieldBackground et NoScroll

- [ ] `src/components/blog/BlogList.tsx`
  - Doit avoir "use client"
  - Gère recherche (useState)
  - Gère filtres par tags (useState)

- [ ] `src/components/blog/BlogCard.tsx`
  - Doit avoir "use client"
  - Props : `SerializableBlogPost`

- [ ] `src/components/blog/TagBadge.tsx`
  - Doit avoir "use client"
  - Gère onClick handlers

## 🔄 Sérialisation des données

### Props Server → Client

**Règle** : Seules les données JSON-sérialisables peuvent passer du Server au Client.

#### ✅ Sérialisable

```typescript
// Primitives
string, number, boolean, null

// Objets simples
{ title: string, tags: string[] }

// Arrays
string[], number[]

// Date (converti en string ISO)
new Date() → "2025-01-15T10:00:00.000Z"
```

#### ❌ NON sérialisable

```typescript
// Fonctions
() => void, async () => {}

// Class instances
new MyClass()

// Module objects avec méthodes
{ data: {}, getText: async () => {} }

// Symbols, WeakMap, etc.
```

### Vérifications

- [ ] `BlogPageClient` reçoit `SerializableBlogPost[]`
- [ ] Pas de passage de `BlogPost` directement
- [ ] Dates converties en string ou Date simple
- [ ] Pas de fonctions dans les props

## 🎨 Composants visuels lourds

### StarfieldBackground (Three.js)

**Localisation** : `src/components/StarfieldBackground.tsx`

- [ ] Est un Client Component ("use client") ✓
- [ ] Utilise `@react-three/fiber` et `@react-three/drei`
- [ ] Canvas Three.js rendu côté client

**Points de vigilance** :
- Three.js est lourd (~300-500KB)
- Canvas 3D peut impacter les performances
- Rendering GPU intensif

### NoScroll

**Localisation** : `src/components/NoScroll.tsx`

- [ ] Est un Client Component
- [ ] Manipule le DOM (document.body)
- [ ] Side effects (useEffect)

## 📊 Checklist complète

### Server Side

```bash
# Vérifier qu'aucun Server Component n'a "use client"
grep -r "use client" src/app/blog/*.tsx src/lib/blog*.ts

# Si résultat = vide → ✅ Bon
```

### Client Side

```bash
# Vérifier que tous les composants interactifs ont "use client"
grep -L "use client" src/components/blog/*.tsx

# Chaque fichier listé doit être vérifié manuellement
```

### Imports problématiques

```bash
# Server Components ne doivent pas importer ces modules
grep -r "use client\|useState\|useEffect" src/app/blog/*.tsx

# Client Components ne doivent pas importer fs
grep -r "import.*fs" src/components/
```

## 🔍 Tests manuels

### Test 1 : Server Component purity

Ouvrir `src/app/blog/page.tsx` et vérifier :
- [ ] Pas de "use client" en haut
- [ ] Pas de useState/useEffect
- [ ] Pas d'event handlers (onClick, onChange)
- [ ] Uniquement appels à `getAllBlogPosts()`

### Test 2 : Client Component isolation

Ouvrir `src/components/blog/BlogList.tsx` et vérifier :
- [ ] "use client" présent
- [ ] Props type = `SerializableBlogPost[]`
- [ ] Pas d'import de `fs`, `path`, modules Node.js

### Test 3 : Sérialisation

Dans Chrome DevTools :
1. Ouvrir `/blog`
2. Components tab (React DevTools)
3. Vérifier props de `BlogPageClient`
4. Doit contenir : `posts: Array(4)` avec objets simples
5. Ne doit PAS contenir : functions, Symbols, etc.

## 🚨 Erreurs communes

### Erreur 1 : "client-only module"

```
Error: You're importing a component that needs "use client"
```

**Solution** : Ajouter "use client" en haut du fichier

### Erreur 2 : "Cannot read properties of undefined"

```
TypeError: Cannot read properties of undefined (reading 'data')
```

**Solution** : Vérifier que les props utilisent `SerializableBlogPost` (pas `post.data.tags` mais `post.tags`)

### Erreur 3 : "fs/promises not found"

```
Module not found: Can't resolve 'fs/promises'
```

**Solution** : Le composant doit être un Server Component (retirer "use client")

## ✅ Validation finale

Une fois toutes les vérifications effectuées :

```bash
# Build production pour vérifier
pnpm build

# Doit passer sans erreurs
```

Si le build passe → Architecture correcte ✅
