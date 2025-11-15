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
		background: theme('colors.bg.mid');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		transition: all 0.3s ease;
	}

	.offering-card:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
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
		font-size: var(--font-size-1);
		font-weight: 700;
		margin: 0;
		flex: 1;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
	}

	.availability-badge {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: var(--font-size-3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}

	.availability-badge.cyan {
		background: theme('colors.cyan.bg');
		color: theme('colors.cyan.DEFAULT');
		border: 1px solid theme('colors.cyan.border');
	}

	.availability-badge.gold {
		background: theme('colors.gold.bg');
		color: theme('colors.gold.DEFAULT');
		border: 1px solid theme('colors.gold.border');
	}

	.availability-badge.sage {
		background: rgba(132, 169, 140, 0.1);
		color: theme('colors.sage.DEFAULT');
		border: 1px solid rgba(132, 169, 140, 0.3);
	}

	.badge-icon {
		font-size: var(--font-size-3);
	}

	.badge-label {
		font-size: var(--font-size-3);
	}

	.offering-description {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		line-height: 1.5;
		margin: 0;
		opacity: 0.9;
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
