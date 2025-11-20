# Tasks: 3D Hover Effect on Article Headers

**Feature**: 002-feature-3d-hover-effect
**Created**: 2025-11-20
**Estimated Total Time**: 2-3 hours

## Task Breakdown

### Phase 1: Setup & Investigation (15 min)

- [ ] **T001**: Review current article header implementation
  - File: `src/app/blog/[...slug]/page.tsx` lines 26-47
  - Understand current structure and styling
  - Identify where to add event handlers
  - **Time**: 10 min

- [ ] **T002**: Test browser compatibility for CSS transforms
  - Open Chrome DevTools and test perspective transforms
  - Verify `prefers-reduced-motion` media query support
  - **Time**: 5 min

### Phase 2: Core Implementation (45-60 min)

- [ ] **T003**: Convert header component to use client-side React
  - Add `'use client'` directive if needed
  - Import `useState` from React
  - **Time**: 5 min
  - **Depends on**: T001

- [ ] **T004**: Implement mouse move handler logic
  - Create `handleMouseMove` function
  - Calculate rotation angles from mouse position
  - Add viewport size check (>= 1024px)
  - Add `prefers-reduced-motion` check
  - **Time**: 20 min
  - **Depends on**: T003

- [ ] **T005**: Implement mouse leave handler
  - Create `handleMouseLeave` function
  - Reset transform to default state
  - **Time**: 5 min
  - **Depends on**: T003

- [ ] **T006**: Add transform state management
  - Create state for transform value
  - Initialize with default perspective
  - **Time**: 5 min
  - **Depends on**: T003

- [ ] **T007**: Attach event handlers to header element
  - Add `onMouseMove={handleMouseMove}`
  - Add `onMouseLeave={handleMouseLeave}`
  - Add `style={{ transform }}`
  - Add transition class for smooth animation
  - **Time**: 10 min
  - **Depends on**: T004, T005, T006

- [ ] **T008**: Fine-tune rotation limits and transition timing
  - Adjust max rotation angles (currently ±10deg)
  - Adjust transition duration (currently 0.1s)
  - Test for optimal feel
  - **Time**: 15 min
  - **Depends on**: T007

### Phase 3: Testing & Validation (30-45 min)

- [ ] **T009**: Test on desktop browsers
  - Chrome: Verify smooth 60fps performance
  - Firefox: Verify effect works correctly
  - Safari: Verify effect works correctly
  - Edge: Verify effect works correctly
  - **Time**: 15 min
  - **Depends on**: T008

- [ ] **T010**: Test responsive behavior
  - Viewport 375px: Verify effect is disabled
  - Viewport 768px: Verify effect is disabled
  - Viewport 1024px: Verify effect is enabled
  - **Time**: 10 min
  - **Depends on**: T008

- [ ] **T011**: Test accessibility
  - Enable `prefers-reduced-motion` in Chrome DevTools
  - Verify effect is completely disabled
  - Test keyboard navigation (no effect should trigger)
  - **Time**: 10 min
  - **Depends on**: T008

- [ ] **T012**: Test dark mode compatibility
  - Switch to dark mode
  - Verify effect works identically
  - Check for visual artifacts
  - **Time**: 5 min
  - **Depends on**: T008

### Phase 4: Polish & Documentation (15-20 min)

- [ ] **T013**: Performance optimization check
  - Open Chrome DevTools Performance panel
  - Record interaction with effect
  - Verify consistent 60fps
  - Optimize if needed (requestAnimationFrame, debouncing)
  - **Time**: 10 min
  - **Depends on**: T009

- [ ] **T014**: Add code comments
  - Document the rotation calculation logic
  - Explain accessibility checks
  - Add inline comments for maintainability
  - **Time**: 5 min
  - **Depends on**: T013

- [ ] **T015**: Update backlog status
  - Mark F001 as completed in backlog.md
  - Add completion notes
  - **Time**: 2 min
  - **Depends on**: T014

- [ ] **T016**: Commit changes
  - Create descriptive commit message
  - Include before/after behavior
  - **Time**: 3 min
  - **Depends on**: T015

## Execution Strategy

### Sequential Tasks
All tasks should be executed in order as they have dependencies.

### Critical Path
T001 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T013 → T016

### Optional Enhancements (Future)
- Create reusable `useMouseParallax` hook
- Add subtle glow/shine effect that follows mouse
- Animate in 3D on page load
- Add sound effects (subtle click/hover sounds)

## Progress Tracking

**Total Tasks**: 16
**Completed**: 0
**In Progress**: 0
**Blocked**: 0

## Notes

- Keep rotation angles subtle (±10deg max) to maintain readability
- Prioritize performance - effect must be 60fps on desktop
- Ensure graceful degradation on unsupported browsers
- Test with real users to gauge if effect is too distracting

---

**Created**: 2025-11-20
**Last Updated**: 2025-11-20
