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

	/* Gap Variants */
	.stack[data-gap='xs'] {
		gap: 0.25rem; /* 4px */
	}
	.stack[data-gap='sm'] {
		gap: 0.5rem; /* 8px */
	}
	.stack[data-gap='md'] {
		gap: 0.75rem; /* 12px */
	}
	.stack[data-gap='lg'] {
		gap: 1rem; /* 16px */
	}
	.stack[data-gap='xl'] {
		gap: 1.5rem; /* 24px */
	}
	.stack[data-gap='2xl'] {
		gap: 2rem; /* 32px */
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
