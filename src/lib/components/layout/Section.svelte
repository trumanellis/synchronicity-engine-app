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

	/* Vertical spacing between sections */
	.section[data-spacing='sm'] {
		margin-bottom: 1rem;
	}
	.section[data-spacing='md'] {
		margin-bottom: 1.5rem;
	}
	.section[data-spacing='lg'] {
		margin-bottom: 2rem;
	}

	/* Remove margin from last section */
	.section:last-child {
		margin-bottom: 0;
	}
</style>
