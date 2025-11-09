# Synchronicity Engine - Mock App

A fully navigable P2P gift economy prototype built with SvelteKit, TypeScript, and Tailwind CSS.

## 🎯 Overview

**Synchronicity Engine** is a peer-to-peer gift economy platform where community attention becomes economic value through token-based monthly distributions. This mock app demonstrates the complete user experience with realistic data and full navigation.

### Core Concept

1. **Community Intentions** - Members post needs and dreams
2. **Attention Flow** - Focus on intentions accumulates as hours
3. **Service & Proof** - Fulfill intentions, post proof, earn tokens
4. **Token Value** - Tokens represent community gratitude (hours)
5. **Monthly Distribution** - Pool flows proportionally to token holders
6. **Economic Loop** - More attention → More service → More tokens → Bigger share

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (with npm)
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run check     # Run TypeScript checks
npm run lint      # Lint code
npm run format    # Format code with Prettier
```

## 📁 Project Structure

```
app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── core/          # Reusable UI components
│   │   │   ├── layouts/       # Layout components
│   │   │   └── screens/       # Screen-specific components
│   │   ├── stores/            # Svelte stores (state management)
│   │   ├── data/              # Mock data service
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Helper functions
│   ├── routes/                # SvelteKit file-based routing
│   │   ├── home/              # Dashboard
│   │   ├── browse/            # Intentions feed
│   │   ├── create/            # Create intention
│   │   ├── tokens/            # Token wallet
│   │   └── profile/           # User profile
│   ├── app.html               # HTML template
│   ├── app.css                # Global styles
│   └── +layout.svelte         # Root layout
├── static/                    # Static assets
├── docs/                      # Documentation
├── package.json
├── svelte.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Design System

### Colors

- **Cyan (#00FFD1)** - Interactive elements, pathways
- **Gold (#D4AF37)** - Value displays, achievements
- **Sage Green (#84A98C)** - Context, metadata
- **Cream (#F7F3E9)** - Body text
- **Backgrounds** - Layered darkness (#0a0e0f → #1a2e2e → #0f1f1f)

### Typography

- **Font**: Exo (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Component Patterns

- **Glowing Neon Frame** - Animated cyan border around entire app (desktop & mobile)
- **Responsive Container** - Fills viewport on desktop (max 1200px), full screen on mobile
- **Phone Mockup** - Subtle cyan border with glow effect
- **Status Bar** - Time, app context, navigation
- **Bottom Nav** - 5 tabs (Home, Browse, Create, Tokens, Profile)
- **Stats Grid** - 2-4 column responsive layout with gold values
- **Activity Feed** - Left border accent, scrollable
- **Token Cards** - Horizontal layout with hour badges

## 📊 Mock Data

The app includes comprehensive mock data based on the Synchronicity Engine specifications:

### Available Data Entities

- **User Profile** - Dr. Truman Ellis with 156h tokens, 34 connections
- **Temple** - Templo da Água Lila with 247 members, $47,250 monthly pool
- **Intentions** - 4 active intentions (Garden Infrastructure, Eucalyptus Removal, etc.)
- **Tokens** - 2 user tokens (16h Timber Framing, 6h Irrigation Consultation)
- **Distribution** - November 2025 New Moon cycle (3 days remaining)
- **Activity Feed** - Recent events and fulfillments
- **Connections** - 2 high-trust connections
- **Group Chats** - Intention coordination messages

### Data Location

All mock data is in `src/lib/data/mockData.ts` with helper functions for:
- Getting intentions/tokens by ID
- Filtering available tokens
- Calculating estimated distribution shares
- Formatting time and currency

## 🗺️ Navigation Structure

### Bottom Navigation (Always Visible)

```
[🏠 Home] [🔍 Browse] [✨ Create] [💎 Tokens (5)] [👤 Profile]
```

### Primary User Flows

1. **Discovery → Exchange**
   - Dashboard → Browse Feed → Intention Detail → Offer Help → Exchange Flow

2. **Distribution Flow**
   - Dashboard → See Countdown → Bid Tokens → Select Tokens → Submit → Wait → Payment

3. **Create → Participate**
   - Create Tab → New Intention → Post → Invite → Group Chat → Fulfill

4. **Profile Management**
   - Profile Tab → View Stats → Edit Settings → Manage Payments

5. **Token Management**
   - Tokens Tab → View Wallet → Filter Tokens → Token Detail → Prepare Bid

## 🛠️ Tech Stack

- **Framework**: SvelteKit 2.0
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4 + Custom CSS
- **State Management**: Svelte Stores (reactive)
- **Routing**: SvelteKit file-based routing
- **Build Tool**: Vite 5.0
- **Linting**: ESLint + Prettier
- **Type Checking**: svelte-check

## 🎯 Implementation Status

### ✅ Completed (100%)
- [x] SvelteKit project setup with TypeScript 5.0
- [x] Tailwind CSS with custom theme (cyan/gold/sage)
- [x] Complete directory structure
- [x] Type definitions (20+ interfaces)
- [x] Comprehensive mock data service (500+ lines)
- [x] Global styles with neon glow effects
- [x] Font integration (Exo 2)
- [x] **22 UI components** fully implemented
- [x] **7 Svelte stores** for state management
- [x] **5 main screens** with full navigation
- [x] **Main Dashboard** - Temple header, countdown, stats, activity
- [x] **Browse Intentions** - Search, filters, sort, detail views
- [x] **Create Intention** - Form with validation, media upload, success states
- [x] **Token Wallet** - Filters, selection, distribution prep
- [x] **User Profile** - 4-tab interface (Tokens/Fulfillments/Connections/Settings)
- [x] **Bottom Navigation** - 5 tabs with active states
- [x] **Loading & error states** - Spinners, empty states, success animations
- [x] **Responsive design** - Mobile (320px+), Tablet (768px+), Desktop (1200px+)
- [x] **Glowing neon frame** - Animated cyan border around entire app
- [x] **Complete documentation** - Build summary, component reference

### 📊 Final Stats
- **Components:** 22 reusable Svelte components
- **Routes:** 6 pages (splash + 5 main screens)
- **Type Safety:** 0 TypeScript errors
- **Code Quality:** svelte-check passing
- **Completion:** 100% of core features

## 📱 Screen Inventory

### Priority 1: Core Navigation (MVP)
1. **Main Dashboard** - Central hub, temple context, distribution countdown
2. **Browse Feed** - Discover intentions with filters/search
3. **Intention Detail** - 4-view interface (Discovery/Details/Activity/Impact)
4. **My Tokens** - Wallet with distribution preparation
5. **User Profile** - Stats, tokens, settings

### Priority 2: Creation & Social
6. **Create Intention** - Post new community needs
7. **Intention Group Chat** - Coordinate fulfillment
8. **Connections Network** - Build trust relationships
9. **My Intentions Dashboard** - Manage your requests
10. **User Profile (Others)** - View other members

### Priority 3: Economics
11. **Distribution Preparation** - Select tokens for bidding
12. **Distribution Flow** - 6-screen monthly cycle
13. **Transaction History** - Full audit trail
14. **Personal Analytics** - Visualize your journey

## 🔍 Key Features

### Temple-Centric Design
- Every screen shows community context
- Distribution countdown creates urgency
- Member count and monthly pool visible

### Attention Economy
- Hours accumulate on intentions
- High-attention intentions create high-value tokens
- Proportional distribution is mathematically fair

### Progressive Disclosure
- 4-view intention detail (Discovery → Details → Activity → Your Impact)
- Step-by-step flows (Exchange, Distribution, Create)
- Clear next actions on every screen

### Mobile-First
- Phone mockup aesthetic
- Touch-friendly sizing (44px minimum)
- Bottom navigation for one-handed use
- Responsive breakpoints (320px, 768px, 1024px+)

## 🎓 Learning the Codebase

### For Developers

1. **Start with Types** - `src/lib/types/index.ts` defines all data structures
2. **Explore Mock Data** - `src/lib/data/mockData.ts` shows data relationships
3. **Review Design System** - `src/app.css` and `tailwind.config.js` for styling
4. **Check Routing** - `src/routes/` for file-based routes (SvelteKit convention)

### For Designers

1. **Reference Mockups** - `../refs/` folder has HTML/Svelte examples
2. **Study Design System** - `../refs/DESIGN_SYSTEM.md` for color philosophy
3. **Component Patterns** - `../refs/MIGRATION_GUIDE.md` for before/after examples

### For Product/Business

1. **Navigation Plan** - `../refs/NAVIGATION_PLAN.md` explains all flows
2. **Screen Map** - `../refs/COMPLETE_SCREEN_MAP.md` lists all 30+ screens
3. **Deliverables** - `../refs/DELIVERABLES_SUMMARY.md` shows what's included

## 🤝 Contributing

When extending this codebase:

1. **Follow the design system** - Cyan for interactive, Gold for value, Green for context
2. **Use TypeScript** - All new code should be typed
3. **Batch operations** - Multiple tool calls in single messages (CLAUDE.md)
4. **Organize files** - Never save to root, use proper subdirectories
5. **Document components** - Include usage examples and prop descriptions

## 📚 Additional Resources

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Svelte Store Tutorial](https://svelte.dev/tutorial/writable-stores)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Type Errors
```bash
# Regenerate .svelte-kit types
npm run check
```

### Styling Not Applied
```bash
# Rebuild Tailwind
rm -rf .svelte-kit
npm run dev
```

## 📄 License

This project is part of the Synchronicity Engine ecosystem. See main repository for license details.

## ✨ Acknowledgments

**Design Evolution**: From mystical organic to tech-forward neon while maintaining philosophical depth.

**Philosophy**: Making gratitude flow visible and valuable through elegant mathematics and sovereign technology.

**Community**: Built for Templo da Água Lila and the gift economy movement.

---

**May your tokens glow golden and your attention shine cyan.** ⚡✨
