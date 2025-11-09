import { writable } from 'svelte/store';
import type { NavTab } from '$types';

// Active tab in bottom navigation
export const activeTab = writable<NavTab>('home');

// Navigation history for back button
export const navigationHistory = writable<string[]>(['/']);

// Helper functions
export function navigateTo(tab: NavTab, path: string) {
	activeTab.set(tab);
	navigationHistory.update((history) => [...history, path]);
}

export function goBack() {
	navigationHistory.update((history) => {
		if (history.length > 1) {
			return history.slice(0, -1);
		}
		return history;
	});
}
