<script lang="ts">
	export let columns: number = 3;
	export let gap: string = 'var(--spacing-2)';
	export let title: string = '';
</script>

<div class="card-gallery">
	{#if title}
		<div class="gallery-header">
			<h2 class="gallery-title">{title}</h2>
		</div>
	{/if}
	<div class="gallery-grid" style="--columns: {columns}; --gap: {gap}">
		<slot />
	</div>
</div>

<style>
	.card-gallery {
		width: 100%;
	}

	.gallery-header {
		margin-bottom: var(--spacing-2);
	}

	.gallery-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		gap: var(--gap);
		width: 100%;
	}

	/* Responsive grid - reduce columns on very small screens */
	@media (max-width: 640px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
