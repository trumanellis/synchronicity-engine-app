<script lang="ts">
	import type { Offering } from '$types';

	export let offering: Offering;
	export let compact: boolean = false;

	const availabilityConfig = {
		available: { icon: '✓', label: 'Available', color: 'cyan' },
		limited: { icon: '⏱️', label: 'Limited', color: 'gold' },
		unavailable: { icon: '✕', label: 'Unavailable', color: 'sage' }
	};

	const config = availabilityConfig[offering.availability];
</script>

<div class="offering-card" class:compact>
	<!-- Header -->
	<div class="offering-header">
		<h3 class="offering-title">{offering.title}</h3>
		<div class="availability-badge {config.color}">
			<span class="badge-icon">{config.icon}</span>
			<span class="badge-label">{config.label}</span>
		</div>
	</div>

	<!-- Description -->
	<p class="offering-description">{offering.description}</p>

	<!-- Category -->
	<div class="offering-category">
		<span class="category-icon">🏷️</span>
		<span class="category-label">{offering.category}</span>
	</div>

	<!-- Tags -->
	{#if offering.tags && offering.tags.length > 0}
		<div class="offering-tags">
			{#each offering.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	{/if}

	<!-- Contact button (if available) -->
	{#if offering.availability !== 'unavailable'}
		<button class="request-button">
			<span class="button-icon">💬</span>
			<span class="button-label">Request Service</span>
		</button>
	{/if}
</div>

<style>
	.offering-card {
		background: rgba(212, 175, 55, 0.1);
		border: 2px solid rgba(212, 175, 55, 0.5);
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: all 0.3s ease;
	}

	.offering-card:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
		transform: translateY(-2px);
	}

	.offering-card.compact {
		padding: var(--spacing-3);
		gap: var(--spacing-3);
	}

	.offering-header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: var(--spacing-4);
	}

	.offering-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		flex: 1;
	}

	.availability-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.25rem 0.65rem;
		border-radius: 0.5rem;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}

	.availability-badge.cyan {
		background: rgba(0, 255, 209, 0.15);
		color: theme('colors.cyan.DEFAULT');
		border: 2px solid theme('colors.cyan.DEFAULT');
	}

	.availability-badge.gold {
		background: rgba(212, 175, 55, 0.2);
		color: theme('colors.gold.DEFAULT');
		border: 2px solid theme('colors.gold.DEFAULT');
	}

	.availability-badge.sage {
		background: rgba(132, 169, 140, 0.1);
		color: theme('colors.sage.DEFAULT');
		border: 2px solid rgba(132, 169, 140, 0.3);
	}

	.badge-icon {
		font-size: var(--font-size-3);
	}

	.badge-label {
		font-size: var(--font-size-3);
	}

	.offering-description {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0;
	}

	.offering-category {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--spacing-4);
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4);
		border: 1px solid theme('colors.gold.border');
	}

	.category-icon {
		font-size: var(--font-size-1);
	}

	.category-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
	}

	.offering-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		padding: 0.25rem 0.75rem;
		background: theme('colors.bg.deep');
		border: 1px solid theme('colors.gold.border');
		border-radius: 1rem;
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.tag:hover {
		border-color: theme('colors.gold.DEFAULT');
		color: theme('colors.gold.DEFAULT');
	}

	.request-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: var(--spacing-4) var(--spacing-2);
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
		border: none;
		border-radius: var(--spacing-4);
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: var(--font-size-2);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.request-button:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.button-icon {
		font-size: var(--font-size-1);
	}

	.button-label {
		font-size: var(--font-size-2);
	}
</style>
