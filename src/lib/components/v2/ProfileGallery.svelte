<script lang="ts">
	import type { Intention, Offering } from '$types';
	import TabSwitcher from './TabSwitcher.svelte';
	import ContentCardGallery from './ContentCardGallery.svelte';
	import { intentionToCard, offeringToCard } from '$lib/utils/cardTransformers';

	export let intentions: Intention[] = [];
	export let offerings: Offering[] = [];
	export let canEdit: boolean = false;

	// Tab state
	let activeTab = 'intentions';

	function handleIntentionVisibilityChange(intentionId: string, newVisibility: any) {
		console.log(`Changing visibility for intention ${intentionId} to ${newVisibility}`);
		// TODO: Implement API call to update intention visibility
		alert(`Visibility changed to ${newVisibility} (API integration coming soon)`);
	}

	function handleOfferingVisibilityChange(offeringId: string, newVisibility: any) {
		console.log(`Changing visibility for offering ${offeringId} to ${newVisibility}`);
		// TODO: Implement API call to update offering visibility
		alert(`Visibility changed to ${newVisibility} (API integration coming soon)`);
	}

	// Transform intentions to card format
	$: intentionCards = intentions.map((intention) => ({
		...intentionToCard(intention),
		onClick: () => (window.location.href = `/browse/${intention.intentionId}`),
		canEdit,
		visibility: intention.visibility || 'public',
		onVisibilityChange: canEdit
			? (newVisibility: any) => handleIntentionVisibilityChange(intention.intentionId, newVisibility)
			: undefined
	}));

	// Transform offerings to card format
	$: offeringCards = offerings.map((offering) => ({
		...offeringToCard(offering),
		onClick: () => {
			if (canEdit) {
				alert('Edit offering feature coming soon');
			} else {
				alert('Request service feature coming soon');
			}
		},
		canEdit,
		visibility: offering.visibility || 'public',
		onVisibilityChange: canEdit
			? (newVisibility: any) => handleOfferingVisibilityChange(offering.offeringId, newVisibility)
			: undefined
	}));

	$: tabs = [
		{
			id: 'intentions',
			label: 'Intentions',
			icon: '🎯',
			count: intentions.length
		},
		{
			id: 'offerings',
			label: 'Offerings',
			icon: '🎁',
			count: offerings.length
		}
	];
</script>

<div class="profile-gallery">
	<TabSwitcher {tabs} bind:activeTab />

	{#if activeTab === 'intentions'}
		<ContentCardGallery items={intentionCards} />
	{/if}

	{#if activeTab === 'offerings'}
		<ContentCardGallery items={offeringCards} />
	{/if}
</div>

<style>
	.profile-gallery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}
</style>
