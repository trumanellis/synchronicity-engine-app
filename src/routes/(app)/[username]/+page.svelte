<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import { intentions, potentialAttention, getUpcomingItinerary, getVisibleItineraryItems } from '$lib/data/mockData';

	import ProfileCard from '$lib/components/v2/ProfileCard.svelte';
	import ItinerarySection from '$lib/components/v2/ItinerarySection.svelte';
	import ProfileGallery from '$lib/components/v2/ProfileGallery.svelte';
	import SubstackGallery from '$lib/components/v2/SubstackGallery.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
	$: isPublicView = data.isPublicView;

	onMount(() => {
		activeTab.set('profile');
	});

	// Get user's intentions (ones they have potential attention for)
	// For public view, only show if visibility allows
	$: userIntentions = intentions.filter((i) => potentialAttention[i.intentionId] !== undefined);

	// Get upcoming itinerary items (filtered by public visibility for public view)
	$: upcomingItinerary = isPublicView ? getVisibleItineraryItems('public') : getUpcomingItinerary();

	// Mock tags for bio
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];

	// Determine if sections should be visible based on user's visibility settings
	function isVisible(section: string): boolean {
		if (!isPublicView) return true; // Internal view sees everything

		const visibility = user.profileVisibility[section];
		return visibility === 'public';
	}
</script>

<svelte:head>
	<title>{user.name} - Synchronicity Engine</title>
</svelte:head>

<div class="profile-page">
	<Stack gap="md">
		<!-- Bio Card -->
		<Section spacing="md">
			<ProfileCard user={user} canEdit={!isPublicView} tags={bioTags} />
		</Section>

		<!-- Itinerary Section -->
		{#if upcomingItinerary.length > 0 && isVisible('activity')}
			<Section spacing="md">
				<ItinerarySection items={upcomingItinerary} canEdit={!isPublicView} />
			</Section>
		{/if}

		<!-- Tabbed Gallery: Intentions & Offerings -->
		{#if isVisible('intentions') || isVisible('offerings')}
			<Section spacing="md">
				<ProfileGallery
					intentions={isVisible('intentions') ? userIntentions : []}
					offerings={isVisible('offerings') ? user.offerings : []}
					canEdit={!isPublicView}
				/>
			</Section>
		{/if}

		<!-- Substack Articles Gallery -->
		{#if user.substackUrl && isVisible('activity')}
			<Section spacing="md">
				<SubstackGallery substackUrl={user.substackUrl} canEdit={!isPublicView} />
			</Section>
		{/if}

		<!-- Settings Section - Only visible in internal view -->
		{#if !isPublicView}
			<Section spacing="md">
				<Stack gap="sm">
					<div class="section-header">
						<div class="section-title">
							<span>⚙️</span>
							<span>Settings</span>
						</div>
					</div>
					<Stack gap="sm">
						<button class="settings-button" on:click={() => alert('Privacy settings')}>
							<span class="settings-icon">🔒</span>
							<span class="settings-label">Privacy & Visibility</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button" on:click={() => alert('Payment methods')}>
							<span class="settings-icon">💳</span>
							<span class="settings-label">Payment Methods</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button" on:click={() => alert('Notifications')}>
							<span class="settings-icon">🔔</span>
							<span class="settings-label">Notifications</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button danger" on:click={() => alert('Logout')}>
							<span class="settings-icon">🚪</span>
							<span class="settings-label">Logout</span>
							<span class="settings-arrow">›</span>
						</button>
					</Stack>
				</Stack>
			</Section>
		{/if}
	</Stack>
</div>

<style>
	.profile-page {
		/* Layout provided by Stack and Section primitives */
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

	/* Settings Buttons */
	.settings-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4);
		padding: var(--spacing-3);
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.settings-button:hover {
		border-color: theme('colors.gold.DEFAULT');
		background: rgba(212, 175, 55, 0.05);
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
	}

	.settings-button.danger {
		border-color: rgba(255, 99, 71, 0.3);
	}

	.settings-button.danger:hover {
		border-color: rgba(255, 99, 71, 0.6);
		background: rgba(255, 99, 71, 0.05);
	}

	.settings-icon {
		font-size: var(--font-size-1);
		flex-shrink: 0;
	}

	.settings-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 500;
		flex: 1;
	}

	.settings-button.danger .settings-label {
		color: rgba(255, 99, 71, 1);
	}

	.settings-arrow {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1);
		flex-shrink: 0;
	}
</style>
