<script lang="ts">
	/**
	 * Home Page - Iteration 1
	 * Uses PageContainer and v1 components built with layout primitives
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { userStats } from '$stores/userStore';
	import { recentActivity, intentions } from '$data/mockData';

	// Layout Primitives
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';
	import IntentionCard from '$lib/components/v1/IntentionCard.svelte';

	// V0 Components (not yet rebuilt)
	import TempleHeader from '$components/core/TempleHeader.svelte';
	import CountdownCard from '$components/core/CountdownCard.svelte';
	import StatCard from '$components/core/StatCard.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import ActivityItem from '$components/core/ActivityItem.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';

	// Set active tab
	onMount(() => {
		activeTab.set('home');
	});

	// Featured intentions (top 2 by attention)
	$: featuredIntentions = intentions
		.sort((a, b) => b.stats.totalAttentionHours - a.stats.totalAttentionHours)
		.slice(0, 2);

	function handleCreateIntention() {
		goto('/create');
	}

	function handleBidTokens() {
		goto('/tokens');
	}

	function handleViewAllActivity() {
		goto('/browse');
	}

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}
</script>

<svelte:head>
	<title>Home - Synchronicity Engine</title>
</svelte:head>

<div class="home-page">
	<PageContainer maxWidth="xl">
		<Stack gap="lg">
			<TempleHeader />

			<CountdownCard />

			<!-- Personal Stats -->
			<Section spacing="sm">
				<div class="stats-grid">
					<StatCard
						icon="💎"
						value={$userStats.tokensHeld}
						label="Tokens"
						onClick={() => goto('/tokens')}
					/>
					<StatCard
						icon="🎯"
						value={$userStats.activeIntentions}
						label="Active"
						onClick={() => goto('/browse')}
					/>
					<StatCard
						icon="🤝"
						value={$userStats.connections}
						label="Connects"
						onClick={() => goto('/profile')}
					/>
				</div>
			</Section>

			<!-- Quick Actions -->
			<Section spacing="sm">
				<div class="quick-actions">
					<ActionButton variant="primary" icon="✨" onClick={handleCreateIntention}>
						Create Intention
					</ActionButton>
					<ActionButton variant="secondary" icon="🏆" onClick={handleBidTokens}>
						Bid Tokens
					</ActionButton>
				</div>
			</Section>

			<!-- Recent Activity -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="⚡" title="Recent Activity" />

					<Stack gap="md">
						{#each recentActivity as activity}
							<ActivityItem {activity} />
						{/each}
					</Stack>

					<div class="view-more">
						<button class="view-more-link" on:click={handleViewAllActivity}>
							View all activity →
						</button>
					</div>
				</Stack>
			</Section>

			<!-- Featured Intentions -->
			<Section spacing="lg">
				<Stack gap="md">
					<SectionTitle icon="🔥" title="Trending Intentions" />

					<Stack gap="md">
						{#each featuredIntentions as intention}
							<IntentionCard
								{intention}
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
	</PageContainer>

	<BottomNav />
</div>

<style>
	.home-page {
		min-height: 100vh;
		padding-bottom: 5rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		width: 100%;
	}

	.quick-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		width: 100%;
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

	@media (max-width: 768px) {
		.quick-actions {
			grid-template-columns: 1fr;
		}
	}
</style>
