# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application built with Fumadocs for documentation/blog functionality. The site features custom 3D galaxy animations using React Three Fiber and includes multiple route groups for different sections (home, blog, about, contact).

## Development Commands

**Development:**
```bash
npm run dev          # Start dev server with Turbo (http://localhost:3000)
pnpm dev            # Alternative with pnpm
```

**Building:**
```bash
npm run build       # Build production bundle
npm start          # Start production server
```

**Code Quality:**
```bash
npm run lint        # Run ESLint
```

**Post-install:**
The `postinstall` script automatically runs `fumadocs-mdx` to generate content from MDX files in the `content/` directory.

## Architecture

### Content Management (Fumadocs)

- **Content Source**: `content/` directory contains MDX files organized by type:
  - `content/about/` - About page content
  - `content/blog/` - Blog posts

- **Content Configuration**: `source.config.ts` defines schema and processing options using Fumadocs MDX
  - Configured with `includeProcessedMarkdown: true` for content processing
  - Uses standard frontmatter and meta schemas

- **Content Loader**: `src/lib/source.ts` provides the interface to access content
  - Exports `source` adapter configured with `/docs` baseUrl
  - Includes `lucideIconsPlugin()` for icon support
  - Helper functions: `getPageImage()` and `getLLMText()` for page utilities

- **Generated Files**: `.source/` directory (git-ignored) contains auto-generated content from `fumadocs-mdx`
  - Rebuilt automatically on `npm install` or when MDX files change
  - Imported via `@/.source` path alias

### Route Structure

The app uses Next.js 13+ App Router with multiple route groups:

- **`app/(home)/`** - Landing page with 3D galaxy background
  - Uses `HomeLayout` from Fumadocs UI
  - Custom components: `Intro`, `BackgroundGalaxy`, `NoScroll`

- **`app/blog/`** - Blog section
  - Layout uses Fumadocs `HomeLayout` with shared options
  - Blog posts sourced from `content/blog/`

- **`app/about/`** - About page section
  - Separate layout with custom styling

- **`app/contact/`** - Contact page section
  - Dedicated layout and styling

- **`app/api/search/route.ts`** - Search API endpoint
  - Uses Fumadocs search with Orama integration
  - Configured for English language

- **`app/og/docs/[...slug]/route.tsx`** - Dynamic OG image generation for documentation

### Shared Configuration

**`src/lib/layout.shared.tsx`** - Contains `baseOptions()` function that returns shared layout configuration used across different layouts. This is a very large file (25,000+ tokens) containing extensive SVG definitions and configuration.

Key shared options include:
- GitHub URL: `https://github.com/WaykoDev`
- Custom logo SVG
- Navigation title and branding

### Custom Components

Located in `src/components/`:

- **3D Galaxy Components**: Custom React Three Fiber components for animated galaxy backgrounds
  - `Galaxy.tsx` - Main galaxy component with custom shaders
  - `BackgroundGalaxy.tsx` - Wrapper for galaxy background
  - `WhiteGalaxy.tsx` - Alternative white galaxy variant
  - Uses GLSL shaders for particle effects and rotation animations

- **`Intro.tsx`** - Introduction/hero component for landing page
- **`NoScroll.tsx`** - Utility component to disable scrolling
- **`franck-showcase.tsx`** - Custom MDX component (registered in `mdx-components.tsx`)

### MDX Integration

**`src/mdx-components.tsx`** exports `getMDXComponents()` which:
- Extends default Fumadocs UI components
- Registers custom components (e.g., `FranckShowcase`) for use in MDX files
- Can be used to add more custom components to MDX

## TypeScript Configuration

**Path Aliases:**
- `@/*` → `./src/*`
- `@/.source` → `./.source/index.ts` (auto-generated content)

**Important:** The `.source` directory is auto-generated - never edit files in it directly. Edit `source.config.ts` or MDX files in `content/` instead.

## Tech Stack

- **Framework**: Next.js 16 with App Router and React 19
- **Content**: Fumadocs MDX for documentation/blog
- **Styling**: Tailwind CSS v4 with PostCSS
- **3D Graphics**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Language**: TypeScript with strict mode

## Key Development Notes

1. **MDX Content Updates**: After modifying MDX files in `content/`, the `.source` directory regenerates automatically during development. If needed, run `fumadocs-mdx` manually.

2. **3D Components**: Galaxy components use custom GLSL shaders. Shader code is inline within component files (see fragmentShader/vertexShader in Galaxy.tsx).

3. **Layout System**: Multiple layouts inherit from `baseOptions()` in `lib/layout.shared.tsx`. Modify that file to change site-wide navigation/branding.

4. **Search Functionality**: Search is powered by Orama (configured in search route). Content is automatically indexed from the Fumadocs source.

5. **ESLint Config**: Uses Next.js recommended configs with TypeScript support. Ignores `.source/`, `node_modules/`, and build directories.

## Git Information

- **Main branch**: `main`
- **Current branch** (as of session start): `contact-refont`
