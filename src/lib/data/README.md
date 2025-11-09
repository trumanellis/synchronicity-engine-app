# Mock Data Service

Comprehensive mock data for the Synchronicity Engine app, based on `NAVIGATION_PLAN.md` specifications.

## Available Data

### Core Entities
- `currentUser` - User profile with temple membership and stats
- `temple` - Temple/community data with member count and monthly pool
- `intentions` - Array of community intentions with stats and activity
- `userTokens` - User's earned Tokens of Gratitude
- `distribution` - Current monthly distribution cycle data
- `recentActivity` - Global activity feed
- `connections` - User's network connections
- `groupChats` - Group chat data for intentions

### Helper Functions

```typescript
getIntentionById(id: string): Intention | undefined
getTokenById(id: string): Token | undefined
getUserTokens(): Token[]
getAvailableTokens(): Token[]
calculateEstimatedShare(hours: number): number
formatTimeAgo(timestamp: string): string
formatCurrency(amount: number): string
```

## Usage

```typescript
import { currentUser, temple, intentions, userTokens } from '$data/mockData';
```

All data is typed according to interfaces in `$types/index.ts`.

## Data Structure

The mock data reflects the OrbitDB-ready architecture:
- **Primitives**: User, Temple, Intention, Token, Activity
- **Derived Values**: Computed from primitives (hours, stats, values)
- **Relationships**: User ↔ Temple, Intention ↔ Tokens, User ↔ Connections

This structure is ready for real OrbitDB integration when moving from mock to P2P.
