<script lang="ts">
	/**
	 * Browse Page - Iteration 1
	 * Uses PageContainer and v1 components built with layout primitives
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
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
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
	import BottomNav from '$components/core/BottomNav.svelte';

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

<div class="browse-page">
	<PageContainer maxWidth="xl">
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

			<!-- Intentions List -->
			<Section spacing="lg">
				{#if $filteredIntentions.length > 0}
					<Stack gap="md">
						{#each $filteredIntentions as intention (intention.intentionId)}
							<div class="animate-fade-in">
								<IntentionCard
									{intention}
									onClick={() => handleViewIntention(intention.intentionId)}
								/>
							</div>
						{/each}
					</Stack>
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
	</PageContainer>

	<BottomNav />
</div>

<style>
	.browse-page {
		min-height: 100vh;
		padding-top: 5rem; /* Mobile: top bar */
		padding-bottom: 1rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Desktop: sidebar */
	@media (min-width: 768px) {
		.browse-page {
			margin-left: 5rem;
			padding-top: 0;
		}
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

	.sort-select {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
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

	@media (max-width: 480px) {
		.page-title {
			font-size: 1.25rem;
		}

		.page-subtitle {
			font-size: 0.8125rem;
		}
	}
</style>
