<script lang="ts">
	/**
	 * ContentCardGallery v2 - Wrapper for ContentCard grid display
	 * Handles loading states, empty states, and responsive grid layout
	 */
	import ContentCard from './ContentCard.svelte';

	export let items: Array<{
		imageUrl?: string | null;
		imageAlt?: string;
		imagePlaceholder?: string;
		title: string;
		subtitle?: string;
		tags?: string[];
		metrics?: Array<{ icon: string; value: string | number; label?: string }>;
		date?: string;
		actionText?: string;
		actionIcon?: string;
		variant?: 'default' | 'featured';
		onClick?: () => void;
	}> = [];
	export let loading: boolean = false;
	export let emptyIcon: string = '📋';
	export let emptyTitle: string = 'No items found';
	export let emptyMessage: string = 'Check back later for new content';
</script>

{#if loading}
	<!-- Loading State -->
	<div class="gallery-loading">
		<div class="loading-spinner">⏳</div>
		<div class="loading-text">Loading content...</div>
	</div>
{:else if items.length === 0}
	<!-- Empty State -->
	<div class="gallery-empty">
		<div class="empty-icon">{emptyIcon}</div>
		<div class="empty-title">{emptyTitle}</div>
		<div class="empty-message">{emptyMessage}</div>
	</div>
{:else}
	<!-- Content Grid -->
	<div class="grid-3-cols">
		{#each items as item, i (i)}
			<div class="animate-fade-in">
				<ContentCard
					imageUrl={item.imageUrl ?? null}
					imageAlt={item.imageAlt ?? ''}
					imagePlaceholder={item.imagePlaceholder ?? '🖼️'}
					title={item.title}
					subtitle={item.subtitle ?? ''}
					tags={item.tags ?? []}
					metrics={item.metrics ?? []}
					date={item.date ?? ''}
					actionText={item.actionText ?? 'Read More'}
					actionIcon={item.actionIcon ?? '→'}
					variant={item.variant ?? 'default'}
					onClick={item.onClick}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	/* Loading State */
	.gallery-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0); /* 48px φ-based */
		text-align: center;
		min-height: 300px;
	}

	.loading-spinner {
		font-size: 3rem;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		margin-top: var(--spacing-3);
	}

	/* Empty State */
	.gallery-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0); /* 48px φ-based */
		text-align: center;
		min-height: 300px;
	}

	.empty-icon {
		font-size: 4rem;
		opacity: 0.3;
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.empty-title {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.empty-message {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		opacity: 0.7;
	}
</style>
