<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import {
		filteredTokens,
		activeTokenFilter,
		totalAvailableHours
	} from '$stores/tokensStore';
	import type { TokenFilter } from '$types';

	// Components
	import SectionTitle from '$components/core/SectionTitle.svelte';
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

<div class="min-h-screen pb-24">
	<div class="phone-mockup">
		<div class="screen-content">
			<!-- Page Header -->
			<div class="mb-4">
				<h1 class="text-gold text-2xl font-bold mb-2">My Tokens</h1>
				<p class="text-sage text-sm">
					Gratitude tokens earned through service and contribution
				</p>
			</div>

			<!-- Total Available Display -->
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

			<!-- Filter Bar -->
			<TokenFilterBar activeFilter={$activeTokenFilter} onFilterChange={handleFilterChange} />

			<!-- Section Title -->
			<SectionTitle
				icon="🎯"
				title={`${$filteredTokens.length} Token${$filteredTokens.length !== 1 ? 's' : ''}`}
			/>

			<!-- Tokens List -->
			<div class="tokens-list">
				{#if hasTokens}
					{#each $filteredTokens as token (token.tokenId)}
						<div class="animate-fade-in">
							<TokenCard
								{token}
								onClick={() => handleTokenClick(token.tokenId)}
								isSelected={selectedTokenIds.has(token.tokenId)}
							/>
						</div>
					{/each}
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
			</div>

			<!-- Distribution Preparation (only show if there are available tokens) -->
			{#if availableTokens.length > 0}
				<DistributionPrep
					selectedTokensCount={selectedTokenIds.size}
					{selectedHours}
					onPrepareClick={handlePrepareClick}
				/>
			{/if}
		</div>
	</div>

	<BottomNav />
</div>

<style>
	.tokens-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
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
