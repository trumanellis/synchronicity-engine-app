<script lang="ts">
	/**
	 * Card - Base card component for all card-based UI
	 * Provides consistent styling, variants, and interactive states
	 */
	export let variant: 'default' | 'highlighted' | 'subtle' = 'default';
	export let interactive: boolean = false;
	export let padding: 'sm' | 'md' | 'lg' = 'md';
	export let className: string = '';
</script>

<div
	class="card {className}"
	data-variant={variant}
	data-interactive={interactive}
	data-padding={padding}
	role={interactive ? 'button' : undefined}
	tabindex={interactive ? 0 : undefined}
	on:click
	on:keypress
>
	<slot />
</div>

<style>
	.card {
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		border-radius: 0.75rem;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	/* Padding Variants */
	.card[data-padding='sm'] {
		padding: 0.75rem;
	}
	.card[data-padding='md'] {
		padding: 1rem;
	}
	.card[data-padding='lg'] {
		padding: 1.25rem;
	}

	/* Style Variants */
	.card[data-variant='default'] {
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.border');
	}

	.card[data-variant='highlighted'] {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
	}

	.card[data-variant='subtle'] {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
	}

	/* Interactive States */
	.card[data-interactive='true'] {
		cursor: pointer;
	}

	.card[data-interactive='true']:hover {
		transform: translateY(-2px);
	}

	.card[data-variant='default'][data-interactive='true']:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: theme('boxShadow.glow-cyan');
	}

	.card[data-variant='highlighted'][data-interactive='true']:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: theme('boxShadow.glow-gold');
	}

	.card[data-variant='subtle'][data-interactive='true']:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px theme('colors.cyan.glow');
	}

	/* Focus state for accessibility */
	.card[data-interactive='true']:focus {
		outline: 2px solid theme('colors.cyan.DEFAULT');
		outline-offset: 2px;
	}

	/* Ensure children don't break card bounds */
	.card > :global(*) {
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Responsive adjustments */
	@media (max-width: 480px) {
		.card[data-padding='md'] {
			padding: 0.875rem;
		}
		.card[data-padding='lg'] {
			padding: 1rem;
		}
	}
</style>
