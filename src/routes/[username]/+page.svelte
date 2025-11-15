<script lang="ts">
	import type { PageData } from './$types';
	import BioCard from '$lib/components/v2/BioCard.svelte';
	import OfferingCard from '$lib/components/v2/OfferingCard.svelte';
	import PublicIntentionsList from '$lib/components/v2/PublicIntentionsList.svelte';
	import TabSwitcher from '$lib/components/v2/TabSwitcher.svelte';
	import BottomNav from '$lib/components/v2/BottomNav.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let data: PageData;

	$: ({ user, visibleSections, userIntentions, canEdit } = data);

	// Mock tags for bio - in real app these would come from user data
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];

	// Tab state
	let activeTab = 'intentions';

	$: tabs = [
		{
			id: 'intentions',
			label: 'Intentions',
			icon: '🎯',
			count: userIntentions.length
		},
		{
			id: 'offerings',
			label: 'Offerings',
			icon: '🎁',
			count: user.offerings.length
		}
	];
</script>

<svelte:head>
	<title>{user.name} - Synchronicity Engine</title>
	<meta name="description" content={user.bio} />
</svelte:head>

<div class="public-profile-page">
	<Stack gap="md">
		<!-- Bio Card - Avatar and Stats -->
		{#if visibleSections.bio}
			<Section spacing="md">
				<BioCard {user} {canEdit} />
			</Section>
		{/if}

		<!-- About Section with Bio and Tags -->
		{#if visibleSections.bio}
			<Section spacing="md">
				<Stack gap="sm">
					<div class="section-header">
						<div class="section-title">
							<span>📖</span>
							<span>About</span>
						</div>
						<div class="visibility-badge">PUBLIC</div>
					</div>
					<div class="bio-box">
						<Stack gap="sm">
							<div class="bio-text">{user.bio}</div>
							<div class="tags-container">
								{#each bioTags as tag}
									<div class="tag">{tag}</div>
								{/each}
							</div>
						</Stack>
					</div>
				</Stack>
			</Section>
		{/if}

		<!-- Tabbed Gallery: Intentions & Offerings -->
		{#if (visibleSections.intentions && userIntentions.length > 0) || (visibleSections.offerings && user.offerings.length > 0)}
			<Section spacing="md">
				<Stack gap="sm">
					<TabSwitcher {tabs} bind:activeTab />

					{#if activeTab === 'intentions' && visibleSections.intentions}
						<div class="gallery-grid">
							{#each userIntentions as intention}
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
										{intention.description.slice(0, 120)}{intention.description.length > 120
											? '...'
											: ''}
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
											<span class="stat-value"
												>{intention.stats.totalAttentionHours >= 1000
													? `${(intention.stats.totalAttentionHours / 1000).toFixed(1)}k`
													: intention.stats.totalAttentionHours}h</span
											>
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

					{#if activeTab === 'offerings' && visibleSections.offerings}
						<div class="gallery-grid">
							{#each user.offerings as offering}
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
											<span class="button-label">Request Service</span>
										</button>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</Stack>
			</Section>
		{/if}

		<!-- Connect Button -->
		<Section spacing="md">
			<button class="button-primary">Connect with {user.name.split(' ')[0]}</button>
		</Section>
	</Stack>
</div>

<div class="bottom-nav-container">
	<BottomNav username={user.username} />
</div>

<style>
	.public-profile-page {
		/* Layout provided by Stack and Section primitives */
		padding-bottom: 80px; /* Account for fixed bottom nav (60px + 20px breathing room) */
	}

	@media (min-width: 768px) {
		.public-profile-page {
			padding-bottom: 105px; /* Desktop: 85px nav + 20px breathing room */
		}
	}

	.bottom-nav-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-4);
	}

	.section-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.visibility-badge {
		background: rgba(132, 169, 140, 0.2);
		border: 1px solid theme('colors.sage.DEFAULT');
		border-radius: var(--spacing-4);
		padding: 0.25rem var(--spacing-4);
		font-size: var(--font-size-3);
		color: theme('colors.sage.DEFAULT');
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.bio-box {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
	}

	.bio-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.6;
		font-size: var(--font-size-2);
	}

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
	}

	.tag {
		background: rgba(0, 255, 209, 0.15);
		border: 1px solid rgba(0, 255, 209, 0.4);
		border-radius: var(--spacing-4);
		padding: 0.35rem 0.75rem;
		font-size: var(--font-size-3);
		color: theme('colors.cyan.DEFAULT');
	}

	.button-primary {
		background: rgba(0, 255, 209, 0.9);
		color: theme('colors.bg.deep');
		border: none;
		border-radius: var(--spacing-3);
		padding: var(--spacing-3) var(--spacing-2);
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: var(--font-size-2);
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.4);
		width: 100%;
	}

	.button-primary:hover {
		background: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 30px rgba(0, 255, 209, 0.6);
		transform: translateY(-2px);
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

	/* Intention Cards in Gallery */
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

	/* Offering Cards in Gallery */
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
