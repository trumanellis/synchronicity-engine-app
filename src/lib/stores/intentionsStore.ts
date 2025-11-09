import { writable, derived } from 'svelte/store';
import { intentions } from '$data/mockData';
import type { Intention, FilterCategory, SortOption } from '$types';

// All intentions
export const allIntentions = writable<Intention[]>(intentions);

// Filter and sort options
export const activeFilter = writable<FilterCategory>('All');
export const activeSortOption = writable<SortOption>('trending');
export const searchQuery = writable<string>('');

// Filtered and sorted intentions
export const filteredIntentions = derived(
	[allIntentions, activeFilter, activeSortOption, searchQuery],
	([$intentions, $filter, $sort, $search]) => {
		let filtered = $intentions;

		// Apply category filter
		if ($filter !== 'All') {
			filtered = filtered.filter((i) => i.category === $filter);
		}

		// Apply search
		if ($search) {
			const query = $search.toLowerCase();
			filtered = filtered.filter(
				(i) =>
					i.title.toLowerCase().includes(query) ||
					i.description.toLowerCase().includes(query)
			);
		}

		// Apply sorting
		switch ($sort) {
			case 'trending':
				return filtered.sort(
					(a, b) => b.stats.totalAttentionHours - a.stats.totalAttentionHours
				);
			case 'recent':
				return filtered.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			case 'high-impact':
				// Sort by impact level priority (high > medium > low), then by attention hours
				const impactPriority = { high: 3, medium: 2, low: 1 };
				return filtered.sort((a, b) => {
					const priorityDiff = impactPriority[b.stats.impactLevel] - impactPriority[a.stats.impactLevel];
					if (priorityDiff !== 0) return priorityDiff;
					return b.stats.totalAttentionHours - a.stats.totalAttentionHours;
				});
			default:
				return filtered;
		}
	}
);
