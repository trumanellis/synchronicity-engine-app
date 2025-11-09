<script lang="ts">
	export let variant: 'primary' | 'secondary' = 'primary';
	export let icon: string | undefined = undefined;
	export let disabled = false;
	export let fullWidth = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let onClick: (() => void) | undefined = undefined;
</script>

<button
	class="action-button {variant}"
	class:full-width={fullWidth}
	{type}
	{disabled}
	on:click={onClick}
>
	{#if icon}
		<span>{icon}</span>
	{/if}
	<span><slot /></span>
</button>

<style>
	.action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 0.75rem;
		padding: 1rem 2rem;
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
	}

	.action-button.full-width {
		width: 100%;
	}

	.action-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action-button.primary {
		background: rgba(0, 255, 209, 0.9);
		color: theme('colors.bg.deep');
		box-shadow: theme('boxShadow.glow-cyan');
	}

	.action-button.primary:hover:not(:disabled) {
		background: theme('colors.cyan.DEFAULT');
		box-shadow: theme('boxShadow.glow-cyan-lg');
		transform: translateY(-2px);
	}

	.action-button.secondary {
		background: theme('colors.gold.bg');
		color: theme('colors.gold.DEFAULT');
		border: 2px solid theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
	}

	.action-button.secondary:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.3);
		box-shadow: theme('boxShadow.glow-gold');
		transform: translateY(-2px);
	}
</style>
