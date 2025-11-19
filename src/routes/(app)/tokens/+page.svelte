<script lang="ts">
	/**
	 * Tokens Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import {
		filteredTokens,
		activeTokenFilter,
		totalAvailableHours
	} from '$stores/tokensStore';
	import type { TokenFilter } from '$types';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V0 Components (not yet rebuilt)
	import TokenCard from '$components/core/TokenCard.svelte';
	import TokenFilterBar from '$components/core/TokenFilterBar.svelte';
	import DistributionPrep from '$components/core/DistributionPrep.svelte';
	import EmptyState from '$components/core/EmptyState.svelte';

	// State
	let selectedTokenIds = new Set<string>();

	onMount(() => {
		activeTab.set('tokens');
	});

	function handleFilterChange(filter: TokenFilter) {
		activeTokenFilter.set(filter);
	}

	function handleTokenClick(tokenId: string) {
		// Toggle selection for available tokens only
		const token = $filteredTokens.find((t) => t.tokenId === tokenId);
		if (token?.status === 'available') {
			if (selectedTokenIds.has(tokenId)) {
				selectedTokenIds.delete(tokenId);
			} else {
				selectedTokenIds.add(tokenId);
			}
			selectedTokenIds = selectedTokenIds; // Trigger reactivity
		}
	}

	function handlePrepareClick() {
		if (selectedTokenIds.size > 0) {
			alert(
				`Distribution preparation would happen here!\n\nSelected ${selectedTokenIds.size} tokens with ${selectedHours}h total.`
			);
		}
	}

	$: availableTokens = $filteredTokens.filter((t) => t.status === 'available');
	$: selectedHours = $filteredTokens
		.filter((t) => selectedTokenIds.has(t.tokenId))
		.reduce((sum, t) => sum + t.computed.hours, 0);
	$: hasTokens = $filteredTokens.length > 0;
</script>

<svelte:head>
	<title>My Tokens - Synchronicity Engine</title>
</svelte:head>

<div class="tokens-page-wrapper">
	<!-- Banner at top of page - full width, outside padding -->
	<div class="tokens-banner" />

	<!-- Content with padding -->
	<div class="tokens-content">
		<Stack gap="lg">
	<!-- Page Header -->
	<Section spacing="sm">
		<Stack gap="sm">
			<h1 class="page-title">My Tokens</h1>
			<p class="page-subtitle">
				Gratitude tokens earned through service and contribution
			</p>
		</Stack>
	</Section>

	<!-- Total Available Display -->
	<Section spacing="sm">
		<div class="total-hours-card">
			<div class="total-hours-content">
				<div class="total-hours-icon">💎</div>
				<div class="total-hours-info">
					<div class="total-hours-label">Total Available Hours</div>
					<div class="total-hours-value">{$totalAvailableHours}h</div>
				</div>
			</div>
			<div class="total-hours-subtext">
				{availableTokens.length} token{availableTokens.length !== 1 ? 's' : ''} ready for distribution
			</div>
		</div>
	</Section>

	<!-- Filter Bar -->
	<TokenFilterBar activeFilter={$activeTokenFilter} onFilterChange={handleFilterChange} />

	<!-- Section Title -->
	<Section spacing="sm">
		<SectionTitle
			icon="🎯"
			title={`${$filteredTokens.length} Token${$filteredTokens.length !== 1 ? 's' : ''}`}
		/>
	</Section>

	<!-- Tokens List -->
	<Section spacing="lg">
		{#if hasTokens}
			<Stack gap="md">
				{#each $filteredTokens as token (token.tokenId)}
					<div class="animate-fade-in">
						<TokenCard
							{token}
							onClick={() => handleTokenClick(token.tokenId)}
							isSelected={selectedTokenIds.has(token.tokenId)}
						/>
					</div>
				{/each}
			</Stack>
		{:else}
			<EmptyState
				icon="💎"
				title="No tokens found"
				message={$activeTokenFilter === 'all'
					? 'Start contributing to intentions to earn tokens'
					: `No ${$activeTokenFilter} tokens yet`}
				actionText="Browse Intentions"
				onAction={() => (window.location.href = '/browse')}
			/>
		{/if}
	</Section>

	<!-- Distribution Preparation (only show if there are available tokens) -->
	{#if availableTokens.length > 0}
		<Section spacing="lg">
			<DistributionPrep
				selectedTokensCount={selectedTokenIds.size}
				{selectedHours}
				onPrepareClick={handlePrepareClick}
			/>
		</Section>
	{/if}
		</Stack>
	</div>
</div>

<style>
	/* Tokens page wrapper - no padding */
	.tokens-page-wrapper {
		margin: calc(var(--spacing-3) * -1); /* Negative margin to cancel PageContainer padding */
		overflow: visible; /* Allow glow to extend beyond container */
	}

	/* Banner at top of dashboard - full screen width */
	.tokens-banner {
		position: relative;
		width: 100%; /* Full screen width */
		height: 0;
		padding-bottom: 50%; /* Taller aspect ratio to show full image */
		background-image: url('/ArtifactsBanner.png');
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
		.tokens-banner {
			padding-bottom: 35%; /* Adjusted aspect ratio for desktop */
		}
	}

	/* Content with padding restored */
	.tokens-content {
		padding: var(--spacing-3);
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.page-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		margin: 0;
		opacity: 0.85;
	}

	.total-hours-card {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%);
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-2); /* 18px φ-based */
		box-shadow: 0 0 30px theme('colors.gold.glow');
		animation: glow-pulse var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	@keyframes glow-pulse {
		0%,
		100% {
			box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
		}
		50% {
			box-shadow: 0 0 40px rgba(212, 175, 55, 0.7);
		}
	}

	.total-hours-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.total-hours-icon {
		width: 56px;
		height: 56px;
		background: theme('colors.gold.bg');
		border: 3px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		flex-shrink: 0;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.total-hours-info {
		flex: 1;
	}

	.total-hours-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
		opacity: 0.8;
	}

	.total-hours-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 700;
		text-shadow: 0 0 20px theme('colors.gold.glow');
		line-height: 1;
	}

	.total-hours-subtext {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		text-align: center;
		padding-top: var(--spacing-4); /* 8px φ-based */
		border-top: 1px solid theme('colors.gold.border');
		opacity: 0.8;
	}
</style>
