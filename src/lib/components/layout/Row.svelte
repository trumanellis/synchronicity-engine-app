<script lang="ts">
	/**
	 * Row - Horizontal layout with responsive wrapping
	 * Use this for any horizontal layout (headers, button groups, etc.)
	 */
	export let gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	export let wrap: boolean = false;
	export let className: string = '';
</script>

<div
	class="row {className}"
	data-gap={gap}
	data-justify={justify}
	data-align={align}
	data-wrap={wrap}
>
	<slot />
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Gap Variants */
	.row[data-gap='xs'] {
		gap: 0.25rem;
	}
	.row[data-gap='sm'] {
		gap: 0.5rem;
	}
	.row[data-gap='md'] {
		gap: 0.75rem;
	}
	.row[data-gap='lg'] {
		gap: 1rem;
	}
	.row[data-gap='xl'] {
		gap: 1.5rem;
	}

	/* Justify Content Variants */
	.row[data-justify='start'] {
		justify-content: flex-start;
	}
	.row[data-justify='center'] {
		justify-content: center;
	}
	.row[data-justify='end'] {
		justify-content: flex-end;
	}
	.row[data-justify='between'] {
		justify-content: space-between;
	}
	.row[data-justify='around'] {
		justify-content: space-around;
	}

	/* Align Items Variants */
	.row[data-align='start'] {
		align-items: flex-start;
	}
	.row[data-align='center'] {
		align-items: center;
	}
	.row[data-align='end'] {
		align-items: flex-end;
	}
	.row[data-align='stretch'] {
		align-items: stretch;
	}

	/* Wrap Variant */
	.row[data-wrap='true'] {
		flex-wrap: wrap;
	}

	/* CRITICAL: Allow children to shrink below content size */
	.row > :global(*) {
		min-width: 0;
		box-sizing: border-box;
	}
</style>
