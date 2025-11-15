<script lang="ts">
	import type { PageData } from './$types';
	import BioCard from '$lib/components/v2/BioCard.svelte';
	import AchievementShowcase from '$lib/components/v2/AchievementShowcase.svelte';
	import OfferingCard from '$lib/components/v2/OfferingCard.svelte';
	import PublicIntentionsList from '$lib/components/v2/PublicIntentionsList.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let data: PageData;

	$: ({ user, visibleSections, userIntentions, canEdit } = data);
</script>

<svelte:head>
	<title>{user.name} - Synchronicity Engine</title>
	<meta name="description" content={user.bio} />
</svelte:head>

<div class="public-profile-page">
	<div class="profile-container">
		<Stack gap="lg">
			<!-- Bio Card - Always visible -->
			{#if visibleSections.bio}
				<Section spacing="md">
					<BioCard {user} {canEdit} />
				</Section>
			{/if}

			<!-- Achievements Showcase -->
			{#if visibleSections.achievements && user.achievements.length > 0}
				<Section spacing="md">
					<div class="section-header">
						<h2 class="section-title">
							<span class="title-icon">🏆</span>
							<span class="title-text">Achievements</span>
						</h2>
						<div class="section-subtitle">Celebrating contributions and milestones</div>
					</div>
					<AchievementShowcase achievements={user.achievements} limit={null} />
				</Section>
			{/if}

			<!-- Offerings -->
			{#if visibleSections.offerings && user.offerings.length > 0}
				<Section spacing="md">
					<div class="section-header">
						<h2 class="section-title">
							<span class="title-icon">✨</span>
							<span class="title-text">Offerings</span>
						</h2>
						<div class="section-subtitle">Services and skills shared with the community</div>
					</div>
					<div class="offerings-grid">
						{#each user.offerings as offering}
							<OfferingCard {offering} />
						{/each}
					</div>
				</Section>
			{/if}

			<!-- Active Intentions -->
			{#if visibleSections.intentions && userIntentions.length > 0}
				<Section spacing="md">
					<div class="section-header">
						<h2 class="section-title">
							<span class="title-icon">🎯</span>
							<span class="title-text">Active Intentions</span>
						</h2>
						<div class="section-subtitle">
							Contributing to {userIntentions.length} community intention{userIntentions.length !== 1
								? 's'
								: ''}
						</div>
					</div>
					<PublicIntentionsList intentions={userIntentions} />
				</Section>
			{/if}

			<!-- Activity Feed (if visible) -->
			{#if visibleSections.activity}
				<Section spacing="md">
					<div class="section-header">
						<h2 class="section-title">
							<span class="title-icon">📜</span>
							<span class="title-text">Recent Activity</span>
						</h2>
						<div class="section-subtitle">Latest contributions and interactions</div>
					</div>
					<div class="activity-notice">
						<div class="notice-icon">🔄</div>
						<div class="notice-text">Activity feed coming soon...</div>
					</div>
				</Section>
			{/if}

			<!-- Bottom Spacer -->
			<div class="bottom-spacer"></div>
		</Stack>
	</div>
</div>

<style>
	.public-profile-page {
		min-height: 100vh;
		background: theme('colors.bg.deep');
		padding: var(--spacing-2);
	}

	.profile-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-1) 0;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: var(--spacing-2);
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
	}

	.title-icon {
		font-size: var(--font-size-0);
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.title-text {
		font-size: var(--font-size-1);
	}

	.section-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		font-style: italic;
		opacity: 0.8;
		padding-left: calc(var(--font-size-0) + var(--spacing-4));
	}

	.offerings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-3);
	}

	@media (max-width: 768px) {
		.offerings-grid {
			grid-template-columns: 1fr;
		}
	}

	.activity-notice {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0);
		background: theme('colors.bg.mid');
		border: 2px dashed theme('colors.gold.border');
		border-radius: var(--spacing-3);
	}

	.notice-icon {
		font-size: 4rem;
		filter: grayscale(0.5);
		opacity: 0.5;
	}

	.notice-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1);
		opacity: 0.7;
	}

	.bottom-spacer {
		height: var(--spacing-0);
	}
</style>
