<script lang="ts">
	import type { Intention } from '$types';
	import { goto } from '$app/navigation';
	import ContentCardGallery from './ContentCardGallery.svelte';
	import { intentionToCard } from '$lib/utils/cardTransformers';

	export let intentions: Intention[];
	export let userRole: Record<string, string> = {};

	function handleIntentionClick(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}

	// Transform intentions to card format
	$: intentionCards = intentions.map((intention) => ({
		...intentionToCard(intention),
		onClick: () => handleIntentionClick(intention.intentionId)
	}));
</script>

<div class="intentions-list">
	{#if intentions.length === 0}
		<div class="empty-state">
			<div class="empty-icon">🎯</div>
			<div class="empty-text">No active intentions yet</div>
		</div>
	{:else}
		<ContentCardGallery items={intentionCards} />
	{/if}
</div>

<style>
	.intentions-list {
		width: 100%;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0);
		background: theme('colors.bg.mid');
		border: 2px dashed theme('colors.gold.border');
		border-radius: var(--spacing-3);
	}

	.empty-icon {
		font-size: 4rem;
		filter: grayscale(0.5);
		opacity: 0.5;
	}

	.empty-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1);
		opacity: 0.7;
	}
</style>
