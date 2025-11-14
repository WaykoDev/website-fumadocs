# Diagnostic de Performance

## 🎯 Objectifs

Identifier et résoudre les problèmes de performance liés à :
1. **Three.js / React Three Fiber** (StarfieldBackground, BackgroundGalaxy)
2. **Temps de chargement** des pages
3. **Bundle size** excessif
4. **First Contentful Paint (FCP)**

## 📊 Métriques à surveiller

### Core Web Vitals

- **LCP** (Largest Contentful Paint) : < 2.5s ✅
- **FID** (First Input Delay) : < 100ms ✅
- **CLS** (Cumulative Layout Shift) : < 0.1 ✅

### Métriques custom

- **FCP** (First Contentful Paint) : < 1.8s
- **TTI** (Time to Interactive) : < 3.8s
- **Bundle Size** : < 300KB (gzipped)

## 🔍 Diagnostic Three.js

### Composants 3D actuels

```
src/components/
├── StarfieldBackground.tsx    (~100KB avec Three.js)
├── BackgroundGalaxy.tsx
├── Galaxy.tsx
└── WhiteGalaxy.tsx
```

### Problèmes potentiels

#### 1. **Bundle size excessif**

Three.js est lourd (~500KB non compressé).

**Vérification** :

```bash
# Analyser le bundle
pnpm build
npx @next/bundle-analyzer
```

**Solution si problème** :
- Lazy load des composants 3D
- Code splitting agressif
- Tree shaking de Three.js

#### 2. **Rendering bloquant**

Canvas Three.js peut bloquer le main thread.

**Vérification** :

```javascript
// Dans Chrome DevTools > Performance
// Enregistrer 6s de chargement de la page
// Chercher "Long Tasks" > 50ms
```

**Solution si problème** :
- Utiliser `Suspense` avec fallback
- Réduire le nombre de particules
- Throttle des animations

#### 3. **Hydration lourde**

React hydrate les composants 3D côté client.

**Vérification** :

Dans DevTools Console, mesurer :

```javascript
performance.measure('hydration')
```

**Solution si problème** :
- Désactiver SSR pour les composants 3D
- Utiliser `dynamic` de Next.js avec `ssr: false`

## 🚀 Optimisations recommandées

### 1. Lazy Loading des composants 3D

**Avant** :

```typescript
import StarfieldBackground from "@/components/StarfieldBackground";

export default function Page() {
  return <StarfieldBackground />;
}
```

**Après** :

```typescript
import dynamic from 'next/dynamic';

const StarfieldBackground = dynamic(
  () => import('@/components/StarfieldBackground'),
  { ssr: false }
);

export default function Page() {
  return <StarfieldBackground />;
}
```

**Gain** : ~300-500KB retirés du bundle initial

### 2. Code Splitting des pages

**Vérification** :

```bash
# Build et vérifier les chunks
pnpm build
# Regarder .next/static/chunks/
```

**Pages à code-splitter** :
- `/blog` - Liste des articles
- `/blog/[slug]` - Articles individuels
- `/about` - Page About avec animations

### 3. Optimisation des animations

**StarfieldBackground.tsx** :

```typescript
// Avant : 5000 particules
const starCount = 5000;

// Après : Adaptatif selon device
const starCount = window.innerWidth < 768 ? 1000 : 3000;
```

**Gain** : ~40% reduction CPU usage sur mobile

### 4. Preload des ressources critiques

**next.config.mjs** :

```javascript
experimental: {
  optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
}
```

## 📈 Tests de performance

### Test 1 : Lighthouse

```bash
# Build production
pnpm build
pnpm start

# Dans Chrome DevTools > Lighthouse
# Run audit sur :
# - http://localhost:3000/ (home)
# - http://localhost:3000/blog
# - http://localhost:3000/about
```

**Objectifs** :
- Performance score : > 90
- First Contentful Paint : < 1.8s
- Speed Index : < 3.4s

### Test 2 : Bundle Analyzer

```bash
# Installer
pnpm add -D @next/bundle-analyzer

# Analyser
ANALYZE=true pnpm build
```

**À vérifier** :
- Three.js : < 200KB (gzipped)
- Total First Load JS : < 300KB
- Pas de duplications de modules

### Test 3 : Network throttling

**Chrome DevTools > Network** :
- Throttle à "Slow 3G"
- Recharger `/blog`
- Vérifier que le contenu apparaît < 3s

### Test 4 : CPU throttling

**Chrome DevTools > Performance** :
- CPU throttling 4x slowdown
- Enregistrer 6s de navigation
- Vérifier fps stable > 30fps

## 🐛 Problèmes connus

### 1. Three.js charge toujours sur toutes les pages

**Symptôme** : Bundle Three.js présent même sur `/blog`

**Diagnostic** :

```bash
# Vérifier les imports
grep -r "@react-three" src/app/blog/
```

**Solution** :
- S'assurer que StarfieldBackground est seulement dans les pages qui en ont besoin
- Pas d'import global

### 2. Animations janky sur mobile

**Symptôme** : FPS chute à <30 sur mobile

**Diagnostic** :

Ajouter un FPS counter :

```typescript
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  const now = performance.now();
  frames++;

  if (now >= lastTime + 1000) {
    const fps = Math.round(frames * 1000 / (now - lastTime));
    console.log(`FPS: ${fps}`);
    frames = 0;
    lastTime = now;
  }

  requestAnimationFrame(measureFPS);
}

measureFPS();
```

**Solution** :
- Réduire particule count sur mobile
- Utiliser `will-change: transform` CSS
- Throttle des animations à 30fps sur mobile

### 3. First Load très lent

**Symptôme** : FCP > 3s

**Diagnostic** :

```bash
# Vérifier la taille du HTML initial
curl -s http://localhost:3000 | wc -c

# Vérifier les ressources bloquantes
# DevTools > Network > Filter "JS"
```

**Solution** :
- Précharger les fonts
- Defer non-critical JS
- Inline critical CSS

## 📋 Checklist Performance

### Pre-deployment

- [ ] Run Lighthouse sur toutes les pages principales
- [ ] Performance score > 90
- [ ] FCP < 2s sur toutes les pages
- [ ] Bundle analyzer vérifié (pas de gros chunks inutiles)
- [ ] Test sur mobile (throttling CPU + Network)
- [ ] Pas de console.log en production
- [ ] Source maps désactivées en production

### Monitoring continu

- [ ] Configurer Vercel Analytics (si déployé sur Vercel)
- [ ] Monitorer Web Vitals
- [ ] Alertes si LCP > 2.5s
- [ ] Tracker les erreurs JavaScript

## 🔧 Outils de diagnostic

### Chrome DevTools

```
- Performance tab : Identifier bottlenecks
- Network tab : Waterfall des requêtes
- Lighthouse : Audit automatique
- Coverage : Trouver le code non utilisé
```

### Next.js Built-in

```bash
# Analyser le bundle
pnpm build --profile

# Verbose build info
NEXT_TELEMETRY_DEBUG=1 pnpm build
```

### Commandes utiles

```bash
# Mesurer build time
time pnpm build

# Vérifier la taille des pages
du -sh .next/static/chunks/*

# Compter les lignes de code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

## 🎯 Objectifs finaux

### Performances cibles

- **Desktop** :
  - Performance Score : 95+
  - FCP : < 1.5s
  - LCP : < 2s
  - Bundle : < 250KB

- **Mobile** :
  - Performance Score : 90+
  - FCP : < 2s
  - LCP : < 2.5s
  - FPS : > 30

### Critères de validation

✅ Build passe sans warnings
✅ Lighthouse score > 90 sur toutes les pages
✅ Pas de layout shift (CLS < 0.1)
✅ Temps de chargement perçu < 3s (avec throttling)
✅ Animations fluides sur mobile

## 🔍 Diagnostic rapide

### Commande one-liner

```bash
# Test complet
pnpm build && \
echo "✓ Build successful" && \
ls -lh .next/static/chunks/pages/*.js | awk '{print $5, $9}' && \
echo "Run Lighthouse manually in Chrome DevTools"
```

**Interprétation** :
- Fichiers > 500KB → Problème de code splitting
- Fichiers > 1MB → Three.js non optimisé
- Warnings pendant build → Dépendances lourdes
