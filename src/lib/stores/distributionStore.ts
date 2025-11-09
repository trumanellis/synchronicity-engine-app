import { writable, derived } from 'svelte/store';
import { distribution, calculateEstimatedShare } from '$data/mockData';
import type { Distribution } from '$types';

// Distribution cycle state
export const currentDistribution = writable<Distribution>(distribution);

// Selected tokens for bidding
export const selectedTokenIds = writable<string[]>([]);

// Derived stores
export const biddingDaysRemaining = derived(
	currentDistribution,
	($dist) => $dist.biddingPeriod.daysRemaining
);

export const totalPoolUSD = derived(currentDistribution, ($dist) => $dist.pool.totalUSD);

export const estimatedShare = derived(
	[currentDistribution, selectedTokenIds],
	([$dist, $selectedIds]) => {
		// Calculate total hours from selected tokens
		// This would need actual token data, but for now return estimate
		const totalHours = $dist.userBid.totalHours;
		return calculateEstimatedShare(totalHours);
	}
);
