// Articles Store - Manages Substack articles state with filtering and search
import { writable, derived } from 'svelte/store';
import type { Article } from '$types';
import { mockArticles, getAllArticleHashtags } from '$lib/data/mockData';

// Base stores
export const articles = writable<Article[]>([]);
export const selectedHashtag = writable<string>('all');
export const searchTerm = writable<string>('');
export const isLoading = writable<boolean>(false);
export const fetchError = writable<string | null>(null);

// Derived store: Filtered articles based on hashtag and search
export const filteredArticles = derived(
	[articles, selectedHashtag, searchTerm],
	([$articles, $selectedHashtag, $searchTerm]) => {
		let filtered = $articles;

		// Filter by hashtag
		if ($selectedHashtag !== 'all') {
			filtered = filtered.filter((article) => article.hashtags.includes($selectedHashtag));
		}

		// Filter by search term
		if ($searchTerm.trim() !== '') {
			const lowerQuery = $searchTerm.toLowerCase();
			filtered = filtered.filter(
				(article) =>
					article.title.toLowerCase().includes(lowerQuery) ||
					article.subtitle.toLowerCase().includes(lowerQuery) ||
					article.preview.toLowerCase().includes(lowerQuery) ||
					article.hashtags.some((tag) => tag.toLowerCase().includes(lowerQuery))
			);
		}

		// Sort by published date (newest first)
		return filtered.sort(
			(a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
		);
	}
);

// Derived store: Hashtag counts
export const hashtagCounts = derived(articles, ($articles) => {
	const counts: Record<string, number> = { all: $articles.length };

	$articles.forEach((article) => {
		article.hashtags.forEach((tag) => {
			counts[tag] = (counts[tag] || 0) + 1;
		});
	});

	return counts;
});

// Derived store: Available hashtags (sorted alphabetically)
export const availableHashtags = derived(articles, ($articles) => {
	const allTags = new Set<string>();
	$articles.forEach((article) => {
		article.hashtags.forEach((tag) => allTags.add(tag));
	});
	return Array.from(allTags).sort();
});

// Action: Fetch articles from Substack RSS feed via API
export async function fetchArticles(substackUrl?: string) {
	if (!substackUrl) {
		// If no URL provided, use mock articles (fallback)
		articles.set(mockArticles);
		return;
	}

	isLoading.set(true);
	fetchError.set(null);

	try {
		const response = await fetch(`/api/substack?url=${encodeURIComponent(substackUrl)}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || 'Failed to fetch articles');
		}

		if (data.success && data.articles) {
			articles.set(data.articles);
		} else {
			throw new Error('Invalid response format');
		}
	} catch (error) {
		console.error('Error fetching Substack articles:', error);
		fetchError.set(error instanceof Error ? error.message : 'Failed to fetch articles');
		// Fall back to empty array on error
		articles.set([]);
	} finally {
		isLoading.set(false);
	}
}

// Action: Reset filters
export function resetFilters() {
	selectedHashtag.set('all');
	searchTerm.set('');
}

// Action: Set hashtag filter
export function setHashtagFilter(hashtag: string) {
	selectedHashtag.set(hashtag);
}

// Action: Set search query
export function setSearchQuery(query: string) {
	searchTerm.set(query);
}
