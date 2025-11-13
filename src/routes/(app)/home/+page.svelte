<script lang="ts">
	/**
	 * Home Page - V2 Redesign
	 * Game-like dashboard with active intention hero card
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import {
		getRecentIntentionsByUnreleased,
		getRecommendedIntentions
	} from '$data/mockData';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V2 Components
	import IntentionListItem from '$lib/components/v2/IntentionListItem.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// Set active tab
	onMount(() => {
		activeTab.set('home');
	});

	// Get recent intentions sorted by unreleased attention
	$: recentIntentions = getRecentIntentionsByUnreleased();

	// Get recommended intentions
	$: recommendedIntentions = getRecommendedIntentions();

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}
</script>

<svelte:head>
	<title>Home - Synchronicity Engine</title>
</svelte:head>

<Stack gap="md">
	<!-- Recent Intentions (sorted by unreleased attention) -->
	<Section spacing="md">
		<Stack gap="md">
			<div class="section-header">
				<SectionTitle icon="⚡" title="Recent Intentions" />
				<span class="sort-label">Sorted by unreleased</span>
			</div>

			<Stack gap="sm">
				{#each recentIntentions as { intention, unreleasedHours }}
					<IntentionListItem
						{intention}
						{unreleasedHours}
						showUnreleased={true}
						onClick={() => handleViewIntention(intention.intentionId)}
					/>
				{/each}
			</Stack>
		</Stack>
	</Section>

	<!-- Recommended Intentions -->
	<Section spacing="lg">
		<Stack gap="md">
			<div class="section-header">
				<SectionTitle icon="✨" title="Recommended For You" />
				<span class="sort-label">From community</span>
			</div>

			<Stack gap="sm">
				{#each recommendedIntentions as intention}
					<IntentionListItem
						{intention}
						isRecommended={true}
						recommendationReason={intention.recommendationReason}
						onClick={() => handleViewIntention(intention.intentionId)}
					/>
				{/each}
			</Stack>

			<div class="view-more">
				<button class="view-more-link" on:click={() => goto('/browse')}>
					Browse all intentions →
				</button>
			</div>
		</Stack>
	</Section>
</Stack>

<style>
	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.sort-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: theme('colors.sage.DEFAULT');
		opacity: 0.6;
		font-weight: 600;
	}

	.view-more {
		text-align: center;
		margin-top: 0.5rem;
	}

	.view-more-link {
		background: none;
		border: none;
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: theme('fontFamily.exo');
	}

	.view-more-link:hover {
		text-shadow: 0 0 10px theme('colors.cyan.glow');
	}
</style>
