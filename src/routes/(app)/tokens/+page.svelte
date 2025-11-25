<script lang="ts">
	/**
	 * Tokens Page - Tabbed Interface
	 * Tab 1: Wallet - Displays user tokens as circular coins with physics-based packing
	 * Tab 2: Intentions - Browse all intentions with search/filter/sort
	 * Tab 3: Offerings - Browse all offerings with search/filter/sort
	 */
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { userTokens, getIntentionById, intentions, offerings } from '$lib/data/mockData';
	import type { Token, FilterCategory } from '$types';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SearchBar from '$lib/components/v1/SearchBar.svelte';
	import FilterChips from '$lib/components/v1/FilterChips.svelte';
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V2 Components
	import CoinFlip from '$lib/components/v2/CoinFlip.svelte';
	import TabSwitcher from '$lib/components/v2/TabSwitcher.svelte';
	import IntentionCard from '$lib/components/v2/IntentionCard.svelte';
	import OfferingCard from '$lib/components/v2/OfferingCard.svelte';
	import CardGallery from '$lib/components/v2/CardGallery.svelte';

	// Circle packing
	import { calculateCoinSize } from '$lib/utils/logarithmicScale';
	import { packCircles, getPackedHeight, type PackedCircle } from '$lib/utils/circlePacking';

	// Time formatting
	import { formatTimeSignificant } from '$lib/utils/timeFormatting';

	// ========== TAB STATE ==========
	let currentTab: 'wallet' | 'intentions' | 'offerings' = 'wallet';

	// ========== WALLET TAB STATE (existing logic) ==========
	// Sort tokens by attention hours (descending)
	$: sortedTokens = [...userTokens].sort((a, b) => b.computed.hours - a.computed.hours);

	// Track flipped state for each token
	let flippedTokens = new Set<string>();

	// Filter tokens for the Hand (only flipped ones)
	$: handTokens = sortedTokens.filter((token) => flippedTokens.has(token.tokenId));

	// Calculate sum of attention hours for heads coins in each panel
	$: walletHeadsSum = sortedTokens
		.filter((token) => !flippedTokens.has(token.tokenId))
		.reduce((sum, token) => sum + token.computed.hours, 0);

	$: handHeadsSum = handTokens.reduce((sum, token) => sum + token.computed.hours, 0);

	// Container dimensions - Start at 0 to prevent premature packing
	let walletContainerWidth = 0;
	let handContainerWidth = 0;
	let walletContainerElement: HTMLDivElement;
	let handContainerElement: HTMLDivElement;

	// Re-measure hand container when handTokens changes (coins are flipped)
	$: if (typeof document !== 'undefined' && handTokens.length > 0 && handContainerElement) {
		const width = handContainerElement.clientWidth;
		if (width > 0 && width !== handContainerWidth) {
			handContainerWidth = width;
		}
	}

	// Packed circle positions for Wallet - Only pack when container width is measured
	$: walletPackedCircles = walletContainerWidth > 0
		? packCircles(
				sortedTokens.map((token) => ({
					id: token.tokenId,
					radius: calculateCoinSize(token.computed.hours) / 2,
					data: token
				})),
				walletContainerWidth,
				2000,
				4
			)
		: [];

	$: walletContainerHeight = getPackedHeight(walletPackedCircles, 4);

	// Packed circle positions for Hand - Only pack when container width is measured
	$: handPackedCircles = handContainerWidth > 0
		? packCircles(
				handTokens.map((token) => ({
					id: token.tokenId,
					radius: calculateCoinSize(token.computed.hours) / 2,
					data: token
				})),
				handContainerWidth,
				2000,
				4
			)
		: [];

	$: handContainerHeight = getPackedHeight(handPackedCircles, 4);

	// ========== INTENTIONS TAB STATE ==========
	let intentionsSearchQuery = '';
	let intentionsActiveFilter: FilterCategory = 'All';
	let intentionsSortOption: 'trending' | 'recent' | 'high-impact' = 'trending';

	const intentionsSortOptions = [
		{ value: 'trending', label: '🔥 Trending' },
		{ value: 'recent', label: '🆕 Recent' },
		{ value: 'high-impact', label: '⚡ High Impact' }
	];

	// Filter and sort intentions
	$: filteredIntentions = intentions
		.filter((i) => intentionsActiveFilter === 'All' || i.category === intentionsActiveFilter)
		.filter(
			(i) =>
				intentionsSearchQuery === '' ||
				i.title.toLowerCase().includes(intentionsSearchQuery.toLowerCase()) ||
				i.description.toLowerCase().includes(intentionsSearchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (intentionsSortOption === 'recent')
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			if (intentionsSortOption === 'high-impact')
				return b.stats.totalAttentionHours - a.stats.totalAttentionHours;
			return b.stats.participantCount - a.stats.participantCount; // trending
		});

	// ========== OFFERINGS TAB STATE ==========
	let offeringsSearchQuery = '';
	let offeringsActiveFilter: FilterCategory = 'All';
	let offeringsSortOption: 'recent' | 'popular' | 'available' = 'recent';

	const offeringsSortOptions = [
		{ value: 'recent', label: '🆕 Recent' },
		{ value: 'popular', label: '⭐ Most Popular' },
		{ value: 'available', label: '✓ Available Only' }
	];

	// Filter and sort offerings
	$: filteredOfferings = offerings
		.filter((o) => offeringsActiveFilter === 'All' || o.category === offeringsActiveFilter)
		.filter(
			(o) =>
				offeringsSearchQuery === '' ||
				o.title.toLowerCase().includes(offeringsSearchQuery.toLowerCase()) ||
				o.description.toLowerCase().includes(offeringsSearchQuery.toLowerCase())
		)
		.filter((o) => offeringsSortOption !== 'available' || o.status === 'active')
		.sort((a, b) => {
			if (offeringsSortOption === 'recent')
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			if (offeringsSortOption === 'popular')
				return b.stats.totalRecipients - a.stats.totalRecipients;
			return 0;
		});

	// ========== WALLET TAB FUNCTIONS (existing) ==========
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
	$: if (typeof document !== 'undefined' && walletPackedCircles.length > 0 && currentTab === 'wallet') {
		scrollToBottom('.content-panel .panel-content');
	}

	$: if (typeof document !== 'undefined' && handPackedCircles.length > 0) {
		scrollToBottom('.hand-panel .panel-content');
	}

	function handleCoinFlip(tokenId: string, isFlipped: boolean) {
		// Always toggle - if token is in set, remove it; if not, add it
		// This ensures Hand tokens (showing heads but in flipped set) can be clicked to return to Wallet
		if (flippedTokens.has(tokenId)) {
			flippedTokens.delete(tokenId);
		} else {
			flippedTokens.add(tokenId);
		}
		flippedTokens = flippedTokens; // Trigger reactivity
	}

	// ========== INTENTIONS TAB FUNCTIONS ==========
	function handleIntentionsSearchInput(value: string) {
		intentionsSearchQuery = value;
	}

	function handleIntentionsFilterChange(filter: FilterCategory) {
		intentionsActiveFilter = filter;
	}

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}

	// ========== OFFERINGS TAB FUNCTIONS ==========
	function handleOfferingsSearchInput(value: string) {
		offeringsSearchQuery = value;
	}

	function handleOfferingsFilterChange(filter: FilterCategory) {
		offeringsActiveFilter = filter;
	}

	// ========== LIFECYCLE ==========
	onMount(async () => {
		activeTab.set('tokens');

		// Update container widths on resize (for wallet tab)
		const updateWidth = () => {
			if (walletContainerElement) {
				const width = walletContainerElement.clientWidth;
				// Only update if width is valid (> 0) to prevent packing errors
				if (width > 0) {
					walletContainerWidth = width;
				}
			}
			if (handContainerElement) {
				const width = handContainerElement.clientWidth;
				// Only update if width is valid (> 0) to prevent packing errors
				if (width > 0) {
					handContainerWidth = width;
				}
			}
		};

		// Wait for DOM to be fully rendered before measuring
		await tick();
		// Use double RAF to ensure CSS layout is complete before measuring
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				updateWidth();
			});
		});
		window.addEventListener('resize', updateWidth);

		// Initial scroll to bottom
		if (currentTab === 'wallet') {
			scrollToBottom('.content-panel .panel-content');
		}
		scrollToBottom('.hand-panel .panel-content');

		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	});

	// ========== TAB CONFIGURATION ==========
	$: tabs = [
		{ id: 'wallet', label: 'Wallet', icon: '💎', count: userTokens.length },
		{ id: 'intentions', label: 'Intentions', icon: '✨', count: intentions.length },
		{ id: 'offerings', label: 'Offerings', icon: '🎁', count: offerings.length }
	];
</script>

<svelte:head>
	<title>Tokens - Synchronicity Engine</title>
</svelte:head>

<div class="tokens-page">
	<!-- Tab Switcher at top for all views -->
	<Section spacing="sm">
		<TabSwitcher {tabs} activeTab={currentTab} on:tabChange={(e) => (currentTab = e.detail)} />
	</Section>

	<!-- Content Layout: Golden ratio split for all tabs -->
	<div class="content-layout">
		<!-- Content Panel (Top 68.2%) - Tab-specific content -->
		<div class="content-panel">
			<!-- WALLET TAB: Always rendered, shown when currentTab === 'wallet' -->
			<div class="tab-content wallet-tab" class:hidden={currentTab !== 'wallet'}>
				<div class="panel-sum">{formatTimeSignificant(walletHeadsSum, 3)}</div>
				<div class="panel-content">
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

			<!-- INTENTIONS TAB: Always rendered, shown when currentTab === 'intentions' -->
			<div class="tab-content browse-content" class:hidden={currentTab !== 'intentions'}>
				<Stack gap="md">
					<!-- Page Header -->
					<Section spacing="sm">
						<Stack gap="sm">
							<h1 class="page-title">Browse Intentions</h1>
							<p class="page-subtitle">Explore community intentions and contribute your unique gifts</p>
						</Stack>
					</Section>

					<!-- Search Bar -->
					<SearchBar
						value={intentionsSearchQuery}
						placeholder="Search intentions..."
						onInput={handleIntentionsSearchInput}
					/>

					<!-- Filter Chips -->
					<FilterChips
						activeFilter={intentionsActiveFilter}
						onFilterChange={handleIntentionsFilterChange}
					/>

					<!-- Sort Options & Count -->
					<Section spacing="sm">
						<Row gap="md" justify="between" wrap={true}>
							<SectionTitle icon="🎯" title="{filteredIntentions.length} Intentions" />
							<select bind:value={intentionsSortOption} class="sort-select">
								{#each intentionsSortOptions as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</Row>
					</Section>

					<!-- Intentions Gallery -->
					<Section spacing="lg">
						{#if filteredIntentions.length > 0}
							<CardGallery columns={3} gap="var(--spacing-4)">
								{#each filteredIntentions as intention (intention.intentionId)}
									<IntentionCard
										{intention}
										size="small"
										onClick={() => handleViewIntention(intention.intentionId)}
									/>
								{/each}
							</CardGallery>
						{:else}
							<div class="empty-state-browse">
								<div class="empty-icon">🔍</div>
								<div class="empty-title">No intentions found</div>
								<div class="empty-message">Try adjusting your filters or search query</div>
							</div>
						{/if}
					</Section>
				</Stack>
			</div>

			<!-- OFFERINGS TAB: Always rendered, shown when currentTab === 'offerings' -->
			<div class="tab-content browse-content" class:hidden={currentTab !== 'offerings'}>
				<Stack gap="md">
					<!-- Page Header -->
					<Section spacing="sm">
						<Stack gap="sm">
							<h1 class="page-title">Browse Offerings</h1>
							<p class="page-subtitle">
								Discover services and resources shared by community members
							</p>
						</Stack>
					</Section>

					<!-- Search Bar -->
					<SearchBar
						value={offeringsSearchQuery}
						placeholder="Search offerings..."
						onInput={handleOfferingsSearchInput}
					/>

					<!-- Filter Chips -->
					<FilterChips
						activeFilter={offeringsActiveFilter}
						onFilterChange={handleOfferingsFilterChange}
					/>

					<!-- Sort Options & Count -->
					<Section spacing="sm">
						<Row gap="md" justify="between" wrap={true}>
							<SectionTitle icon="🎁" title="{filteredOfferings.length} Offerings" />
							<select bind:value={offeringsSortOption} class="sort-select">
								{#each offeringsSortOptions as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</Row>
					</Section>

					<!-- Offerings Gallery -->
					<Section spacing="lg">
						{#if filteredOfferings.length > 0}
							<CardGallery columns={3} gap="var(--spacing-4)">
								{#each filteredOfferings as offering (offering.offeringId)}
									<OfferingCard {offering} size="small" />
								{/each}
							</CardGallery>
						{:else}
							<div class="empty-state-browse">
								<div class="empty-icon">🔍</div>
								<div class="empty-title">No offerings found</div>
								<div class="empty-message">Try adjusting your filters or search query</div>
							</div>
						{/if}
					</Section>
				</Stack>
			</div>
		</div>

		<!-- Hand Panel (Bottom 31.8%) - Always visible for all tabs -->
		<div class="hand-panel">
			<div class="panel-sum">{formatTimeSignificant(handHeadsSum, 3)}</div>
			<div class="panel-content">
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
										isFlipped={false}
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
	/* ========== PAGE CONTAINER ========== */
	.tokens-page {
		min-height: 100vh;
		padding: var(--spacing-3);
	}

	/* ========== CONTENT LAYOUT: Golden ratio for all tabs ========== */
	.content-layout {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
		height: calc(100vh - 120px); /* Account for tabs and padding */
		margin-top: var(--spacing-3);
	}

	/* Content Panel - Top 68.2% (switches between wallet/intentions/offerings) */
	.content-panel {
		flex: 0.682;
		position: relative;
		min-height: 400px;
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 12px;
		overflow: hidden;
	}

	/* Tab content wrapper - all tabs always rendered */
	.tab-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	/* Hide non-active tabs */
	.tab-content.hidden {
		display: none;
	}

	/* Hand Panel - Bottom 31.8% (always visible) */
	.hand-panel {
		flex: 0.318;
		position: relative;
		min-height: 200px;
		background: rgba(0, 0, 0, 0.3);
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 12px;
		overflow: hidden;
	}

	/* Scrollable content area for wallet and hand panels */
	.panel-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	/* Browse content wrapper for intentions/offerings tabs */
	.browse-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
		padding: var(--spacing-3);
	}

	/* Coins container */
	.coins-container {
		width: 100%;
		height: 100%;
	}

	.coins-packed {
		position: relative;
		width: 100%;
		transition: height 0.3s ease-out;
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

	/* Empty state for wallet */
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

	/* Panel sum display */
	.panel-sum {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		z-index: 10;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		padding: var(--spacing-2) var(--spacing-3);
		background: rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		backdrop-filter: blur(4px);
	}

	/* ========== BROWSE TABS STYLES (intentions/offerings) ========== */
	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.page-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		margin: 0;
		opacity: 0.85;
	}

	.sort-select {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: var(--font-size-3);
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition: all 0.2s ease;
		font-family: theme('fontFamily.exo');
		flex-shrink: 0;
		max-width: 50%;
	}

	.sort-select:hover,
	.sort-select:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px theme('colors.cyan.glow');
	}

	.sort-select option {
		background: theme('colors.bg.front');
		color: theme('colors.cream.DEFAULT');
	}

	/* Empty state for browse tabs */
	.empty-state-browse {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0);
		text-align: center;
		min-height: 300px;
	}

	.empty-state-browse .empty-icon {
		font-size: 4rem;
		opacity: 0.3;
		margin-bottom: var(--spacing-3);
	}

	.empty-title {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		margin-bottom: var(--spacing-4);
	}

	.empty-message {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.7;
	}
</style>
