# Component Reference Guide

Complete reference for all 22 Svelte components in the Synchronicity Engine app.

---

## Navigation Components

### BottomNav
**File:** `src/lib/components/core/BottomNav.svelte`

5-tab navigation bar with active states and badges.

**Props:** None

**Usage:**
```svelte
<BottomNav />
```

**Features:**
- Automatic active tab highlighting based on `$activeTab` store
- Navigation badges for notifications (Browse: +3)
- Click handlers for route navigation
- Icons: 🏠 Home, 🔍 Browse, ✨ Create, 💎 Tokens, 👤 Profile

**Styling:** Fixed bottom position, cyan active state, hover effects

---

### StatusBar
**File:** `src/lib/components/core/StatusBar.svelte`

Top status bar with time display and optional back button.

**Props:**
```typescript
showBack?: boolean = false
```

**Usage:**
```svelte
<StatusBar />
<StatusBar showBack={true} />
```

**Features:**
- Real-time clock display (updates every minute)
- Optional back button (uses browser history)
- Battery and signal indicators (decorative)

---

## Display Components

### StatCard
**File:** `src/lib/components/core/StatCard.svelte`

Clickable stat display card with icon, value, and label.

**Props:**
```typescript
icon: string              // Emoji icon
value: string | number    // Stat value
label: string            // Stat label
onClick?: () => void     // Optional click handler
```

**Usage:**
```svelte
<StatCard
  icon="💎"
  value={5}
  label="Tokens"
  onClick={() => goto('/tokens')}
/>
```

**Features:**
- Hover transform effect
- Cyan border glow on hover
- Optional click functionality
- Gold-accented value display

---

### TempleHeader
**File:** `src/lib/components/core/TempleHeader.svelte`

Community temple information display.

**Props:**
```typescript
temple: Temple  // Temple data from store
```

**Usage:**
```svelte
<TempleHeader {temple} />
```

**Features:**
- Temple icon and name
- Location display
- Member count
- Gradient background with gold border

---

### CountdownCard
**File:** `src/lib/components/core/CountdownCard.svelte`

Distribution cycle countdown with stats.

**Props:**
```typescript
distribution: Distribution  // Distribution data
```

**Usage:**
```svelte
<CountdownCard {distribution} />
```

**Features:**
- Days until distribution countdown
- Pool amount display
- Total hours and estimated share
- Pulsing moon icon animation
- Progress indicator

---

### SectionTitle
**File:** `src/lib/components/core/SectionTitle.svelte`

Section header with icon and title.

**Props:**
```typescript
icon: string   // Emoji icon
title: string  // Section title
```

**Usage:**
```svelte
<SectionTitle icon="🎯" title="Intentions" />
```

**Features:**
- Cyan uppercase text
- Left-aligned with icon
- Subtle border bottom

---

### EmptyState
**File:** `src/lib/components/core/EmptyState.svelte`

Empty state display with icon, message, and optional CTA.

**Props:**
```typescript
icon?: string = '🔍'
title?: string = 'Nothing found'
message?: string = 'Try adjusting your filters...'
actionText?: string
onAction?: () => void
```

**Usage:**
```svelte
<EmptyState
  icon="💎"
  title="No tokens found"
  message="Start contributing to earn tokens"
  actionText="Browse Intentions"
  onAction={() => goto('/browse')}
/>
```

**Features:**
- Centered layout
- Large icon with opacity
- Optional CTA button
- Conditional rendering

---

### ActivityItem
**File:** `src/lib/components/core/ActivityItem.svelte`

Activity feed item with left border accent.

**Props:**
```typescript
activity: Activity  // Activity data object
```

**Usage:**
```svelte
<ActivityItem {activity} />
```

**Features:**
- Icon, username, and timestamp
- Action text with meta info
- Left border color based on activity type
- Time ago formatting

---

### LoadingSpinner
**File:** `src/lib/components/core/LoadingSpinner.svelte`

Animated loading spinner with optional text.

**Props:**
```typescript
size?: 'small' | 'medium' | 'large' = 'medium'
text?: string
```

**Usage:**
```svelte
<LoadingSpinner />
<LoadingSpinner size="large" text="Loading intentions..." />
```

**Features:**
- Cyan spinning border animation
- Size variants (24px, 40px, 60px)
- Optional loading text
- Glow effect

---

## Card Components

### IntentionCard
**File:** `src/lib/components/core/IntentionCard.svelte`

Intention preview card with stats.

**Props:**
```typescript
intention: Intention      // Intention data
onClick?: () => void     // Click handler
```

**Usage:**
```svelte
<IntentionCard
  {intention}
  onClick={() => goto(`/browse/${intention.intentionId}`)}
/>
```

**Features:**
- Category icon and name
- Title and description (truncated)
- Stats: hours, participants, days active
- Impact level badge (high/medium/low)
- Hover effects with transform
- Click-to-navigate

---

### TokenCard
**File:** `src/lib/components/core/TokenCard.svelte`

Token display card with selection state.

**Props:**
```typescript
token: Token              // Token data
onClick?: () => void     // Click handler
isSelected?: boolean     // Selection state
```

**Usage:**
```svelte
<TokenCard
  {token}
  onClick={() => handleSelect(token.tokenId)}
  isSelected={selectedIds.has(token.tokenId)}
/>
```

**Features:**
- Category icon
- Title and description (2-line truncation)
- Hours display with gold styling
- Status badge (Available/In Bid/Historical)
- Earned date
- Selection highlight state

---

### ConnectionCard
**File:** `src/lib/components/core/ConnectionCard.svelte`

Connection profile card with trust badge.

**Props:**
```typescript
connection: Connection    // Connection data
onClick?: () => void     // Click handler
```

**Usage:**
```svelte
<ConnectionCard
  {connection}
  onClick={() => viewProfile(connection.userId)}
/>
```

**Features:**
- Avatar display
- Name and bio
- Trust level badge (high/medium/low)
- Exchanges completed count
- Last interaction timestamp
- Hover effects

---

### ProfileHeader
**File:** `src/lib/components/core/ProfileHeader.svelte`

User profile header with avatar and info.

**Props:**
```typescript
user: User  // User data object
```

**Usage:**
```svelte
<ProfileHeader {user} />
```

**Features:**
- Large avatar (80px) with pulsing glow
- Name with gold styling
- Role and temple name
- Bio text
- Gradient background

---

## Interactive Components

### ActionButton
**File:** `src/lib/components/core/ActionButton.svelte`

Primary or secondary action button.

**Props:**
```typescript
variant?: 'primary' | 'secondary' = 'primary'
icon?: string
disabled?: boolean = false
fullWidth?: boolean = false
type?: 'button' | 'submit' | 'reset' = 'button'
onClick?: () => void
```

**Usage:**
```svelte
<ActionButton
  variant="primary"
  icon="✨"
  fullWidth={true}
  onClick={handleSubmit}
>
  Create Intention
</ActionButton>

<ActionButton
  type="submit"
  variant="primary"
  disabled={!isValid}
>
  Publish
</ActionButton>
```

**Features:**
- Primary: Cyan background with glow
- Secondary: Gold border with transparent background
- Optional icon (left side)
- Hover transform effect
- Disabled state (50% opacity)
- Full-width option
- Form button types

---

### SearchBar
**File:** `src/lib/components/core/SearchBar.svelte`

Search input with clear button.

**Props:**
```typescript
value?: string = ''
placeholder?: string = 'Search...'
onInput?: (value: string) => void
```

**Usage:**
```svelte
<SearchBar
  value={$searchQuery}
  placeholder="Search intentions..."
  onInput={(val) => searchQuery.set(val)}
/>
```

**Features:**
- Search icon (left)
- Clear button (right, when value exists)
- Focus glow effect
- Reactive value binding
- Callback on input

---

### FilterChips
**File:** `src/lib/components/core/FilterChips.svelte`

Horizontal scrollable category filter chips.

**Props:**
```typescript
activeFilter: FilterCategory
onFilterChange?: (filter: FilterCategory) => void
```

**Usage:**
```svelte
<FilterChips
  activeFilter={$activeFilter}
  onFilterChange={(filter) => activeFilter.set(filter)}
/>
```

**Features:**
- 8 category filters (All + 7 categories)
- Horizontal scroll with styled scrollbar
- Active state highlighting
- Click to filter
- Hover effects

**Categories:**
- All
- Organic Food & Nutrition
- Land Stewardship
- Off-Grid & Sustainable Living
- Health & Vitality
- Community Abundance
- Self & Spiritual Development
- Creative Expression

---

### TokenFilterBar
**File:** `src/lib/components/core/TokenFilterBar.svelte`

4-button token filter system.

**Props:**
```typescript
activeFilter: TokenFilter
onFilterChange?: (filter: TokenFilter) => void
```

**Usage:**
```svelte
<TokenFilterBar
  activeFilter={$activeTokenFilter}
  onFilterChange={(filter) => activeTokenFilter.set(filter)}
/>
```

**Features:**
- 4 filter buttons in grid layout
- Icons: 💎 All, ✨ Available, 🎯 In Bid, 📜 Historical
- Active state with glow
- Responsive grid (2 columns on mobile)

---

### ProfileTabs
**File:** `src/lib/components/core/ProfileTabs.svelte`

4-tab navigation for profile sections.

**Props:**
```typescript
activeTab: ProfileTab
onTabChange?: (tab: ProfileTab) => void
```

**Usage:**
```svelte
<ProfileTabs
  activeTab={currentTab}
  onTabChange={(tab) => currentTab = tab}
/>
```

**Features:**
- 4 tabs: Tokens, Fulfillments, Connections, Settings
- Icons for each tab
- Active state highlighting
- Grid layout (2×2 on mobile)

---

## Form Components

### FormField
**File:** `src/lib/components/core/FormField.svelte`

Text input or textarea with label and character count.

**Props:**
```typescript
label: string
value?: string = ''
placeholder?: string = ''
type?: 'text' | 'textarea' | 'number' = 'text'
required?: boolean = false
disabled?: boolean = false
rows?: number = 4
maxLength?: number
onInput?: (value: string) => void
```

**Usage:**
```svelte
<FormField
  label="Title"
  bind:value={title}
  placeholder="Enter title..."
  required={true}
  maxLength={80}
/>

<FormField
  label="Description"
  type="textarea"
  bind:value={description}
  rows={6}
  maxLength={500}
/>
```

**Features:**
- Required field indicator (*)
- Character count display (when maxLength set)
- Focus glow effect
- Textarea auto-resize
- Disabled state
- Two-way binding support

---

### CategorySelector
**File:** `src/lib/components/core/CategorySelector.svelte`

Visual category selection grid.

**Props:**
```typescript
selectedCategory: FilterCategory | ''
onSelect?: (category: FilterCategory) => void
```

**Usage:**
```svelte
<CategorySelector
  selectedCategory={category}
  onSelect={(cat) => category = cat}
/>
```

**Features:**
- 7 categories in 2-column grid
- Large emoji icons
- Selected state with glow
- Hover effects
- Required field indicator

**Categories:**
- 🌾 Organic Food & Nutrition
- 🌳 Land Stewardship
- ☀️ Off-Grid & Sustainable Living
- 💚 Health & Vitality
- 🤝 Community Abundance
- 🧘 Self & Spiritual Development
- 🎨 Creative Expression

---

### MediaUploader
**File:** `src/lib/components/core/MediaUploader.svelte`

Drag-and-drop media uploader.

**Props:**
```typescript
uploadedFiles?: string[] = []
onUpload?: (files: string[]) => void
```

**Usage:**
```svelte
<MediaUploader
  uploadedFiles={media}
  onUpload={(files) => media = files}
/>
```

**Features:**
- Click to upload
- Drag-and-drop support
- Multiple file selection
- File list display with remove buttons
- IPFS CID simulation (ipfs://Qm...)
- Upload zone with dashed border
- Hover/dragging state

---

### TokenAttachment
**File:** `src/lib/components/core/TokenAttachment.svelte`

Token selection for attaching to intentions.

**Props:**
```typescript
selectedTokenId?: string | null = null
onSelect?: (tokenId: string | null) => void
```

**Usage:**
```svelte
<TokenAttachment
  selectedTokenId={attachedToken}
  onSelect={(id) => attachedToken = id}
/>
```

**Features:**
- Lists available tokens only
- Click to select
- Selected state display with checkmark
- Clear button when selected
- Scrollable token list (max height 200px)
- Empty state for no tokens
- Shows hours and status

---

### DistributionPrep
**File:** `src/lib/components/core/DistributionPrep.svelte`

Distribution preparation section with stats and submission.

**Props:**
```typescript
selectedTokensCount?: number = 0
selectedHours?: number = 0
onPrepareClick?: () => void
```

**Usage:**
```svelte
<DistributionPrep
  selectedTokensCount={selectedIds.size}
  selectedHours={totalHours}
  onPrepareClick={handleSubmit}
/>
```

**Features:**
- Moon icon with pulsing animation
- Distribution countdown
- 3 stat boxes (Available Hours, Pool Amount, Share Multiplier)
- Selection summary (when tokens selected)
- Estimated share calculation
- Info box explaining distribution
- Submit button (disabled until selection)

---

## Component Best Practices

### Import Patterns
```svelte
<script lang="ts">
  import ComponentName from '$components/core/ComponentName.svelte';
  import type { TypeName } from '$types';
</script>
```

### Props Pattern
```svelte
<script lang="ts">
  export let requiredProp: string;
  export let optionalProp: string = 'default';
  export let callback: (() => void) | undefined = undefined;
</script>
```

### Event Handling
```svelte
<!-- Click handler -->
<button on:click={handleClick}>Click Me</button>

<!-- With callback prop -->
<button on:click={onClick}>Click Me</button>

<!-- With inline function -->
<button on:click={() => doSomething()}>Click Me</button>
```

### Conditional Rendering
```svelte
{#if condition}
  <Component />
{:else}
  <OtherComponent />
{/if}
```

### List Rendering
```svelte
{#each items as item (item.id)}
  <Component {item} />
{/each}
```

### Store Subscriptions
```svelte
<script>
  import { myStore } from '$stores/myStore';
</script>

<p>Value: {$myStore}</p>
```

---

## Styling Patterns

### Theme Colors
```css
/* Use theme() function for Tailwind values */
color: theme('colors.cyan.DEFAULT');
border-color: theme('colors.gold.border');
background: theme('colors.bg.deep');
```

### Glow Effects
```css
box-shadow: theme('boxShadow.glow-cyan');
box-shadow: theme('boxShadow.glow-gold');
box-shadow: 0 0 15px theme('colors.cyan.glow');
```

### Animations
```css
/* Pulse glow (already defined globally) */
animation: pulse-glow 2s ease-in-out infinite;

/* Custom spin */
@keyframes spin {
  to { transform: rotate(360deg); }
}
animation: spin 1s linear infinite;
```

### Hover Effects
```css
.component {
  transition: all 0.2s ease;
}

.component:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px theme('colors.cyan.glow');
}
```

---

## Component Composition Examples

### Building a Complete Screen
```svelte
<script lang="ts">
  import StatusBar from '$components/core/StatusBar.svelte';
  import SectionTitle from '$components/core/SectionTitle.svelte';
  import ActionButton from '$components/core/ActionButton.svelte';
  import BottomNav from '$components/core/BottomNav.svelte';
</script>

<div class="min-h-screen pb-24">
  <div class="phone-mockup">
    <div class="screen-content">
      <StatusBar />

      <h1 class="text-gold text-2xl font-bold mb-4">Page Title</h1>

      <SectionTitle icon="🎯" title="Section" />

      <!-- Content here -->

      <ActionButton variant="primary" fullWidth={true}>
        Take Action
      </ActionButton>
    </div>
  </div>

  <BottomNav />
</div>
```

### Form with Validation
```svelte
<script lang="ts">
  import FormField from '$components/core/FormField.svelte';
  import CategorySelector from '$components/core/CategorySelector.svelte';
  import ActionButton from '$components/core/ActionButton.svelte';

  let title = '';
  let category = '';

  $: isValid = title.trim() && category;

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (isValid) {
      // Submit logic
    }
  }
</script>

<form on:submit={handleSubmit}>
  <FormField
    label="Title"
    bind:value={title}
    required={true}
    maxLength={80}
  />

  <CategorySelector
    selectedCategory={category}
    onSelect={(cat) => category = cat}
  />

  <ActionButton
    type="submit"
    variant="primary"
    disabled={!isValid}
  >
    Submit
  </ActionButton>
</form>
```

---

**Total Components:** 22
**Last Updated:** January 2025
**Framework:** SvelteKit 2.0 + TypeScript 5.0
