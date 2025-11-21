<script lang="ts">
	import type { Intention, Offering, VisibilityLevel } from '$types';
	import TabSwitcher from './TabSwitcher.svelte';
	import CardGallery from './CardGallery.svelte';
	import IntentionCard from './IntentionCard.svelte';
	import OfferingCard from './OfferingCard.svelte';

	export let intentions: Intention[] = [];
	export let offerings: Offering[] = [];
	export let canEdit: boolean = false;

	// Tab state
	let activeTab = 'intentions';

	function handleIntentionVisibilityChange(intentionId: string, newVisibility: VisibilityLevel) {
		console.log(`Changing visibility for intention ${intentionId} to ${newVisibility}`);
		// TODO: Implement API call to update intention visibility
		alert(`Visibility changed to ${newVisibility} (API integration coming soon)`);
	}

	function handleOfferingVisibilityChange(offeringId: string, newVisibility: VisibilityLevel) {
		console.log(`Changing visibility for offering ${offeringId} to ${newVisibility}`);
		// TODO: Implement API call to update offering visibility
		alert(`Visibility changed to ${newVisibility} (API integration coming soon)`);
	}

	function handleIntentionClick(intentionId: string) {
		window.location.href = `/browse/${intentionId}`;
	}

	function handleOfferingClick(offeringId: string) {
		if (canEdit) {
			alert('Edit offering feature coming soon');
		} else {
			alert('Request service feature coming soon');
		}
	}

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
		<CardGallery columns={3} gap="var(--spacing-4)">
			{#each intentions as intention (intention.intentionId)}
				<IntentionCard
					{intention}
					size="large"
					{canEdit}
					onClick={() => handleIntentionClick(intention.intentionId)}
					onVisibilityChange={canEdit ? (newVisibility) => handleIntentionVisibilityChange(intention.intentionId, newVisibility) : undefined}
				/>
			{/each}
		</CardGallery>

		{#if intentions.length === 0}
			<div class="empty-state">
				<div class="empty-icon">🎯</div>
				<p class="empty-text">
					{canEdit ? 'No intentions yet. Create your first intention to share your goals!' : 'No intentions to display.'}
				</p>
			</div>
		{/if}
	{/if}

	{#if activeTab === 'offerings'}
		<CardGallery columns={3} gap="var(--spacing-4)">
			{#each offerings as offering (offering.offeringId)}
				<OfferingCard
					{offering}
					size="large"
					{canEdit}
					onClick={() => handleOfferingClick(offering.offeringId)}
					onVisibilityChange={canEdit ? (newVisibility) => handleOfferingVisibilityChange(offering.offeringId, newVisibility) : undefined}
				/>
			{/each}
		</CardGallery>

		{#if offerings.length === 0}
			<div class="empty-state">
				<div class="empty-icon">🎁</div>
				<p class="empty-text">
					{canEdit ? 'No offerings yet. Create your first offering to share your skills!' : 'No offerings to display.'}
				</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.profile-gallery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.empty-state {
		padding: var(--spacing-0);
		text-align: center;
		background: rgba(0, 0, 0, 0.2);
		border: 2px dashed rgba(135, 169, 107, 0.3);
		border-radius: var(--spacing-3);
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--spacing-3);
		opacity: 0.5;
	}

	.empty-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		line-height: 1.6;
		opacity: 0.8;
		margin: 0;
	}
</style>
