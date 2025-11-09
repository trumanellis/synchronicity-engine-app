<script lang="ts">
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let text: string | undefined = undefined;

	const sizeMap = {
		small: '24px',
		medium: '40px',
		large: '60px'
	};
</script>

<div class="loading-container">
	<div class="spinner" style="width: {sizeMap[size]}; height: {sizeMap[size]};"></div>
	{#if text}
		<p class="loading-text">{text}</p>
	{/if}
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem;
	}

	.spinner {
		border: 3px solid theme('colors.cyan.border');
		border-top-color: theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		animation: spin 1s linear infinite;
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-text {
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		font-weight: 500;
		text-align: center;
	}
</style>
