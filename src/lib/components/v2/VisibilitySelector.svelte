<script lang="ts">
	import type { VisibilityLevel } from '$types';

	export let visibility: VisibilityLevel = 'public';
	export let onChange: (newVisibility: VisibilityLevel) => void = () => {};
	export let compact: boolean = false;

	const visibilityOptions: { value: VisibilityLevel; label: string; icon: string }[] = [
		{ value: 'public', label: 'Public', icon: '🌍' },
		{ value: 'members', label: 'Members', icon: '👥' },
		{ value: 'connections', label: 'Connections', icon: '🤝' },
		{ value: 'friends', label: 'Friends', icon: '💚' },
		{ value: 'private', label: 'Private', icon: '🔒' }
	];

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		onChange(target.value as VisibilityLevel);
	}

	function handleClick(event: MouseEvent) {
		// Prevent click from bubbling up to parent elements (like ContentCard button)
		event.stopPropagation();
	}
</script>

<div class="visibility-selector" class:compact on:click={handleClick}>
	<select value={visibility} on:change={handleChange} on:click={handleClick} class="visibility-select">
		{#each visibilityOptions as option}
			<option value={option.value}>
				{option.icon} {option.label}
			</option>
		{/each}
	</select>
</div>

<style>
	.visibility-selector {
		display: inline-block;
	}

	.visibility-select {
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid theme('colors.sage.DEFAULT');
		border-radius: var(--spacing-4);
		padding: var(--spacing-4) var(--spacing-3);
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}

	.visibility-select:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.visibility-select:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.3);
	}

	.compact .visibility-select {
		padding: 4px 6px;
		font-size: 0.65rem;
	}

	/* Style for the dropdown arrow */
	.visibility-select {
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2384A98C' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 8px center;
		padding-right: 28px;
	}

	/* Dropdown options styling */
	.visibility-select option {
		background: theme('colors.bg.deep');
		color: theme('colors.cream.DEFAULT');
		padding: var(--spacing-4);
	}
</style>
