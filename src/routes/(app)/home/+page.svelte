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
		getRecommendedIntentions,
		intentions,
		activeIntentionId
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

	// Get active intention
	$: activeIntention = intentions.find((i) => i.intentionId === activeIntentionId) || null;

	// Get recent intentions sorted by potential attention
	$: recentIntentions = getRecentIntentionsByPotential();

	// Get recommended intentions
	$: recommendedIntentions = getRecommendedIntentions();

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}

	function getCategoryEmoji(category: string): string {
		const map: Record<string, string> = {
			'Organic Food & Nutrition': '🌱',
			'Land Stewardship': '🌳',
			'Off-Grid & Sustainable Living': '☀️',
			'Health & Vitality': '💪',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '🧘',
			'Creative Expression': '🎨'
		};
		return map[category] || '✨';
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
			<!-- Active Intention Card -->
			{#if activeIntention}
				<Section spacing="md">
					<button
						class="active-intention-card"
						on:click={() => handleViewIntention(activeIntention.intentionId)}
					>
						<div class="active-header">
							<span class="active-emoji">{getCategoryEmoji(activeIntention.category)}</span>
							<div class="active-content">
								<div class="active-title-row">
									<h3 class="active-title">{activeIntention.title}</h3>
									<span class="active-badge">ACTIVE INTENTION</span>
								</div>
								<p class="active-description">{activeIntention.description}</p>
							</div>
						</div>
						<div class="active-stats">
							<span class="active-stat"
								>{activeIntention.stats.totalAttentionHours.toLocaleString()}h total</span
							>
							<span class="divider">•</span>
							<span class="active-stat">{activeIntention.stats.participantCount} participants</span
							>
						</div>
					</button>
				</Section>
			{/if}

			<!-- Intentions (sorted by potential attention) -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="⚡" title="Recent Intentions" />

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
		overflow: visible; /* Allow glow to extend beyond container */
	}

	/* Banner at top of dashboard - full screen width */
	.home-banner {
		position: relative;
		width: 100%; /* Full screen width */
		height: 0;
		padding-bottom: 50%; /* Taller aspect ratio to show full image */
		background-image: url('/syncengine.png');
		background-size: contain; /* Changed to contain to show full image */
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.9; /* Prominent but not overwhelming */
		pointer-events: none;
		margin-bottom: 0;
		z-index: 1;
		filter: drop-shadow(0 0 15px rgba(0, 255, 209, 0.5))
			drop-shadow(0 0 25px rgba(0, 255, 209, 0.3))
			drop-shadow(0 0 35px rgba(0, 255, 209, 0.2));
		overflow: visible; /* Allow glow to spread */
	}

	@media (min-width: 768px) {
		.home-banner {
			padding-bottom: 35%; /* Adjusted aspect ratio for desktop */
		}
	}

	/* Content with padding restored */
	.home-content {
		padding: var(--spacing-3);
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

	/* Active Intention Card - Gold Glowing */
	.active-intention-card {
		width: 100%;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(0, 0, 0, 0.6));
		border: 2px solid rgba(212, 175, 55, 0.6);
		border-radius: 20px;
		padding: var(--spacing-2); /* 18px φ-based */
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		position: relative;
		overflow: hidden;
		animation: gold-pulse var(--duration-0) ease-in-out infinite; /* 3s φ-based pulsing */
	}

	/* Rotating gradient background effect */
	.active-intention-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
		animation: rotate-gradient 8s linear infinite;
		pointer-events: none;
		z-index: 0;
	}

	@keyframes gold-pulse {
		0%,
		100% {
			box-shadow:
				0 0 20px rgba(212, 175, 55, 0.4),
				0 0 40px rgba(212, 175, 55, 0.2),
				inset 0 0 30px rgba(212, 175, 55, 0.15);
			border-color: rgba(212, 175, 55, 0.6);
		}
		50% {
			box-shadow:
				0 0 30px rgba(212, 175, 55, 0.6),
				0 0 60px rgba(212, 175, 55, 0.4),
				inset 0 0 50px rgba(212, 175, 55, 0.25);
			border-color: rgba(212, 175, 55, 0.9);
		}
	}

	@keyframes rotate-gradient {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.active-intention-card:hover {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(0, 0, 0, 0.7));
		border-color: rgba(212, 175, 55, 1);
		transform: translateY(-4px);
		box-shadow:
			0 0 40px rgba(212, 175, 55, 0.7),
			0 0 80px rgba(212, 175, 55, 0.5),
			inset 0 0 60px rgba(212, 175, 55, 0.3);
	}

	.active-header {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3);
		position: relative;
		z-index: 1;
	}

	.active-emoji {
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		flex-shrink: 0;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.8));
	}

	.active-content {
		flex: 1;
		min-width: 0;
	}

	.active-title-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.active-title {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		color: theme('colors.gold.DEFAULT');
		margin: 0;
		line-height: 1.3;
		flex: 1;
	}

	.active-badge {
		display: inline-block;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.2));
		border: 1px solid rgba(212, 175, 55, 0.6);
		border-radius: 10px;
		padding: 4px var(--spacing-3); /* 4px vertical, 12px horizontal φ-based */
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 700;
		color: theme('colors.gold.DEFAULT');
		letter-spacing: 0.5px;
		text-transform: uppercase;
		flex-shrink: 0;
	}

	.active-description {
		color: theme('colors.cream.DEFAULT');
		opacity: 0.9;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.5;
		margin: 0;
	}

	.active-stats {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		position: relative;
		z-index: 1;
	}

	.active-stat {
		color: theme('colors.gold.DEFAULT');
		opacity: 0.8;
		font-weight: 600;
	}

	.divider {
		color: theme('colors.gold.DEFAULT');
		opacity: 0.3;
	}

</style>
