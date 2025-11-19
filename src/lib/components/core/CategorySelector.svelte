<script lang="ts">
	import type { FilterCategory } from '$types';

	export let selectedCategory: FilterCategory | '' = '';
	export let onSelect: ((category: FilterCategory) => void) | undefined = undefined;

	const categories: { value: FilterCategory; icon: string }[] = [
		{ value: 'Organic Food & Nutrition', icon: '🌾' },
		{ value: 'Land Stewardship', icon: '🌳' },
		{ value: 'Off-Grid & Sustainable Living', icon: '☀️' },
		{ value: 'Health & Vitality', icon: '💚' },
		{ value: 'Community Abundance', icon: '🤝' },
		{ value: 'Self & Spiritual Development', icon: '🧘' },
		{ value: 'Creative Expression', icon: '🎨' }
	];

	let inputValue = selectedCategory;
	let showSuggestions = false;
	let inputElement: HTMLInputElement;

	$: filteredCategories = categories.filter((cat) =>
		cat.value.toLowerCase().includes(inputValue.toLowerCase())
	);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		inputValue = target.value;
		selectedCategory = target.value as FilterCategory;
		showSuggestions = true;
		if (onSelect) onSelect(selectedCategory);
	}

	function handleSelect(category: FilterCategory) {
		inputValue = category;
		selectedCategory = category;
		showSuggestions = false;
		if (onSelect) onSelect(category);
	}

	function handleFocus() {
		showSuggestions = true;
	}

	function handleBlur() {
		// Delay to allow click on suggestion
		setTimeout(() => {
			showSuggestions = false;
		}, 200);
	}
</script>

<div class="category-selector">
	<label class="selector-label" for="category-input">
		Intention Category<span class="required">*</span>
	</label>
	<div class="autocomplete-wrapper">
		<input
			id="category-input"
			type="text"
			class="category-input"
			bind:this={inputElement}
			value={inputValue}
			on:input={handleInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
			placeholder="Select or enter a category..."
			autocomplete="off"
		/>
		{#if showSuggestions && filteredCategories.length > 0}
			<div class="suggestions-dropdown">
				{#each filteredCategories as category}
					<button
						type="button"
						class="suggestion-item"
						on:click={() => handleSelect(category.value)}
					>
						<span class="category-icon">{category.icon}</span>
						<span class="category-name">{category.value}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.category-selector {
		margin-bottom: 1.25rem;
	}

	.selector-label {
		display: block;
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
	}

	.required {
		color: rgba(255, 99, 71, 1);
		margin-left: 0.25rem;
	}

	.autocomplete-wrapper {
		position: relative;
	}

	.category-input {
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.95rem;
		outline: none;
		transition: all 0.2s ease;
	}

	.category-input::placeholder {
		color: theme('colors.sage.DEFAULT');
		opacity: 0.6;
	}

	.category-input:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
		background: rgba(0, 0, 0, 0.5);
	}

	.suggestions-dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
		background: theme('colors.bg.front');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.75rem;
		box-shadow: 0 4px 20px rgba(0, 255, 209, 0.3);
		max-height: 300px;
		overflow-y: auto;
		z-index: 100;
	}

	.suggestion-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		background: transparent;
		border: none;
		border-bottom: 1px solid rgba(0, 255, 209, 0.1);
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.suggestion-item:last-child {
		border-bottom: none;
	}

	.suggestion-item:hover {
		background: rgba(0, 255, 209, 0.1);
	}

	.category-icon {
		font-size: 1.5rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.category-name {
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		font-weight: 500;
		line-height: 1.3;
	}

	.suggestion-item:hover .category-name {
		color: theme('colors.cyan.DEFAULT');
	}

	/* Custom scrollbar for suggestions */
	.suggestions-dropdown::-webkit-scrollbar {
		width: 8px;
	}

	.suggestions-dropdown::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 0 0.75rem 0.75rem 0;
	}

	.suggestions-dropdown::-webkit-scrollbar-thumb {
		background: theme('colors.cyan.DEFAULT');
		border-radius: 4px;
	}

	.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
		background: theme('colors.cyan.DEFAULT');
		opacity: 0.8;
	}
</style>
