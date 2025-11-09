import { writable, derived } from 'svelte/store';
import { userTokens, getAvailableTokens } from '$data/mockData';
import type { Token, TokenFilter } from '$types';

// User's tokens
export const tokens = writable<Token[]>(userTokens);

// Active filter
export const activeTokenFilter = writable<TokenFilter>('all');

// Filtered tokens
export const filteredTokens = derived(
	[tokens, activeTokenFilter],
	([$tokens, $filter]) => {
		switch ($filter) {
			case 'available':
				return $tokens.filter((t) => t.status === 'available');
			case 'bid':
				return $tokens.filter((t) => t.status === 'bid');
			case 'historical':
				return $tokens.filter((t) => t.status === 'historical');
			default:
				return $tokens;
		}
	}
);

// Total available hours
export const totalAvailableHours = derived(filteredTokens, ($tokens) => {
	return $tokens
		.filter((t) => t.status === 'available')
		.reduce((sum, t) => sum + t.computed.hours, 0);
});
