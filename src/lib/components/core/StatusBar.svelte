<script lang="ts">
	import { goBack } from '$stores/navigationStore';
	import { goto } from '$app/navigation';

	export let showBack = false;
	export let title = '⚡ SyncEngine';

	const currentTime = new Date().toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});

	function handleBack() {
		goBack();
		window.history.back();
	}
</script>

<div class="status-bar">
	<div class="flex items-center gap-2">
		{#if showBack}
			<button class="back-button" on:click={handleBack} aria-label="Go back">
				←
			</button>
		{:else}
			<span>{title}</span>
		{/if}
	</div>
	<span>{currentTime}</span>
</div>

<style>
	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid theme('colors.cyan.border');
		font-size: 0.75rem;
		color: theme('colors.sage.DEFAULT');
	}

	.back-button {
		background: none;
		border: none;
		color: theme('colors.cyan.DEFAULT');
		font-size: 1.25rem;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		line-height: 1;
	}

	.back-button:hover {
		text-shadow: 0 0 10px theme('colors.cyan.glow');
	}
</style>
