<script lang="ts">
	export let icon = '🔍';
	export let title = 'Nothing found';
	export let message = 'Try adjusting your filters or search query';
	export let actionText: string | undefined = undefined;
	export let onAction: (() => void) | undefined = undefined;
</script>

<div class="empty-state">
	<div class="empty-icon">{icon}</div>
	<div class="empty-title">{title}</div>
	<div class="empty-message">{message}</div>
	{#if actionText && onAction}
		<button class="button-primary mt-4" on:click={onAction}>
			{actionText}
		</button>
	{/if}
</div>

<style>
	.empty-state {
		text-align: center;
		padding: 3rem 1.5rem;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	.empty-title {
		color: theme('colors.cream.DEFAULT');
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.empty-message {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.9rem;
		line-height: 1.6;
	}
</style>
