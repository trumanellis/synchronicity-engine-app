# Layout Primitives Guide - Iteration 1
## Synchronicity Engine Design System

**Status:** ✅ COMPLETE - Phase 1
**Last Updated:** 2025-11-11

---

## Overview

The layout primitives are the foundation of Iteration 1's design system. They guarantee consistent, responsive behavior across all pages by providing a standardized set of building blocks.

---

## Core Principles

1. **Width Constraints Built-In** - All primitives have `width: 100%`, `max-width: 100%`, `box-sizing: border-box`
2. **Flex-Safe** - Row components have `min-width: 0` on children to prevent overflow
3. **Consistent Spacing** - All gaps use standardized scale (xs, sm, md, lg, xl, 2xl)
4. **Composable** - Primitives nest and combine seamlessly
5. **Type-Safe** - All props are strictly typed

---

## The 5 Layout Primitives

### 1. PageContainer

**Purpose:** Root container for all pages

**Props:**
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'xl')
- `padding`: boolean (default: true)
- `className`: string (default: '')

**Max-Width Values:**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1200px
- full: 100%

**Usage:**
```svelte
<PageContainer maxWidth="xl">
  <Stack gap="lg">
    <!-- Page content -->
  </Stack>
</PageContainer>
```

**Responsive Behavior:**
- Desktop (>768px): 1rem padding
- Tablet (≤768px): 0.75rem padding
- Mobile (≤480px): 0.5rem padding

---

### 2. Stack

**Purpose:** Vertical layout with consistent spacing

**Props:**
- `gap`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
- `align`: 'start' | 'center' | 'end' | 'stretch' (default: 'stretch')
- `className`: string (default: '')

**Gap Values:**
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 0.75rem (12px)
- lg: 1rem (16px)
- xl: 1.5rem (24px)
- 2xl: 2rem (32px)

**Usage:**
```svelte
<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

**When to Use:**
- Any vertical list (intention cards, activity feed, etc.)
- Page content sections
- Card internal layouts

---

### 3. Row

**Purpose:** Horizontal layout with proper flex behavior

**Props:**
- `gap`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' (default: 'start')
- `align`: 'start' | 'center' | 'end' | 'stretch' (default: 'center')
- `wrap`: boolean (default: false)
- `className`: string (default: '')

**Critical Feature:**
All children automatically get `min-width: 0` which allows them to shrink below their content size. This prevents the overflow issues that plagued iteration 0.

**Usage:**
```svelte
<Row gap="md" justify="between" wrap={true}>
  <div class="flex-1">Left content</div>
  <button>Action</button>
</Row>
```

**When to Use:**
- Headers with title + action button
- Button groups
- Stat displays (icon + value)
- Any horizontal layout

**Common Patterns:**

**Header with Title + Action:**
```svelte
<Row gap="md" justify="between">
  <SectionTitle>Title can be very long</SectionTitle>
  <select>Sort</select>
</Row>
```

**Button Group:**
```svelte
<Row gap="sm" justify="center">
  <button>Cancel</button>
  <button>Save</button>
</Row>
```

**Icon + Text:**
```svelte
<Row gap="sm" align="center">
  <span>🎯</span>
  <span>High Impact</span>
</Row>
```

---

### 4. Card

**Purpose:** Base card component with variants and states

**Props:**
- `variant`: 'default' | 'highlighted' | 'subtle' (default: 'default')
- `interactive`: boolean (default: false)
- `padding`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string (default: '')

**Variants:**

**Default:**
- Cyan border and background
- Use for standard content cards

**Highlighted:**
- Gold border and background
- Use for important/featured content

**Subtle:**
- Dark background, thin border
- Use for secondary/supporting content

**Interactive State:**
When `interactive={true}`:
- Cursor becomes pointer
- Hover lifts card up 2px
- Hover adds glow shadow
- Focus ring for accessibility

**Usage:**
```svelte
<!-- Basic card -->
<Card variant="default" padding="md">
  <Stack gap="sm">
    <h3>Card Title</h3>
    <p>Card content</p>
  </Stack>
</Card>

<!-- Interactive card (clickable) -->
<Card variant="default" interactive={true} on:click={handleClick}>
  <p>Click me!</p>
</Card>
```

**When to Use:**
- IntentionCard, TokenCard, StatCard
- Any boxed content
- Interactive list items

---

### 5. Section

**Purpose:** Semantic section wrapper with consistent spacing

**Props:**
- `spacing`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string (default: '')

**Spacing Values:**
- sm: 1rem bottom margin
- md: 1.5rem bottom margin
- lg: 2rem bottom margin

**Usage:**
```svelte
<Section spacing="lg">
  <h2>Section Title</h2>
  <Stack gap="md">
    <!-- Section content -->
  </Stack>
</Section>
```

**When to Use:**
- Grouping related page content
- Adding consistent vertical rhythm
- Semantic HTML structure

---

## Common Patterns & Recipes

### Page Layout

```svelte
<PageContainer maxWidth="xl">
  <Stack gap="xl">
    <!-- Header Section -->
    <Section>
      <Stack gap="sm">
        <h1>Page Title</h1>
        <p>Description</p>
      </Stack>
    </Section>

    <!-- Content Section -->
    <Section>
      <Stack gap="md">
        <!-- Content here -->
      </Stack>
    </Section>
  </Stack>
</PageContainer>
```

### Card List

```svelte
<Stack gap="md">
  {#each items as item}
    <Card variant="default" interactive={true} on:click={() => handleClick(item)}>
      <Stack gap="sm">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </Stack>
    </Card>
  {/each}
</Stack>
```

### Header with Actions

```svelte
<Row gap="md" justify="between" wrap={true}>
  <Row gap="sm" align="center" className="flex-1">
    <span class="icon">🎯</span>
    <h2>Section Title</h2>
  </Row>
  <Row gap="sm">
    <button>Action 1</button>
    <button>Action 2</button>
  </Row>
</Row>
```

### Stats Row

```svelte
<Row gap="lg" justify="around">
  <Row gap="sm" align="center">
    <span>⏱️</span>
    <span>24h</span>
  </Row>
  <Row gap="sm" align="center">
    <span>👥</span>
    <span>12</span>
  </Row>
  <Row gap="sm" align="center">
    <span>🎯</span>
    <span>High</span>
  </Row>
</Row>
```

### Card with Icon Header

```svelte
<Card variant="default" padding="md">
  <Stack gap="md">
    <!-- Header Row -->
    <Row gap="md" align="start">
      <div class="icon-large">🌱</div>
      <Stack gap="xs" className="flex-1">
        <h3>Title</h3>
        <p>Description</p>
      </Stack>
    </Row>

    <!-- Footer Row -->
    <Row gap="lg" justify="between">
      <span>Info 1</span>
      <span>Info 2</span>
      <span>Info 3</span>
    </Row>
  </Stack>
</Card>
```

---

## Migration Guide

### Before (Iteration 0)

```svelte
<!-- Custom CSS, prone to breaking -->
<div class="intentions-list">
  {#each intentions as intention}
    <div class="intention-card">
      <div class="card-header">
        <div class="card-icon">🌱</div>
        <div class="card-content">
          <h3>{intention.title}</h3>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .intentions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    /* Missing width constraints! */
  }

  .card-header {
    display: flex;
    gap: 0.75rem;
    /* Missing min-width: 0! */
  }
</style>
```

### After (Iteration 1)

```svelte
<!-- No custom CSS needed! -->
<Stack gap="md">
  {#each intentions as intention}
    <Card variant="default" interactive={true}>
      <Row gap="md" align="start">
        <div class="icon">🌱</div>
        <Stack gap="xs" className="flex-1">
          <h3>{intention.title}</h3>
        </Stack>
      </Row>
    </Card>
  {/each}
</Stack>

<!-- Width constraints and min-width: 0 built-in! -->
```

---

## Testing Checklist

When using layout primitives, verify:

- [ ] No horizontal scroll at 360px
- [ ] No horizontal scroll at 480px
- [ ] No horizontal scroll at 768px
- [ ] No horizontal scroll at 1024px
- [ ] Content is readable at all sizes
- [ ] Interactive elements (hover, focus) work
- [ ] Spacing is consistent
- [ ] Text truncates properly in Row components

---

## Best Practices

### DO:

✅ Use Stack for all vertical layouts
✅ Use Row for all horizontal layouts
✅ Compose primitives (Stack inside Card, etc.)
✅ Use consistent gap values (prefer md/lg)
✅ Let primitives handle width constraints
✅ Use semantic HTML inside primitives

### DON'T:

❌ Write custom flex CSS in pages
❌ Add explicit widths to primitive children
❌ Nest primitives more than 3 levels deep
❌ Override primitive styles with !important
❌ Use primitives for complex grids (build GridLayout if needed)

---

## Test Page

Visit `/test-primitives` to see all primitives in action and verify responsive behavior.

The test page includes:
- Examples of all 5 primitives
- Width constraint tests
- Composition examples
- Long text overflow tests
- Responsive breakpoint display

---

## Next Steps

**Phase 2:** Rebuild core components using these primitives:
1. IntentionCard (using Card + Stack + Row)
2. SearchBar (using Row)
3. FilterChips (using Row)
4. SectionTitle (using Row)
5. StatCard (using Card + Stack)
6. ActionButton (standardize)

See `iteration-1-migration-plan.md` for full roadmap.

---

**Version:** 1.0
**Status:** ✅ Phase 1 Complete
