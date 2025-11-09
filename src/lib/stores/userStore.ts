import { writable, derived } from 'svelte/store';
import { currentUser } from '$data/mockData';
import type { User } from '$types';

// Current user state
export const user = writable<User>(currentUser);

// Derived stores for quick access
export const userStats = derived(user, ($user) => $user.stats);
export const userTemple = derived(user, ($user) => $user.temple);
export const userTokenCount = derived(user, ($user) => $user.stats.tokensHeld);
