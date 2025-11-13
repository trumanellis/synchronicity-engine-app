<script lang="ts">
	/**
	 * Browse Detail Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getIntentionById, getProofsByIntention, currentUser } from '$data/mockData';
	import type { Intention, ViewMode, ProofOfService } from '$types';

	// Components
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import ActivityItem from '$components/core/ActivityItem.svelte';
	import ProofGallery from '$lib/components/v2/ProofGallery.svelte';

	let currentView: ViewMode = 'discovery';
	let intention: Intention | undefined;
	let allProofs: ProofOfService[] = [];
	let userProofs: ProofOfService[] = [];

	onMount(() => {
		const intentionId = $page.params.id;
		if (intentionId) {
			intention = getIntentionById(intentionId);
			if (intention) {
				allProofs = getProofsByIntention(intentionId);
				userProofs = allProofs.filter((p) => p.userId === currentUser.userId);
			}
		}
	});

	function switchView(view: ViewMode) {
		currentView = view;
	}

	function handleSubmitProof() {
		if (intention) {
			goto(`/browse/${intention.intentionId}/submit-proof`);
		}
	}
</script>

<svelte:head>
	<title>{intention?.title || 'Intention'} - Synchronicity Engine</title>
</svelte:head>

{#if intention}
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
			<ActionButton variant="primary" fullWidth={true} onClick={handleSubmitProof}
				>Submit Proof of Service</ActionButton
			>
			<ActionButton variant="secondary" fullWidth={true}>Join Chat</ActionButton>
		</div>
	{:else if currentView === 'details'}
		<!-- Details View - Top Contributors -->
		<h2 class="page-title">Top Contributors</h2>
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

		<!-- All Proofs for this Intention -->
		{#if allProofs.length > 0}
			<SectionTitle icon="✓" title="Community Proofs" />
			<ProofGallery proofs={allProofs} />
		{/if}
	{:else if currentView === 'participation'}
		<!-- Your Impact View -->
		<h2 class="page-title">Your Journey</h2>

		{#if userProofs.length > 0}
			<p class="page-subtitle">
				You've submitted {userProofs.length} proof{userProofs.length !== 1 ? 's' : ''} of service for
				this intention.
			</p>

			<SectionTitle icon="✓" title="Your Proofs" />
			<ProofGallery proofs={userProofs} />

			<div class="action-buttons mt-6">
				<ActionButton variant="primary" fullWidth={true} onClick={handleSubmitProof}
					>Submit Another Proof</ActionButton
				>
			</div>
		{:else}
			<p class="page-subtitle">You haven't participated in this intention yet.</p>
			<ActionButton variant="primary" fullWidth={true} onClick={handleSubmitProof}
				>Submit Proof of Service</ActionButton
			>
		{/if}
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
{:else}
	<h1 class="page-title">Intention Not Found</h1>
	<ActionButton variant="primary" onClick={() => goto('/browse')}>Back to Browse</ActionButton>
{/if}

<style>
	.intention-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		margin-bottom: var(--spacing-3); /* 12px φ-based */
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		box-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.intention-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 700;
		margin-bottom: var(--spacing-4); /* 8px φ-based */
		text-shadow: 0 0 15px theme('colors.gold.glow');
		line-height: 1.3;
	}

	.intention-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		opacity: 0.9;
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin-bottom: var(--spacing-3); /* 12px φ-based */
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.page-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		opacity: 0.85;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.stat-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		text-align: center;
		transition: all 0.2s ease;
	}

	.stat-box:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
		opacity: 0.8;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.content-box {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
	}

	.content-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.7;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		opacity: 0.9;
	}

	.info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		margin-bottom: var(--spacing-4); /* 8px φ-based */
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		line-height: 1.7;
		opacity: 0.9;
	}

	.info-box-content strong {
		color: theme('colors.gold.DEFAULT');
		font-weight: 700;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: var(--spacing-2); /* 18px φ-based */
	}

	.participants-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.participant-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		transition: all 0.2s ease;
	}

	.participant-card:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
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
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
		filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
	}

	.participant-info {
		flex: 1;
	}

	.participant-name {
		color: theme('colors.cream.DEFAULT');
		font-weight: 500;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.participant-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	.activity-feed {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.view-tabs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: var(--spacing-1); /* 30px φ-based */
		padding-top: var(--spacing-3); /* 12px φ-based */
		border-top: 1px solid theme('colors.gold.border');
	}

	.tab-button {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		border-color: theme('colors.gold.DEFAULT');
		color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
	}

	.tab-button.active {
		background: theme('colors.gold.bg');
		border-color: theme('colors.gold.DEFAULT');
		color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.mb-4 {
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.mt-6 {
		margin-top: var(--spacing-2); /* 18px φ-based */
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
