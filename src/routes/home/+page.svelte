<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { userStats } from '$stores/userStore';
	import { recentActivity, intentions } from '$data/mockData';

	// Components
	import TempleHeader from '$components/core/TempleHeader.svelte';
	import CountdownCard from '$components/core/CountdownCard.svelte';
	import StatCard from '$components/core/StatCard.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import ActivityItem from '$components/core/ActivityItem.svelte';
	import IntentionCard from '$components/core/IntentionCard.svelte';
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

<div class="min-h-screen pb-24">
	<div class="phone-mockup">
		<div class="screen-content">
			<TempleHeader />

			<CountdownCard />

			<!-- Personal Stats -->
			<div class="stats-grid mb-6">
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

			<!-- Quick Actions -->
			<div class="quick-actions mb-6">
				<ActionButton variant="primary" icon="✨" onClick={handleCreateIntention}>
					Create Intention
				</ActionButton>
				<ActionButton variant="secondary" icon="🏆" onClick={handleBidTokens}>
					Bid Tokens
				</ActionButton>
			</div>

			<!-- Recent Activity -->
			<SectionTitle icon="⚡" title="Recent Activity" />

			<div class="activity-feed mb-4">
				{#each recentActivity as activity}
					<ActivityItem {activity} />
				{/each}
			</div>

			<div class="view-more mb-6">
				<button class="view-more-link" on:click={handleViewAllActivity}>
					View all activity →
				</button>
			</div>

			<!-- Featured Intentions -->
			<SectionTitle icon="🔥" title="Trending Intentions" />

			<div class="intentions-preview mb-4">
				{#each featuredIntentions as intention}
					<IntentionCard {intention} onClick={() => handleViewIntention(intention.intentionId)} />
				{/each}
			</div>

			<div class="view-more">
				<button class="view-more-link" on:click={() => goto('/browse')}>
					Browse all intentions →
				</button>
			</div>
		</div>
	</div>

	<BottomNav />
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.quick-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.activity-feed {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.intentions-preview {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
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
