<script lang="ts">
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

	// Components
	import SearchBar from '$components/core/SearchBar.svelte';
	import FilterChips from '$components/core/FilterChips.svelte';
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import IntentionCard from '$components/core/IntentionCard.svelte';
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

	function handleSortChange(sort: SortOption) {
		activeSortOption.set(sort);
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

<div class="min-h-screen pb-24">
	<div class="phone-mockup">
		<div class="screen-content">
			<!-- Page Header -->
			<div class="mb-4">
				<h1 class="text-gold text-2xl font-bold mb-2">Discover Intentions</h1>
				<p class="text-sage text-sm">
					Explore community needs and contribute your unique gifts
				</p>
			</div>

			<!-- Search Bar -->
			<SearchBar
				value={$searchQuery}
				placeholder="Search intentions..."
				onInput={handleSearchInput}
			/>

			<!-- Filter Chips -->
			<FilterChips activeFilter={$activeFilter} onFilterChange={handleFilterChange} />

			<!-- Sort Options & Count -->
			<div class="header-row mb-4">
				<SectionTitle icon="🎯" title={`${intentionsCount} Intentions`} />
				<select bind:value={$activeSortOption} class="sort-select">
					{#each sortOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<!-- Intentions List -->
			<div class="intentions-list">
				{#if $filteredIntentions.length > 0}
					{#each $filteredIntentions as intention (intention.intentionId)}
						<div class="animate-fade-in">
							<IntentionCard
								{intention}
								onClick={() => handleViewIntention(intention.intentionId)}
							/>
						</div>
					{/each}
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
			</div>
		</div>
	</div>

	<BottomNav />
</div>

<style>
	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.intentions-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
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
