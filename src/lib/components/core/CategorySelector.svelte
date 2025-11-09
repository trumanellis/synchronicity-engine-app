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

	function handleSelect(category: FilterCategory) {
		selectedCategory = category;
		if (onSelect) onSelect(category);
	}
</script>

<div class="category-selector">
	<label class="selector-label">
		Intention Category<span class="required">*</span>
	</label>
	<div class="category-grid">
		{#each categories as category}
			<button
				type="button"
				class="category-option"
				class:selected={selectedCategory === category.value}
				on:click={() => handleSelect(category.value)}
			>
				<span class="category-icon">{category.icon}</span>
				<span class="category-name">{category.value}</span>
			</button>
		{/each}
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

	.category-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.category-option {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		background: rgba(0, 0, 0, 0.3);
		border: 2px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: center;
	}

	.category-option:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.category-option.selected {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
	}

	.category-icon {
		font-size: 2rem;
		line-height: 1;
	}

	.category-name {
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.7rem;
		font-weight: 500;
		line-height: 1.3;
		transition: color 0.2s ease;
	}

	.category-option.selected .category-name {
		color: theme('colors.cyan.DEFAULT');
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.category-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
