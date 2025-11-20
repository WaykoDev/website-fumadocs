# Feature Specification: 3D Hover Effect on Article Headers

**Feature Branch**: `002-feature-3d-hover-effect`
**Created**: 2025-11-20
**Status**: Draft
**Priority**: P3 (Enhancement)
**Estimated Time**: 2-3 hours

## Overview

Add an interactive 3D perspective effect to blog article headers that responds to mouse movement, creating an engaging and modern visual experience for desktop users.

## User Scenarios & Testing

### User Story 1 - Interactive Header on Desktop (Priority: P1)

As a desktop blog reader, when I move my mouse over an article header, I want to see a subtle 3D tilt effect that follows my cursor, so that the reading experience feels more interactive and engaging.

**Why this priority**: Core functionality - the primary value proposition of this feature.

**Independent Test**: Can be fully tested by hovering mouse over article headers on desktop and observing the 3D rotation effect. Delivers immediate visual feedback and enhanced UX.

**Acceptance Scenarios**:

1. **Given** I am on a blog article page on desktop, **When** I move my mouse over the article header, **Then** the header should tilt in 3D following my mouse position with smooth transitions
2. **Given** I am hovering over the article header, **When** I move my mouse to the top-left corner, **Then** the header should rotate with perspective (positive rotateY, negative rotateX)
3. **Given** I am hovering over the article header, **When** I move my mouse away from the header, **Then** the header should smoothly reset to its original position (0deg rotation)
4. **Given** I am on a blog article, **When** the page loads, **Then** the header should be in its default state without any rotation applied

---

### User Story 2 - Accessibility & Performance (Priority: P2)

As a user with motion sensitivity preferences or on a mobile device, I want the 3D effect to be disabled automatically, so that my browsing experience remains comfortable and performant.

**Why this priority**: Essential for accessibility and mobile UX - prevents motion sickness and performance issues.

**Independent Test**: Can be tested by enabling `prefers-reduced-motion` in browser settings or viewing on mobile device. The effect should be completely disabled.

**Acceptance Scenarios**:

1. **Given** I have `prefers-reduced-motion: reduce` enabled in my browser, **When** I hover over an article header, **Then** no 3D rotation effect should be applied
2. **Given** I am viewing the blog on a mobile or tablet device (viewport < 1024px), **When** I interact with the article header, **Then** no 3D effect should be triggered
3. **Given** I am on a desktop without motion preferences set, **When** I hover over the header, **Then** the effect should perform smoothly at 60fps with no frame drops

---

### User Story 3 - Dark Mode Compatibility (Priority: P3)

As a user viewing the blog in dark mode, I want the 3D hover effect to work seamlessly without visual artifacts, so that the experience is consistent across both themes.

**Why this priority**: Nice to have - ensures visual consistency but doesn't affect core functionality.

**Independent Test**: Switch to dark mode and test the hover effect. Visual appearance should be equally smooth.

**Acceptance Scenarios**:

1. **Given** I am viewing the blog in dark mode, **When** I hover over an article header, **Then** the 3D effect should work identically to light mode with proper shadow/highlight rendering

---

### Edge Cases

- What happens when user rapidly moves mouse in/out of header? → Effect should remain smooth with proper cleanup
- What happens on browsers without CSS transform support? → Graceful degradation, no effect applied
- What happens with very long article titles that wrap multiple lines? → Effect still works, entire header block rotates as unit
- What happens if user uses keyboard navigation? → No effect triggered (hover-only)

## Requirements

### Functional Requirements

- **FR-001**: System MUST apply 3D perspective rotation to article headers based on mouse position (desktop only)
- **FR-002**: System MUST calculate rotation angles dynamically: rotateX = ((mouseY - centerY) / centerY) * -10deg, rotateY = ((mouseX - centerX) / centerX) * 10deg
- **FR-003**: System MUST reset rotation to 0deg when mouse leaves the header area
- **FR-004**: System MUST disable the effect on viewports < 1024px (mobile/tablet)
- **FR-005**: System MUST respect `prefers-reduced-motion` media query and disable effect when set to "reduce"
- **FR-006**: System MUST apply smooth transitions (transform transition ~0.1s ease-out) for fluid animation
- **FR-007**: System MUST use perspective(1000px) for consistent 3D depth
- **FR-008**: System MUST limit rotation to maximum ±10deg on both axes to maintain readability

### Non-Functional Requirements

- **NFR-001**: Effect MUST perform at 60fps on modern desktop browsers (Chrome, Firefox, Safari, Edge)
- **NFR-002**: Effect SHOULD use CSS transforms (GPU-accelerated) for optimal performance
- **NFR-003**: Implementation SHOULD be reusable (custom hook or component) for future features
- **NFR-004**: Code MUST be TypeScript-typed with proper event handler types

### Key Entities

- **ArticleHeader**: The header section of blog articles (lines 26-47 in `src/app/blog/[...slug]/page.tsx`) containing title, description, metadata, and tags
- **Mouse3DEffect**: Custom React hook or component managing mouse tracking, rotation calculation, and transform application

## Success Criteria

### Measurable Outcomes

- **SC-001**: Desktop users can see a visible 3D tilt effect (±10deg max rotation) when hovering over article headers
- **SC-002**: Effect performs at 60fps on desktop (measured via Chrome DevTools Performance panel)
- **SC-003**: Effect is completely disabled on mobile/tablet viewports (< 1024px)
- **SC-004**: Effect is completely disabled when `prefers-reduced-motion: reduce` is set
- **SC-005**: Rotation resets smoothly to 0deg within 0.1s when mouse leaves header
- **SC-006**: No console errors or warnings during effect execution
- **SC-007**: Effect works identically in both light and dark modes

## Technical Approach

### Implementation Strategy

**Option A: Inline Event Handlers (Recommended for MVP)**
- Add `onMouseMove` and `onMouseLeave` handlers directly to header element
- Calculate rotation inline with state
- Pros: Simple, fast to implement
- Cons: Less reusable

**Option B: Custom Hook (Recommended for Production)**
- Create `useMouseParallax` hook
- Returns event handlers and transform style
- Pros: Reusable, testable, clean separation
- Cons: Slightly more complex

**Chosen Approach**: Start with Option A for MVP, refactor to Option B if reusability needed.

### Files to Modify

1. **Primary**: `src/app/blog/[...slug]/page.tsx` (lines 26-47)
   - Add mouse event handlers to header section
   - Add state for rotation values
   - Apply transform style

2. **Optional**: `src/hooks/useMouseParallax.ts` (new file)
   - If creating reusable hook

### Code Structure

```tsx
// Example implementation in page.tsx
'use client';

import { useState } from 'react';

const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  // Check if desktop and motion allowed
  if (window.innerWidth < 1024) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
};

const handleMouseLeave = () => {
  setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
};

// In JSX:
<header
  className="relative w-full py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 mb-6 sm:mb-8 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-transparent border-b border-violet-500/20 transition-transform duration-100 ease-out"
  style={{ transform }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  {/* existing header content */}
</header>
```

## Testing Plan

### Manual Testing Checklist

- [ ] Desktop Chrome: Hover effect works smoothly
- [ ] Desktop Firefox: Hover effect works smoothly
- [ ] Desktop Safari: Hover effect works smoothly
- [ ] Desktop Edge: Hover effect works smoothly
- [ ] Mobile viewport (375px): Effect is disabled
- [ ] Tablet viewport (768px): Effect is disabled
- [ ] `prefers-reduced-motion: reduce`: Effect is disabled
- [ ] Dark mode: Effect works identically to light mode
- [ ] Rapid mouse movement: No visual glitches
- [ ] Performance: 60fps confirmed in DevTools

### Automated Testing (Future)

- Unit test for rotation calculation logic
- Integration test for event handler binding
- Accessibility test for motion preferences

## Dependencies

- None - uses only React built-in hooks and CSS transforms

## References

- [MDN: CSS perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
- [MDN: CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [React: Event Handlers](https://react.dev/learn/responding-to-events)

## Implementation Tasks

See `specs/002-feature-3d-hover-effect/tasks.md` for detailed task breakdown.

---

**Last Updated**: 2025-11-20
**Next Review**: After MVP implementation
