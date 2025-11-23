<script lang="ts">
	/**
	 * Tokens Page V2 - Billiard Ball Circle Packing
	 * Displays all tokens as circular coins that float and pack tightly
	 */
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import { userTokens, getIntentionById } from '$lib/data/mockData';
	import type { Token } from '$types';

	// V2 Components
	import CoinFlip from '$lib/components/v2/CoinFlip.svelte';

	// Circle packing
	import { calculateCoinSize } from '$lib/utils/logarithmicScale';
	import { packCircles, getPackedHeight, type PackedCircle } from '$lib/utils/circlePacking';

	// Sort tokens by attention hours (descending)
	$: sortedTokens = [...userTokens].sort((a, b) => b.computed.hours - a.computed.hours);

	// Track flipped state for each token
	let flippedTokens = new Set<string>();

	// Filter tokens for the Hand (only flipped ones)
	$: handTokens = sortedTokens.filter((token) => flippedTokens.has(token.tokenId));

	// Container dimensions
	let walletContainerWidth = 1000;
	let handContainerWidth = 1000;
	let walletContainerElement: HTMLDivElement;
	let handContainerElement: HTMLDivElement;

	// Packed circle positions for Wallet
	$: walletPackedCircles = packCircles(
		sortedTokens.map((token) => ({
			id: token.tokenId,
			radius: calculateCoinSize(token.computed.hours) / 2,
			data: token
		})),
		walletContainerWidth,
		2000,
		4
	);

	$: walletContainerHeight = getPackedHeight(walletPackedCircles, 4);

	// Packed circle positions for Hand
	$: handPackedCircles = packCircles(
		handTokens.map((token) => ({
			id: token.tokenId,
			radius: calculateCoinSize(token.computed.hours) / 2,
			data: token
		})),
		handContainerWidth,
		2000,
		4
	);

	$: handContainerHeight = getPackedHeight(handPackedCircles, 4);

	// Get image for token - use token's own media, or inherit from parent intention
	function getTokenImage(token: Token): string | undefined {
		// Check if token has valid media (not placeholder IPFS URLs)
		if (token.media && token.media.length > 0) {
			const firstMedia = token.media[0];
			// Skip placeholder IPFS URLs (they contain "...")
			if (!firstMedia.includes('...')) {
				return firstMedia;
			}
		}

		// Otherwise, inherit from parent intention
		const parentIntention = getIntentionById(token.intentionId);
		if (parentIntention?.media && parentIntention.media.length > 0) {
			return parentIntention.media[0];
		}

		return undefined;
	}

	// Scroll to bottom to show large coins
	function scrollToBottom(selector: string) {
		if (typeof document !== 'undefined') {
			const element = document.querySelector(selector) as HTMLElement;
			if (element) {
				setTimeout(() => {
					element.scrollTop = element.scrollHeight;
				}, 100);
			}
		}
	}

	// Reactive: scroll to bottom when coins change (only in browser)
	$: if (typeof document !== 'undefined' && walletPackedCircles.length > 0) {
		scrollToBottom('.wallet-section .section-content');
	}

	$: if (typeof document !== 'undefined' && handPackedCircles.length > 0) {
		scrollToBottom('.hand-section .section-content');
	}

	onMount(() => {
		activeTab.set('tokens');

		// Update container widths on resize
		const updateWidth = () => {
			if (walletContainerElement) {
				walletContainerWidth = walletContainerElement.clientWidth;
			}
			if (handContainerElement) {
				handContainerWidth = handContainerElement.clientWidth;
			}
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);

		// Initial scroll to bottom
		scrollToBottom('.wallet-section .section-content');
		scrollToBottom('.hand-section .section-content');

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});

	function handleCoinFlip(tokenId: string, isFlipped: boolean) {
		if (isFlipped) {
			flippedTokens.add(tokenId);
		} else {
			flippedTokens.delete(tokenId);
		}
		flippedTokens = flippedTokens; // Trigger reactivity
	}
</script>

<svelte:head>
	<title>Tokens V2 - Synchronicity Engine</title>
</svelte:head>

<div class="full-height-wrapper">
	<div class="tokens-v2-page">
	<!-- Wallet (Top 68.2%) -->
	<div class="wallet-section">
		<div class="section-content">
			{#if sortedTokens.length > 0}
				<div class="coins-container" bind:this={walletContainerElement}>
					<div class="coins-packed" style="height: {walletContainerHeight}px;">
						{#each walletPackedCircles as circle (circle.id)}
							{@const token = circle.data}
							<div
								class="coin-positioned"
								style="
									left: {circle.x}px;
									top: {circle.y}px;
									width: {circle.radius * 2}px;
									height: {circle.radius * 2}px;
								"
							>
								<CoinFlip
									attentionHours={token.computed.hours}
									imageUrl={getTokenImage(token)}
									title={token.title}
									description={token.description}
									isFlipped={flippedTokens.has(token.tokenId)}
									onFlip={(isFlipped) => handleCoinFlip(token.tokenId, isFlipped)}
								/>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">💎</div>
					<p class="empty-text">No tokens yet</p>
					<p class="empty-subtext">Start contributing to intentions to earn tokens</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Hand (Bottom 31.8%) -->
	<div class="hand-section">
		<div class="section-content">
			{#if handTokens.length > 0}
				<div class="coins-container" bind:this={handContainerElement}>
					<div class="coins-packed" style="height: {handContainerHeight}px;">
						{#each handPackedCircles as circle (circle.id)}
							{@const token = circle.data}
							<div
								class="coin-positioned"
								style="
									left: {circle.x}px;
									top: {circle.y}px;
									width: {circle.radius * 2}px;
									height: {circle.radius * 2}px;
								"
							>
								<CoinFlip
									attentionHours={token.computed.hours}
									imageUrl={getTokenImage(token)}
									title={token.title}
									description={token.description}
									isFlipped={true}
									onFlip={(isFlipped) => handleCoinFlip(token.tokenId, isFlipped)}
								/>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">🤲</div>
					<p class="empty-text">Hand is empty</p>
					<p class="empty-subtext">Flip tokens in your wallet to add them to your hand</p>
				</div>
			{/if}
		</div>
	</div>
	</div>
</div>

<style>
	.full-height-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.tokens-v2-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.wallet-section {
		flex: 682 1 0;
		min-height: 0;
		border-bottom: 2px solid theme('colors.gold.DEFAULT');
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.hand-section {
		flex: 318 1 0;
		min-height: 0;
		background: rgba(0, 0, 0, 0.3);
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.section-content {
		overflow-y: auto;
		overflow-x: hidden;
		flex: 1;
		min-height: 0;
	}

	/* Billiard ball container */
	.coins-container {
		width: 100%;
		height: 100%;
	}

	.coins-packed {
		position: relative;
		width: 100%;
		max-width: 100%;
		transition: height 0.3s ease-out;
		overflow: hidden;
	}

	.coin-positioned {
		position: absolute;
		transform: translate(-50%, -50%);
		animation: floatIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
		animation-fill-mode: both;
	}

	/* Stagger animation for coins */
	.coin-positioned:nth-child(1) {
		animation-delay: 0.05s;
	}
	.coin-positioned:nth-child(2) {
		animation-delay: 0.1s;
	}
	.coin-positioned:nth-child(3) {
		animation-delay: 0.15s;
	}
	.coin-positioned:nth-child(4) {
		animation-delay: 0.2s;
	}
	.coin-positioned:nth-child(5) {
		animation-delay: 0.25s;
	}
	.coin-positioned:nth-child(n + 6) {
		animation-delay: 0.3s;
	}

	@keyframes floatIn {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.3);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	/* Empty state */
	.empty-state {
		text-align: center;
		padding: var(--spacing-0);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-3);
	}

	.empty-icon {
		font-size: 4rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
		opacity: 0.5;
	}

	.empty-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		margin: 0;
	}

	.empty-subtext {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		margin: 0;
		opacity: 0.8;
	}
</style>
