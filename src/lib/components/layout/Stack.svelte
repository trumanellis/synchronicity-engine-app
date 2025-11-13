<script lang="ts">
	/**
	 * Stack - Vertical layout with consistent spacing
	 * Use this for any vertical list or column layout
	 */
	export let gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
	export let className: string = '';
</script>

<div class="stack {className}" data-gap={gap} data-align={align}>
	<slot />
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Gap Variants - Golden Ratio (φ) Based */
	.stack[data-gap='xs'] {
		gap: var(--spacing-4); /* 8px - Level 4 φ-based */
	}
	.stack[data-gap='sm'] {
		gap: var(--spacing-3); /* 12px - Level 3 φ-based */
	}
	.stack[data-gap='md'] {
		gap: var(--spacing-2); /* 18px - Level 2 φ-based */
	}
	.stack[data-gap='lg'] {
		gap: var(--spacing-1); /* 30px - Level 1 φ-based */
	}
	.stack[data-gap='xl'] {
		gap: var(--spacing-0); /* 48px - Level 0 φ-based */
	}
	.stack[data-gap='2xl'] {
		gap: calc(var(--spacing-0) * var(--phi)); /* 48px × 1.618 ≈ 78px */
	}

	/* Alignment Variants */
	.stack[data-align='start'] {
		align-items: flex-start;
	}
	.stack[data-align='center'] {
		align-items: center;
	}
	.stack[data-align='end'] {
		align-items: flex-end;
	}
	.stack[data-align='stretch'] {
		align-items: stretch;
	}

	/* Ensure all children respect max-width */
	.stack > :global(*) {
		max-width: 100%;
		box-sizing: border-box;
	}
</style>
