<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getIntentionById } from '$data/mockData';
	import type { Intention, ViewMode } from '$types';

	// Components
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import ActivityItem from '$components/core/ActivityItem.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';

	let currentView: ViewMode = 'discovery';
	let intention: Intention | undefined;

	onMount(() => {
		const intentionId = $page.params.id;
		if (intentionId) {
			intention = getIntentionById(intentionId);
		}
	});

	function switchView(view: ViewMode) {
		currentView = view;
	}
</script>

<svelte:head>
	<title>{intention?.title || 'Intention'} - Synchronicity Engine</title>
</svelte:head>

<div class="min-h-screen pb-24">
	{#if intention}
		<div class="phone-mockup">
			<div class="screen-content">
				{#if currentView === 'discovery'}
					<!-- Discovery View -->
					<div class="intention-badge">
						<span>🔥</span>
						<span>ACTIVE INTENTION</span>
					</div>

					<h1 class="intention-title">{intention.title}</h1>
					<p class="intention-subtitle">{intention.description}</p>

					<div class="stats-row">
						<div class="stat-box">
							<div class="stat-label">Hours</div>
							<div class="stat-value">{intention.stats.totalAttentionHours.toLocaleString()}h</div>
						</div>
						<div class="stat-box">
							<div class="stat-label">People</div>
							<div class="stat-value">{intention.stats.participantCount}</div>
						</div>
						<div class="stat-box">
							<div class="stat-label">Active</div>
							<div class="stat-value">{intention.stats.activeDays}d</div>
						</div>
					</div>

					<SectionTitle icon="📋" title="Overview" />

					<div class="content-box mb-4">
						<p class="content-text">{intention.description}</p>
					</div>

					<div class="info-box">
						<div class="info-box-title">
							<span>💡</span>
							<span>High Impact Opportunity</span>
						</div>
						<div class="info-box-content">
							This Intention has accumulated <strong
								>{intention.stats.totalAttentionHours.toLocaleString()} hours</strong
							>
							of collective attention. Fulfilling requests here earns Tokens with higher gratitude value.
						</div>
					</div>

					<div class="action-buttons mt-6">
						<ActionButton variant="primary" fullWidth={true}>Offer Help</ActionButton>
						<ActionButton variant="secondary" fullWidth={true}>Join Chat</ActionButton>
					</div>
				{:else if currentView === 'details'}
					<!-- Details View - Top Contributors -->
					<h2 class="text-gold text-xl font-bold mb-4">Top Contributors</h2>
					<div class="participants-list">
						{#each intention.topContributors as contributor}
							<div class="participant-card">
								<div class="participant-avatar">{contributor.avatar}</div>
								<div class="participant-info">
									<div class="participant-name">{contributor.name}</div>
									<div class="participant-meta">{contributor.hours}h • {contributor.role}</div>
								</div>
							</div>
						{/each}
					</div>
				{:else if currentView === 'activity'}
					<!-- Activity View -->
					<SectionTitle icon="📊" title="Recent Activity" />
					<div class="activity-feed">
						{#each intention.recentActivity as activity}
							<ActivityItem {activity} />
						{/each}
					</div>
				{:else if currentView === 'participation'}
					<!-- Your Impact View -->
					<h2 class="text-gold text-xl font-bold mb-4">Your Journey</h2>
					<p class="text-sage">You haven't participated in this intention yet.</p>
					<ActionButton variant="primary" fullWidth={true} onClick={() => switchView('discovery')}
						>Get Started</ActionButton
					>
				{/if}

				<!-- View Tabs -->
				<div class="view-tabs">
					<button
						class="tab-button"
						class:active={currentView === 'discovery'}
						on:click={() => switchView('discovery')}
					>
						Discovery
					</button>
					<button
						class="tab-button"
						class:active={currentView === 'details'}
						on:click={() => switchView('details')}
					>
						Details
					</button>
					<button
						class="tab-button"
						class:active={currentView === 'activity'}
						on:click={() => switchView('activity')}
					>
						Activity
					</button>
					<button
						class="tab-button"
						class:active={currentView === 'participation'}
						on:click={() => switchView('participation')}
					>
						Your Impact
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="phone-mockup">
			<div class="screen-content">
				<h1 class="text-gold text-2xl font-bold mb-4">Intention Not Found</h1>
				<ActionButton variant="primary" onClick={() => goto('/browse')}>Back to Browse</ActionButton
				>
			</div>
		</div>
	{/if}

	<BottomNav />
</div>

<style>
	.intention-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.75rem;
		padding: 0.5rem 1rem;
		margin-bottom: 1rem;
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.85rem;
		font-weight: 600;
		box-shadow: theme('boxShadow.glow-cyan');
	}

	.intention-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		text-shadow: theme('boxShadow.glow-gold');
		line-height: 1.3;
	}

	.intention-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.stat-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 0.75rem;
		text-align: center;
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.25rem;
		font-weight: 700;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.content-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.7;
		font-size: 0.95rem;
	}

	.info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: 1rem;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.9rem;
		line-height: 1.7;
	}

	.info-box-content strong {
		color: theme('colors.gold.DEFAULT');
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.participants-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.participant-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 0.75rem;
		transition: all 0.2s ease;
	}

	.participant-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.participant-avatar {
		width: 40px;
		height: 40px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.participant-info {
		flex: 1;
	}

	.participant-name {
		color: theme('colors.cream.DEFAULT');
		font-weight: 500;
		font-size: 0.9rem;
	}

	.participant-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.activity-feed {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.view-tabs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid theme('colors.cyan.border');
	}

	.tab-button {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
		padding: 0.75rem 0.5rem;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.7rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
	}

	.tab-button.active {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	@media (max-width: 768px) {
		.action-buttons {
			grid-template-columns: 1fr;
		}

		.view-tabs {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
