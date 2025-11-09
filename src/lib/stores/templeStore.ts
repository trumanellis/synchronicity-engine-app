import { writable, derived } from 'svelte/store';
import { temple } from '$data/mockData';
import type { Temple } from '$types';

// Temple/community state
export const currentTemple = writable<Temple>(temple);

// Derived stores
export const templeStats = derived(currentTemple, ($temple) => $temple.stats);
export const daysUntilDistribution = derived(
	currentTemple,
	($temple) => $temple.stats.daysUntilDistribution
);
export const monthlyPool = derived(currentTemple, ($temple) => $temple.stats.monthlyPoolCurrent);
