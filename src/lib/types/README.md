# TypeScript Type Definitions

This directory contains all TypeScript interfaces and types for the Synchronicity Engine app.

## Core Entities

- **User** - User profile with temple membership, stats, payment methods
- **Temple** - Community/temple data with member count, monthly pool
- **Intention** - Community needs/dreams with stats, contributors, activity
- **Token** - Tokens of Gratitude with hours, blessings, computed values
- **Distribution** - Monthly distribution cycle with bidding and pool data
- **Activity** - Activity feed events with types and metadata
- **Connection** - User connections with trust levels and shared intentions
- **Chat** - Group and direct messaging

## UI State Types

- **NavTab** - Bottom navigation tab identifiers
- **ViewMode** - Intention detail view modes (4 views)
- **FilterCategory** - Intention browse categories
- **SortOption** - Sorting options for feeds
- **TokenFilter** - Token wallet filters

## Usage

```typescript
import type { User, Temple, Intention } from '$types';
```

All types are exported from `index.ts` for centralized imports.
