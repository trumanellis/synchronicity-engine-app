<script lang="ts">
	import type { Intention, Offering } from '$types';
	import TabSwitcher from './TabSwitcher.svelte';

	export let intentions: Intention[] = [];
	export let offerings: Offering[] = [];
	export let canEdit: boolean = false;

	// Tab state
	let activeTab = 'intentions';

	$: tabs = [
		{
			id: 'intentions',
			label: 'Intentions',
			icon: '🎯',
			count: intentions.length
		},
		{
			id: 'offerings',
			label: 'Offerings',
			icon: '🎁',
			count: offerings.length
		}
	];

	function formatHours(hours: number): string {
		if (hours >= 1000) {
			return `${(hours / 1000).toFixed(1)}k`;
		}
		return hours.toString();
	}
</script>

<div class="profile-gallery">
	<TabSwitcher {tabs} bind:activeTab />

	{#if activeTab === 'intentions'}
		<div class="gallery-grid">
			{#each intentions as intention}
				<button
					class="intention-card"
					on:click={() => (window.location.href = `/browse/${intention.intentionId}`)}
				>
					<div class="card-header">
						<h3 class="card-title">{intention.title}</h3>
						<div class="card-status {intention.status}">
							{intention.status === 'active' ? '✓' : '🏁'}
						</div>
					</div>

					<p class="card-description">
						{intention.description.slice(0, 120)}{intention.description.length > 120 ? '...' : ''}
					</p>

					<div class="card-meta">
						<div class="meta-item">
							<span class="meta-icon">🏷️</span>
							<span class="meta-text">{intention.category}</span>
						</div>
						<div class="meta-item">
							<span class="meta-icon">📍</span>
							<span class="meta-text">{intention.location.proximity}</span>
						</div>
					</div>

					<div class="card-stats">
						<div class="stat">
							<span class="stat-value">{formatHours(intention.stats.totalAttentionHours)}h</span>
							<span class="stat-label">attention</span>
						</div>
						<div class="stat">
							<span class="stat-value">{intention.stats.participantCount}</span>
							<span class="stat-label">participants</span>
						</div>
						<div class="stat">
							<span class="stat-value">{intention.stats.activeDays}d</span>
							<span class="stat-label">active</span>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}

	{#if activeTab === 'offerings'}
		<div class="gallery-grid">
			{#each offerings as offering}
				<div class="offering-gallery-card">
					<div class="card-header">
						<h3 class="card-title">{offering.title}</h3>
						<div class="availability-badge {offering.availability}">
							{offering.availability === 'available'
								? '✓'
								: offering.availability === 'limited'
									? '⏱️'
									: '✕'}
						</div>
					</div>

					<p class="card-description">{offering.description}</p>

					<div class="card-category">
						<span class="category-icon">🏷️</span>
						<span class="category-label">{offering.category}</span>
					</div>

					{#if offering.tags && offering.tags.length > 0}
						<div class="card-tags">
							{#each offering.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					{/if}

					{#if offering.availability !== 'unavailable'}
						<button class="request-button">
							<span class="button-icon">💬</span>
							<span class="button-label">{canEdit ? 'Edit Offering' : 'Request Service'}</span>
						</button>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.profile-gallery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	/* Gallery Grid */
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-3);
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Intention Cards */
	.intention-card {
		background: rgba(0, 255, 209, 0.05);
		border: 2px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-3);
		padding: var(--spacing-3);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.intention-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
		transform: translateY(-2px);
	}

	.card-header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: var(--spacing-4);
	}

	.card-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
		margin: 0;
		flex: 1;
	}

	.card-status {
		display: inline-flex;
		align-items: center;
		background: rgba(0, 255, 209, 0.15);
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		font-size: var(--font-size-3);
		font-weight: 600;
	}

	.card-description {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3);
		line-height: 1.5;
		margin: 0;
	}

	.card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		background: theme('colors.bg.deep');
		border: 1px solid theme('colors.cyan.border');
		border-radius: 1rem;
	}

	.meta-icon {
		font-size: var(--font-size-3);
	}

	.meta-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
		text-transform: capitalize;
	}

	.card-stats {
		display: flex;
		justify-content: space-around;
		padding: var(--spacing-4);
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4);
		border: 1px solid theme('colors.cyan.border');
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		text-shadow: 0 0 8px rgba(0, 255, 209, 0.4);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		opacity: 0.8;
	}

	/* Offering Cards */
	.offering-gallery-card {
		background: rgba(212, 175, 55, 0.1);
		border: 2px solid rgba(212, 175, 55, 0.5);
		border-radius: var(--spacing-3);
		padding: var(--spacing-3);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		transition: all 0.3s ease;
	}

	.offering-gallery-card:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
		transform: translateY(-2px);
	}

	.availability-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		font-size: var(--font-size-3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.availability-badge.available {
		background: rgba(0, 255, 209, 0.15);
		color: theme('colors.cyan.DEFAULT');
		border: 2px solid theme('colors.cyan.DEFAULT');
	}

	.availability-badge.limited {
		background: rgba(212, 175, 55, 0.2);
		color: theme('colors.gold.DEFAULT');
		border: 2px solid theme('colors.gold.DEFAULT');
	}

	.availability-badge.unavailable {
		background: rgba(132, 169, 140, 0.1);
		color: theme('colors.sage.DEFAULT');
		border: 2px solid rgba(132, 169, 140, 0.3);
	}

	.card-category {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--spacing-4);
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4);
		border: 1px solid theme('colors.gold.border');
	}

	.category-icon {
		font-size: var(--font-size-2);
	}

	.category-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.card-tags .tag {
		padding: 0.25rem 0.5rem;
		background: theme('colors.bg.deep');
		border: 1px solid theme('colors.gold.border');
		border-radius: 1rem;
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
	}

	.request-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: var(--spacing-4) var(--spacing-3);
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
		border: none;
		border-radius: var(--spacing-4);
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: var(--font-size-3);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.request-button:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.button-icon {
		font-size: var(--font-size-2);
	}

	.button-label {
		font-size: var(--font-size-3);
	}
</style>
