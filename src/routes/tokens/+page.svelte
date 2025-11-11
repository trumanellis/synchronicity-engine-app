<script lang="ts">
	/**
	 * Tokens Page - Iteration 1
	 * Uses PageContainer and v1 components built with layout primitives
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
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V0 Components (not yet rebuilt)
	import TokenCard from '$components/core/TokenCard.svelte';
	import TokenFilterBar from '$components/core/TokenFilterBar.svelte';
	import DistributionPrep from '$components/core/DistributionPrep.svelte';
	import EmptyState from '$components/core/EmptyState.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';

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

<div class="tokens-page">
	<PageContainer maxWidth="xl">
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
	</PageContainer>

	<BottomNav />
</div>

<style>
	.tokens-page {
		min-height: 100vh;
		padding-bottom: 5rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0;
	}

	.page-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.875rem;
		margin: 0;
	}

	.total-hours-card {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%);
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 1rem;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 0 30px theme('colors.gold.glow');
	}

	.total-hours-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.75rem;
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
		font-size: 2rem;
		flex-shrink: 0;
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.total-hours-info {
		flex: 1;
	}

	.total-hours-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.total-hours-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 2rem;
		font-weight: 700;
		text-shadow: 0 0 20px theme('colors.gold.glow');
		line-height: 1;
	}

	.total-hours-subtext {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		text-align: center;
		padding-top: 0.75rem;
		border-top: 1px solid theme('colors.gold.border');
	}
</style>
