<script lang="ts">
	/**
	 * Browse Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import {
		filteredIntentions,
		activeFilter,
		activeSortOption,
		searchQuery
	} from '$stores/intentionsStore';
	import type { FilterCategory, SortOption } from '$types';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SearchBar from '$lib/components/v1/SearchBar.svelte';
	import FilterChips from '$lib/components/v1/FilterChips.svelte';
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V2 Components
	import ContentCardGallery from '$lib/components/v2/ContentCardGallery.svelte';
	import { intentionToCard } from '$lib/utils/cardTransformers';

	// V0 Components (not yet rebuilt)
	import EmptyState from '$components/core/EmptyState.svelte';

	onMount(() => {
		activeTab.set('browse');
	});

	const sortOptions: { value: SortOption; label: string }[] = [
		{ value: 'trending', label: '🔥 Trending' },
		{ value: 'recent', label: '🆕 Recent' },
		{ value: 'high-impact', label: '⚡ High Impact' }
	];

	function handleSearchInput(value: string) {
		searchQuery.set(value);
	}

	function handleFilterChange(filter: FilterCategory) {
		activeFilter.set(filter);
	}

	function handleViewIntention(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}

	function handleClearFilters() {
		activeFilter.set('All');
		searchQuery.set('');
	}

	$: hasActiveFilters = $activeFilter !== 'All' || $searchQuery !== '';
	$: intentionsCount = $filteredIntentions.length;

	// Transform intentions to card format
	$: intentionCards = $filteredIntentions.map((intention) => ({
		...intentionToCard(intention),
		onClick: () => handleViewIntention(intention.intentionId)
	}));
</script>

<svelte:head>
	<title>Browse Intentions - Synchronicity Engine</title>
</svelte:head>

<div class="browse-page-wrapper">
	<!-- Banner at top of page - full width, outside padding -->
	<div class="browse-banner" />

	<!-- Content with padding -->
	<div class="browse-content">
		<Stack gap="lg">
	<!-- Page Header -->
	<Section spacing="sm">
		<Stack gap="sm">
			<h1 class="page-title">Discover Intentions</h1>
			<p class="page-subtitle">
				Explore community needs and contribute your unique gifts
			</p>
		</Stack>
	</Section>

	<!-- Search Bar -->
	<SearchBar
		value={$searchQuery}
		placeholder="Search intentions..."
		onInput={handleSearchInput}
	/>

	<!-- Filter Chips -->
	<FilterChips activeFilter={$activeFilter} onFilterChange={handleFilterChange} />

	<!-- Sort Options & Count -->
	<Section spacing="sm">
		<Row gap="md" justify="between" wrap={true}>
			<SectionTitle icon="🎯" title={`${intentionsCount} Intentions`} />
			<select bind:value={$activeSortOption} class="sort-select">
				{#each sortOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</Row>
	</Section>

	<!-- Intentions Gallery -->
	<Section spacing="lg">
		{#if $filteredIntentions.length > 0}
			<ContentCardGallery items={intentionCards} />
		{:else}
			<EmptyState
				icon="🔍"
				title="No intentions found"
				message={hasActiveFilters
					? 'Try adjusting your filters or search query'
					: 'Be the first to create an intention!'}
				actionText={hasActiveFilters ? 'Clear Filters' : 'Create Intention'}
				onAction={hasActiveFilters ? handleClearFilters : () => goto('/create')}
			/>
		{/if}
	</Section>
		</Stack>
	</div>
</div>

<style>
	/* Browse page wrapper - no padding */
	.browse-page-wrapper {
		margin: calc(var(--spacing-3) * -1); /* Negative margin to cancel PageContainer padding */
		overflow: visible; /* Allow glow to extend beyond container */
	}

	/* Banner at top of dashboard - full screen width */
	.browse-banner {
		position: relative;
		width: 100%; /* Full screen width */
		height: 0;
		padding-bottom: 50%; /* Taller aspect ratio to show full image */
		background-image: url('/DiscoverBanner.png');
		background-size: contain; /* Changed to contain to show full image */
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.9; /* Prominent but not overwhelming */
		pointer-events: none;
		margin-bottom: 0;
		z-index: 1;
		overflow: visible; /* Allow glow to spread */
		animation: moss-banner-pulse 3s ease-in-out infinite;
	}

	@keyframes moss-banner-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 15px rgba(107, 207, 126, 0.5))
				drop-shadow(0 0 25px rgba(107, 207, 126, 0.3))
				drop-shadow(0 0 35px rgba(107, 207, 126, 0.2));
		}
		50% {
			filter: drop-shadow(0 0 30px rgba(107, 207, 126, 0.7))
				drop-shadow(0 0 50px rgba(107, 207, 126, 0.5))
				drop-shadow(0 0 70px rgba(107, 207, 126, 0.4));
		}
	}

	@media (min-width: 768px) {
		.browse-banner {
			padding-bottom: 35%; /* Adjusted aspect ratio for desktop */
		}
	}

	/* Content with padding restored */
	.browse-content {
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

	.sort-select {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
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
</style>
