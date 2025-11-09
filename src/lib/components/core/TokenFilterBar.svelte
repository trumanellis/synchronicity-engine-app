<script lang="ts">
	import type { TokenFilter } from '$types';

	export let activeFilter: TokenFilter = 'all';
	export let onFilterChange: ((filter: TokenFilter) => void) | undefined = undefined;

	const filters: { value: TokenFilter; label: string; icon: string }[] = [
		{ value: 'all', label: 'All', icon: '💎' },
		{ value: 'available', label: 'Available', icon: '✨' },
		{ value: 'bid', label: 'In Bid', icon: '🎯' },
		{ value: 'historical', label: 'Historical', icon: '📜' }
	];

	function handleClick(filter: TokenFilter) {
		activeFilter = filter;
		if (onFilterChange) onFilterChange(filter);
	}
</script>

<div class="token-filter-bar">
	{#each filters as filter}
		<button
			class="filter-button"
			class:active={activeFilter === filter.value}
			on:click={() => handleClick(filter.value)}
		>
			<span class="filter-icon">{filter.icon}</span>
			<span class="filter-label">{filter.label}</span>
		</button>
	{/each}
</div>

<style>
	.token-filter-bar {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.filter-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-button:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.filter-button.active {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.filter-icon {
		font-size: 1.25rem;
		line-height: 1;
	}

	.filter-label {
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: color 0.2s ease;
	}

	.filter-button.active .filter-label {
		color: theme('colors.cyan.DEFAULT');
	}

	@media (max-width: 768px) {
		.token-filter-bar {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
