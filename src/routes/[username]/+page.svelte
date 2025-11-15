<script lang="ts">
	import type { PageData } from './$types';
	import BioCard from '$lib/components/v2/BioCard.svelte';
	import ProfileGallery from '$lib/components/v2/ProfileGallery.svelte';
	import BottomNav from '$lib/components/v2/BottomNav.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	export let data: PageData;

	$: ({ user, visibleSections, userIntentions, canEdit } = data);

	// Mock tags for bio - in real app these would come from user data
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];
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
				<ProfileGallery
					intentions={visibleSections.intentions ? userIntentions : []}
					offerings={visibleSections.offerings ? user.offerings : []}
					canEdit={false}
				/>
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
</style>
