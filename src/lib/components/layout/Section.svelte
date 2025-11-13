<script lang="ts">
	/**
	 * Section - Semantic section container with optional header
	 * Use this to group related content with consistent spacing
	 */
	export let className: string = '';
	export let spacing: 'sm' | 'md' | 'lg' = 'md';
</script>

<section class="section {className}" data-spacing={spacing}>
	<slot />
</section>

<style>
	.section {
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Vertical spacing between sections - Golden Ratio (φ) Based */
	.section[data-spacing='sm'] {
		margin-bottom: var(--spacing-2); /* 18px - Level 2 φ-based */
	}
	.section[data-spacing='md'] {
		margin-bottom: var(--spacing-1); /* 30px - Level 1 φ-based */
	}
	.section[data-spacing='lg'] {
		margin-bottom: var(--spacing-0); /* 48px - Level 0 φ-based */
	}

	/* Remove margin from last section */
	.section:last-child {
		margin-bottom: 0;
	}
</style>
