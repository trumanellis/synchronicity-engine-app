<script lang="ts">
	/**
	 * FilterChips v1 - Rebuilt using layout primitives
	 * Uses Row with overflow scroll for horizontal chip list
	 */
	import type { FilterCategory } from '$types';
	import Row from '$lib/components/layout/Row.svelte';

	export let activeFilter: FilterCategory = 'All';
	export let onFilterChange: ((filter: FilterCategory) => void) | undefined = undefined;

	const filters: FilterCategory[] = [
		'All',
		'Organic Food & Nutrition',
		'Land Stewardship',
		'Off-Grid & Sustainable Living',
		'Health & Vitality',
		'Community Abundance',
		'Self & Spiritual Development',
		'Creative Expression'
	];

	function handleClick(filter: FilterCategory) {
		activeFilter = filter;
		if (onFilterChange) onFilterChange(filter);
	}
</script>

<div class="filter-chips-container">
	<Row gap="sm">
		{#each filters as filter}
			<button
				class="filter-chip"
				class:active={activeFilter === filter}
				on:click={() => handleClick(filter)}
			>
				{filter}
			</button>
		{/each}
	</Row>
</div>

<style>
	.filter-chips-container {
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		box-sizing: border-box;
	}

	/* Scrollbar styling */
	.filter-chips-container::-webkit-scrollbar {
		height: 4px;
	}

	.filter-chips-container::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.2);
	}

	.filter-chips-container::-webkit-scrollbar-thumb {
		background: theme('colors.cyan.border');
		border-radius: 2px;
	}

	/* Filter chip button */
	.filter-chip {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.sage.DEFAULT');
		border-radius: 1.5rem;
		padding: 0.5rem 1rem;
		font-family: theme('fontFamily.exo');
		font-size: 0.8rem;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.filter-chip:hover {
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
	}

	.filter-chip.active {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}
</style>
