<script lang="ts">
	import type { Article } from '$types';
	import ArticleCard from './ArticleCard.svelte';

	export let articles: Article[];
	export let isLoading: boolean = false;
</script>

{#if isLoading}
	<!-- Loading State -->
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p class="loading-text">Loading articles...</p>
	</div>
{:else if articles.length === 0}
	<!-- Empty State -->
	<div class="empty-state">
		<div class="empty-icon">📚</div>
		<h3 class="empty-title">No articles found</h3>
		<p class="empty-message">Try adjusting your filters or search term</p>
	</div>
{:else}
	<!-- Articles Grid -->
	<div class="articles-grid">
		{#each articles as article (article.id)}
			<ArticleCard {article} />
		{/each}
	</div>
{/if}

<style>
	/* Grid Layout - Default 2 columns on mobile */
	.articles-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
	}

	/* Tablet: 3 columns */
	@media (min-width: 641px) {
		.articles-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Desktop: 4 columns */
	@media (min-width: 1025px) {
		.articles-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	/* Loading State */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		gap: var(--spacing-3);
	}

	.loading-spinner {
		width: 48px;
		height: 48px;
		border: 4px solid rgba(0, 255, 209, 0.2);
		border-top-color: theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 500;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
		gap: var(--spacing-3);
	}

	.empty-icon {
		font-size: 4rem;
		opacity: 0.5;
		filter: grayscale(1);
	}

	.empty-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		margin: 0;
	}

	.empty-message {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.8;
		margin: 0;
	}
</style>
