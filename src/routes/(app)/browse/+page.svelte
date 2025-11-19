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
	import IntentionCard from '$lib/components/v1/IntentionCard.svelte';

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
</script>

<svelte:head>
	<title>Browse Intentions - Synchronicity Engine</title>
</svelte:head>

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

	<!-- Intentions Grid -->
	<Section spacing="lg">
		{#if $filteredIntentions.length > 0}
			<div class="grid-3-cols">
				{#each $filteredIntentions as intention (intention.intentionId)}
					<div class="animate-fade-in">
						<IntentionCard
							{intention}
							onClick={() => handleViewIntention(intention.intentionId)}
						/>
					</div>
				{/each}
			</div>
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

<style>
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
