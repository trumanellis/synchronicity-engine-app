<script lang="ts">
	/**
	 * PageContainer - Root container for all pages
	 * Handles max-width, responsive padding, and ensures consistent page layout
	 */
	export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'xl';
	export let padding: boolean = true;
	export let className: string = '';
</script>

<div class="page-container {className}" data-max-width={maxWidth} data-padding={padding}>
	<slot />
</div>

<style>
	.page-container {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		min-height: 100vh;
		overflow: visible; /* Allow child elements to extend beyond container */
	}

	/* Max Width Variants */
	.page-container[data-max-width='sm'] {
		max-width: 640px;
	}
	.page-container[data-max-width='md'] {
		max-width: 768px;
	}
	.page-container[data-max-width='lg'] {
		max-width: 1024px;
	}
	.page-container[data-max-width='xl'] {
		max-width: 1200px;
	}
	.page-container[data-max-width='full'] {
		max-width: 100%;
	}

	/* Responsive Padding */
	.page-container[data-padding='true'] {
		padding: 1rem;
	}

	@media (max-width: 768px) {
		.page-container[data-padding='true'] {
			padding: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.page-container[data-padding='true'] {
			padding: 0.5rem;
		}
	}
</style>
