# Iteration 1 Migration Plan
## Synchronicity Engine - Architectural Redesign

**Date:** 2025-11-11
**Status:** PLANNING
**Goal:** Build a centralized, consistent, responsive design system

---

## Executive Summary

Iteration 0 has inconsistent responsive behavior, particularly on the browse page. Multiple attempts to fix width constraints have failed, indicating a deeper architectural problem. Iteration 1 will rebuild the app from scratch with a centralized component system that guarantees consistency across all pages.

---

## Iteration 0: Current State Analysis

### Architecture Audit

**Total Components:** 31 Svelte files
- **Pages:** 7 routes
- **Core Components:** 23 components
- **Layouts:** 1 root layout (+layout.svelte)

### Pain Points Identified

#### 1. **Inconsistent CSS Patterns**
- Some pages use inline Tailwind classes (`flex flex-col gap-4`)
- Other pages use custom CSS classes (`.intentions-list`)
- No clear standard for when to use which approach

#### 2. **Mixed Responsive Strategies**
- Global responsive breakpoints in `app.css` (768px, 480px, 360px)
- Component-level media queries scattered throughout
- No consistent container width constraints
- Multiple components missing `box-sizing: border-box`

#### 3. **Flex Layout Issues**
- Missing `min-width: 0` on flex children causing overflow
- Inconsistent use of `flex: 1` vs explicit widths
- No standardized flex container patterns

#### 4. **Component Independence**
- Each component defines its own responsive behavior
- No shared layout primitives
- Difficult to maintain consistency when updating one component

#### 5. **Browse Page Specific Issues**
- SearchBar, FilterChips, SectionTitle, IntentionCard all had width issues
- Even after fixes, still broken (indicating systemic problem)
- No page-level container managing child widths

### What Works in Iteration 0

1. **Design System Colors** - Theme is well-defined in `tailwind.config.js`
2. **Component Modularity** - Good separation of concerns
3. **Type Safety** - Strong TypeScript types throughout
4. **Store Architecture** - Svelte stores work well
5. **Mock Data** - Good data structure foundation

---

## Iteration 1: Proposed Architecture

### Core Principles

1. **Layout-First Design** - Build layout primitives that all pages use
2. **Constraint-Based Responsive** - Use container queries and explicit constraints
3. **Single Source of Truth** - One place for responsive breakpoints and patterns
4. **Composition Over Customization** - Build with standardized building blocks
5. **Progressive Enhancement** - Mobile-first, scale up to desktop

### New Component Hierarchy

```
┌─────────────────────────────────────────┐
│          Root Layout                    │
│  ├─ Global Styles (app.css)            │
│  ├─ Theme Provider                      │
│  └─ Error Boundaries                    │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│      Page Layout Components             │
│  ├─ PageContainer (max-width, padding)  │
│  ├─ PageHeader                          │
│  ├─ PageContent                         │
│  └─ PageFooter (BottomNav)              │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│      Section Components                 │
│  ├─ Section (spacing, width)            │
│  ├─ SectionHeader (title, actions)      │
│  ├─ SectionContent                      │
│  └─ SectionGrid/List/Stack              │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│      Primitive Components               │
│  ├─ Stack (vertical spacing)            │
│  ├─ Row (horizontal layout)             │
│  ├─ Grid (responsive grid)              │
│  ├─ Card (base card container)          │
│  └─ Text (typography presets)           │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│      Feature Components                 │
│  ├─ IntentionCard (uses Card)           │
│  ├─ TokenCard (uses Card)               │
│  ├─ SearchBar (uses Row)                │
│  ├─ FilterChips (uses Row + Stack)      │
│  └─ StatCard (uses Card)                │
└─────────────────────────────────────────┘
```

---

## New Component Specifications

### 1. Layout Primitives

#### `PageContainer.svelte`
**Purpose:** Root container for all pages, handles max-width and responsive padding

```svelte
<script lang="ts">
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'xl';
  export let padding: boolean = true;
</script>

<div class="page-container" data-max-width={maxWidth} data-padding={padding}>
  <slot />
</div>

<style>
  .page-container {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .page-container[data-max-width="sm"] { max-width: 640px; }
  .page-container[data-max-width="md"] { max-width: 768px; }
  .page-container[data-max-width="lg"] { max-width: 1024px; }
  .page-container[data-max-width="xl"] { max-width: 1200px; }
  .page-container[data-max-width="full"] { max-width: 100%; }

  .page-container[data-padding="true"] {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .page-container[data-padding="true"] {
      padding: 0.75rem;
    }
  }
</style>
```

#### `Stack.svelte`
**Purpose:** Vertical layout with consistent spacing

```svelte
<script lang="ts">
  export let gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
</script>

<div class="stack" data-gap={gap} data-align={align}>
  <slot />
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .stack[data-gap="xs"] { gap: 0.25rem; }
  .stack[data-gap="sm"] { gap: 0.5rem; }
  .stack[data-gap="md"] { gap: 0.75rem; }
  .stack[data-gap="lg"] { gap: 1rem; }
  .stack[data-gap="xl"] { gap: 1.5rem; }

  .stack[data-align="start"] { align-items: flex-start; }
  .stack[data-align="center"] { align-items: center; }
  .stack[data-align="end"] { align-items: flex-end; }
  .stack[data-align="stretch"] { align-items: stretch; }
</style>
```

#### `Row.svelte`
**Purpose:** Horizontal layout with responsive wrapping

```svelte
<script lang="ts">
  export let gap: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  export let justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start';
  export let align: 'start' | 'center' | 'end' = 'center';
  export let wrap: boolean = false;
</script>

<div class="row" data-gap={gap} data-justify={justify} data-align={align} data-wrap={wrap}>
  <slot />
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .row[data-gap="xs"] { gap: 0.25rem; }
  .row[data-gap="sm"] { gap: 0.5rem; }
  .row[data-gap="md"] { gap: 0.75rem; }
  .row[data-gap="lg"] { gap: 1rem; }

  .row[data-justify="start"] { justify-content: flex-start; }
  .row[data-justify="center"] { justify-content: center; }
  .row[data-justify="end"] { justify-content: flex-end; }
  .row[data-justify="between"] { justify-content: space-between; }
  .row[data-justify="around"] { justify-content: space-around; }

  .row[data-align="start"] { align-items: flex-start; }
  .row[data-align="center"] { align-items: center; }
  .row[data-align="end"] { align-items: flex-end; }

  .row[data-wrap="true"] { flex-wrap: wrap; }

  /* Critical: Allow children to shrink */
  .row > * {
    min-width: 0;
  }
</style>
```

#### `Card.svelte`
**Purpose:** Base card component for all card-based UI

```svelte
<script lang="ts">
  export let variant: 'default' | 'highlighted' | 'subtle' = 'default';
  export let interactive: boolean = false;
  export let padding: 'sm' | 'md' | 'lg' = 'md';
</script>

<div
  class="card"
  data-variant={variant}
  data-interactive={interactive}
  data-padding={padding}
  role={interactive ? 'button' : undefined}
  tabindex={interactive ? 0 : undefined}
  on:click
  on:keypress
>
  <slot />
</div>

<style>
  .card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }

  .card[data-padding="sm"] { padding: 0.75rem; }
  .card[data-padding="md"] { padding: 1rem; }
  .card[data-padding="lg"] { padding: 1.25rem; }

  /* Variants */
  .card[data-variant="default"] {
    background: theme('colors.cyan.bg');
    border: 2px solid theme('colors.cyan.border');
  }

  .card[data-variant="highlighted"] {
    background: theme('colors.gold.bg');
    border: 2px solid theme('colors.gold.border');
  }

  .card[data-variant="subtle"] {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid theme('colors.cyan.border');
  }

  /* Interactive states */
  .card[data-interactive="true"] {
    cursor: pointer;
  }

  .card[data-interactive="true"]:hover {
    transform: translateY(-2px);
    box-shadow: theme('boxShadow.glow-cyan');
  }

  .card[data-variant="default"][data-interactive="true"]:hover {
    border-color: theme('colors.cyan.DEFAULT');
  }
</style>
```

---

## Migration Strategy

### Phase 1: Build Foundation (Days 1-2)

**Goal:** Create core layout primitives without touching existing pages

1. ✅ Create `docs/architecture/iteration-1-migration-plan.md` (this document)
2. Create `src/lib/components/layout/` directory
3. Build and test primitive components:
   - `PageContainer.svelte`
   - `Stack.svelte`
   - `Row.svelte`
   - `Card.svelte`
   - `Section.svelte`
4. Create component documentation with examples
5. Create test page to verify all primitives work responsively

**Deliverable:** Working layout primitive library

### Phase 2: Rebuild Core Components (Days 3-4)

**Goal:** Rebuild 5-6 most-used components using new primitives

Priority components to rebuild:
1. `IntentionCard` → Use `Card` + `Stack` + `Row`
2. `SearchBar` → Use `Row` + proper constraints
3. `FilterChips` → Use `Row` with overflow scroll
4. `SectionTitle` → Use `Row` with proper text truncation
5. `StatCard` → Use `Card` base
6. `ActionButton` → Standardize sizing and behavior

**Approach:**
- Keep iteration 0 components (rename with `_v0` suffix)
- Build iteration 1 versions side-by-side
- Test in isolation before integrating

**Deliverable:** 6 rebuilt core components

### Phase 3: Migrate Home Page (Day 5)

**Goal:** Prove the system works by migrating simplest page first

1. Create `src/routes/home_v1/+page.svelte`
2. Rebuild using new layout primitives
3. Compare side-by-side with iteration 0
4. Test responsive behavior thoroughly
5. If successful, replace `home/+page.svelte`

**Success Criteria:**
- ✅ Works at 360px, 480px, 768px, 1024px, 1200px
- ✅ No horizontal scroll at any width
- ✅ Consistent spacing throughout
- ✅ Matches iteration 0 visually

### Phase 4: Migrate Browse Page (Days 6-7)

**Goal:** Tackle the most problematic page with new system

1. Create `src/routes/browse_v1/+page.svelte`
2. Rebuild using:
   - `PageContainer` for root layout
   - `Stack` for vertical sections
   - `Row` for header with SectionTitle + sort dropdown
   - Updated `SearchBar`, `FilterChips`, `IntentionCard`
3. Test at all breakpoints
4. Compare with iteration 0
5. Replace if successful

**Key Differences from Iteration 0:**
- No custom CSS in page file
- All layout via primitives
- Guaranteed width constraints
- Consistent spacing

### Phase 5: Migrate Remaining Pages (Days 8-10)

**Goal:** Complete migration of all pages

Order of migration:
1. Tokens page
2. Profile page
3. Create page
4. Browse detail page

**For each page:**
- Create `_v1` version
- Test thoroughly
- Replace iteration 0 version
- Document any new patterns

### Phase 6: Cleanup & Documentation (Day 11)

**Goal:** Remove iteration 0 code and document the system

1. Delete all `_v0` components
2. Update component documentation
3. Create design system guide
4. Add responsive testing checklist
5. Document component usage patterns

---

## Responsive Breakpoints (Standardized)

```css
/* Mobile First Approach */

/* Extra Small: 320px - 479px */
/* Base styles - no media query needed */

/* Small: 480px - 767px */
@media (min-width: 480px) {
  /* Slightly larger typography, more padding */
}

/* Medium: 768px - 1023px */
@media (min-width: 768px) {
  /* Tablet layouts, multi-column grids */
}

/* Large: 1024px+ */
@media (min-width: 1024px) {
  /* Desktop layouts, max-width containers */
}
```

---

## Design System Rules

### CSS Guidelines

1. **All components must have:**
   - `width: 100%`
   - `max-width: 100%`
   - `box-sizing: border-box`

2. **Flex children must have:**
   - `min-width: 0` (allows shrinking below content size)

3. **No hardcoded colors:**
   - Always use `theme()` functions
   - Reference `tailwind.config.js`

4. **Spacing scale:**
   - xs: 0.25rem (4px)
   - sm: 0.5rem (8px)
   - md: 0.75rem (12px)
   - lg: 1rem (16px)
   - xl: 1.5rem (24px)
   - 2xl: 2rem (32px)

5. **Typography scale:**
   - xs: 0.75rem
   - sm: 0.875rem
   - base: 1rem
   - lg: 1.125rem
   - xl: 1.25rem
   - 2xl: 1.5rem

### Component Guidelines

1. **Layout primitives (`Stack`, `Row`, `Card`):**
   - Never have custom styling in pages
   - Handle all width constraints internally
   - Provide consistent API via props

2. **Feature components (`IntentionCard`, `TokenCard`):**
   - Compose from layout primitives
   - Can have custom styling
   - Must still respect width constraints

3. **Page components:**
   - Use `PageContainer` as root
   - Compose with `Stack` for vertical layout
   - No custom layout CSS

---

## Testing Strategy

### Responsive Testing Checklist

For every page and component:

- [ ] Test at 360px (iPhone SE)
- [ ] Test at 414px (iPhone Pro Max)
- [ ] Test at 768px (iPad)
- [ ] Test at 1024px (iPad Pro)
- [ ] Test at 1200px (Desktop)
- [ ] Test at 1920px (Large Desktop)

### Visual Regression Testing

1. Take screenshots of iteration 0 at all breakpoints
2. Compare iteration 1 screenshots
3. Ensure visual parity (or intentional improvements)

### Browser Testing

- Chrome (primary)
- Safari (iOS testing)
- Firefox

---

## Success Metrics

Iteration 1 is successful if:

1. ✅ **Zero horizontal scroll** at any breakpoint on any page
2. ✅ **Consistent spacing** - All pages use same gap values
3. ✅ **Component reusability** - Pages share layout primitives
4. ✅ **Easy maintenance** - Fixing one component fixes all usages
5. ✅ **Type safety** - All props are typed correctly
6. ✅ **Performance** - No regression from iteration 0
7. ✅ **Visual match** - Looks identical (or better) than iteration 0

---

## Risk Assessment

### High Risk
- **Migration time** - Could take 10+ days
- **Regressions** - Breaking working features during migration
- **Scope creep** - Temptation to redesign everything

### Medium Risk
- **Component API changes** - Existing code may break
- **Learning curve** - New patterns to learn

### Low Risk
- **Technical feasibility** - Svelte supports this architecture
- **Browser compatibility** - Using standard CSS

### Mitigation Strategies

1. **Keep iteration 0 intact** - Always have rollback option
2. **Migrate incrementally** - One page at a time
3. **Test thoroughly** - Responsive testing at every step
4. **Document everything** - Clear migration guides
5. **Set time box** - If migration takes > 2 weeks, reassess

---

## Next Steps

1. **Review this plan** with team/user
2. **Get approval** to proceed with iteration 1
3. **Start Phase 1** - Build layout primitives
4. **Set up testing environment** - Screenshot comparison
5. **Begin migration** - Follow phased approach

---

## Appendix: Component Mapping

### Iteration 0 → Iteration 1 Component Changes

| Iteration 0 Component | Iteration 1 Approach | Changes |
|-----------------------|----------------------|---------|
| IntentionCard | `Card` + `Stack` + `Row` | Compose from primitives |
| TokenCard | `Card` + `Stack` + `Row` | Compose from primitives |
| SearchBar | `Row` + inputs | Use Row for layout |
| FilterChips | `Row` (overflow) | Use Row with scroll |
| SectionTitle | `Row` + `Text` | Proper text truncation |
| StatCard | `Card` + content | Use Card base |
| ActionButton | Enhanced button | Standardize sizing |
| ActivityItem | `Card` + `Stack` | Compose from primitives |
| EmptyState | `Stack` + `Text` | Center with Stack |
| BottomNav | Keep as-is | Already works well |

---

**Document Version:** 1.0
**Last Updated:** 2025-11-11
**Status:** AWAITING APPROVAL
