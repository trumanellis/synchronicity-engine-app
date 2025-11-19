<script lang="ts">
	import type { Intention, Offering } from '$types';
	import TabSwitcher from './TabSwitcher.svelte';
	import ContentCardGallery from './ContentCardGallery.svelte';
	import { intentionToCard } from '$lib/utils/cardTransformers';

	export let intentions: Intention[] = [];
	export let offerings: Offering[] = [];
	export let canEdit: boolean = false;

	// Tab state
	let activeTab = 'intentions';

	// Transform intentions to card format
	$: intentionCards = intentions.map((intention) => ({
		...intentionToCard(intention),
		onClick: () => (window.location.href = `/browse/${intention.intentionId}`)
	}));

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
</script>

<div class="profile-gallery">
	<TabSwitcher {tabs} bind:activeTab />

	{#if activeTab === 'intentions'}
		<ContentCardGallery items={intentionCards} />
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

	/* Gallery Grid for Offerings */
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
