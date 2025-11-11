<script lang="ts">
	/**
	 * SearchBar v1 - Rebuilt using layout primitives
	 * Uses Row for horizontal layout with proper width constraints
	 */
	import Row from '$lib/components/layout/Row.svelte';

	export let value = '';
	export let placeholder = 'Search...';
	export let onInput: ((value: string) => void) | undefined = undefined;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		if (onInput) onInput(value);
	}

	function clearSearch() {
		value = '';
		if (onInput) onInput('');
	}
</script>

<div class="search-bar">
	<Row gap="md" align="center">
		<span class="search-icon">🔍</span>
		<input
			type="text"
			{placeholder}
			{value}
			on:input={handleInput}
			class="search-input"
		/>
		{#if value}
			<button class="clear-button" on:click={clearSearch} aria-label="Clear search">
				✕
			</button>
		{/if}
	</Row>
</div>

<style>
	.search-bar {
		width: 100%;
		max-width: 100%;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		transition: all 0.2s ease;
		box-sizing: border-box;
	}

	.search-bar:focus-within {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.search-icon {
		font-size: 1.1rem;
		flex-shrink: 0;
		line-height: 1;
	}

	.search-input {
		flex: 1;
		background: none;
		border: none;
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		outline: none;
		min-width: 0;
		max-width: 100%;
	}

	.search-input::placeholder {
		color: theme('colors.sage.DEFAULT');
		opacity: 0.7;
	}

	.clear-button {
		background: none;
		border: none;
		color: theme('colors.sage.DEFAULT');
		cursor: pointer;
		padding: 0;
		font-size: 1.2rem;
		line-height: 1;
		transition: color 0.2s ease;
		flex-shrink: 0;
	}

	.clear-button:hover {
		color: theme('colors.cyan.DEFAULT');
	}
</style>
