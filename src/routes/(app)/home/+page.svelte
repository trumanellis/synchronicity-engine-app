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
		getRecentIntentionsByPotential,
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

	// Get recent intentions sorted by potential attention
	$: recentIntentions = getRecentIntentionsByPotential();

	// Get recommended intentions
	$: recommendedIntentions = getRecommendedIntentions();

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}
</script>

<svelte:head>
	<title>Home - Synchronicity Engine</title>
</svelte:head>

<div class="home-page-wrapper">
	<!-- Banner at top of page - full width, outside padding -->
	<div class="home-banner" />

	<!-- Content with padding -->
	<div class="home-content">
		<Stack gap="md">
			<!-- Intentions (sorted by potential attention) -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="⚡" title="Intentions" />

					<Stack gap="sm">
						{#each recentIntentions as { intention, potentialHours }}
							<IntentionListItem
								{intention}
								potentialHours={potentialHours}
								showPotential={true}
								onClick={() => handleViewIntention(intention.intentionId)}
							/>
						{/each}
					</Stack>
				</Stack>
			</Section>

			<!-- Suggested Intentions -->
			<Section spacing="lg">
				<Stack gap="md">
					<SectionTitle icon="✨" title="Suggested" />

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
	</div>
</div>

<style>
	/* Home page wrapper - no padding */
	.home-page-wrapper {
		margin: calc(var(--spacing-3) * -1); /* Negative margin to cancel PageContainer padding */
	}

	/* Banner at top of dashboard - full edge to edge */
	.home-banner {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 56.25%; /* 16:9 aspect ratio for mobile */
		background-image: url('/Synchronicity Engine.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.8; /* Prominent but not overwhelming */
		pointer-events: none;
		margin-bottom: 0;
		z-index: 1;
		animation: pulse-golden var(--duration-0) ease-in-out infinite; /* 3s φ-based pulsing */
		filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
	}

	@media (min-width: 768px) {
		.home-banner {
			padding-bottom: 40%; /* Wider aspect ratio on desktop */
		}
	}

	/* Content with padding restored */
	.home-content {
		padding: var(--spacing-3);
	}

	@keyframes pulse-golden {
		0%,
		100% {
			filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6));
			opacity: 0.8;
		}
		50% {
			filter: drop-shadow(0 0 40px rgba(212, 175, 55, 1)) drop-shadow(0 0 60px rgba(212, 175, 55, 0.8));
			opacity: 0.9;
		}
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
