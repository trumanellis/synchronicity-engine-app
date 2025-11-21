<script lang="ts">
	import BioCard from './BioCard.svelte';
	import IntentionDetailCard from './IntentionDetailCard.svelte';
	import type { User, Intention, IntentionAttentionSummary } from '$types';

	// Image mode props (legacy - for simple static images)
	export let imageUrl: string | undefined = undefined;
	export let imageAlt: string = '';

	// BioCard mode props (for user profiles)
	export let useBioCard: boolean = false;
	export let user: User | undefined = undefined;
	export let bioCardSize: 'small' | 'medium' | 'large' = 'large';

	// IntentionDetailCard mode props (for intention pages)
	export let useIntentionCard: boolean = false;
	export let intention: Intention | undefined = undefined;
	export let attentionSummary: IntentionAttentionSummary | undefined = undefined;
	export let intentionCardSize: 'small' | 'medium' | 'large' = 'large';
</script>

<div class="entity-detail-header">
	<!-- Left Column: Representative Image/Card (38.2%) -->
	<div class="image-column">
		{#if useBioCard && user}
			<BioCard
				avatar={user.avatar}
				username={user.username}
				name={user.name}
				{user}
				size={bioCardSize}
			/>
		{:else if useIntentionCard && intention}
			<IntentionDetailCard {intention} {attentionSummary} size={intentionCardSize} />
		{:else if imageUrl}
			<div class="representative-image">
				<img src={imageUrl} alt={imageAlt} class="image" />
			</div>
		{:else}
			<div class="representative-image placeholder">
				<span class="placeholder-icon">🎯</span>
			</div>
		{/if}

		<!-- Additional left column content (stats, badges, etc.) -->
		<slot name="left-column" />
	</div>

	<!-- Right Column: Content Slot (61.8%) -->
	<div class="content-column">
		<slot />
	</div>
</div>

<style>
	.entity-detail-header {
		display: grid;
		grid-template-columns: 38.2% 61.8%;
		gap: var(--spacing-2);
		align-items: flex-start;
		margin-bottom: var(--spacing-2);
	}

	.image-column {
		width: 100%;
	}

	/* Make BioCard column golden rectangle (height > width) */
	.image-column :global(.bio-card-container) {
		width: 100% !important;
		height: 0 !important;
		padding-bottom: 161.8%;
		position: relative;
	}

	/* Remove focus outline from embedded BioCard */
	.image-column :global(.bio-card-container):focus {
		outline: none !important;
	}

	.image-column :global(.bio-card-container) :global(.flip-card) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.image-column :global(.bio-card-container) :global(.tap-hint) {
		bottom: -24px;
	}

	/* Make IntentionDetailCard column golden rectangle */
	.image-column :global(.intention-card-container) {
		width: 100% !important;
		height: 0 !important;
		padding-bottom: 161.8%;
		position: relative;
	}

	.image-column :global(.intention-card-container):focus {
		outline: none !important;
	}

	.image-column :global(.intention-card-container) :global(.flip-card) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.image-column :global(.intention-card-container) :global(.tap-hint) {
		bottom: -24px;
	}

	.representative-image {
		width: 100%;
		height: 0;
		padding-bottom: 161.8%; /* Golden ratio: taller than wide */
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
		border: 2px solid theme('colors.gold.border');
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
		transition: all 0.3s ease;
	}

	.representative-image:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 30px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.representative-image.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.placeholder-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
		opacity: 0.5;
	}

	.image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.representative-image:hover .image {
		transform: scale(1.05);
	}

	.content-column {
		height: 0;
		padding-bottom: 161.8%; /* Match golden rectangle height of left column */
		position: relative;
		overflow: hidden;
	}

	/* Scrollable wrapper for content */
	.content-column :global(.scrollable-content) {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		padding: 0 var(--spacing-3) 0 0;
		scrollbar-width: thin;
		scrollbar-color: rgba(212, 175, 55, 0.3) rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
	}

	/* Webkit scrollbar styling */
	.content-column :global(.scrollable-content::-webkit-scrollbar) {
		width: 6px;
	}

	.content-column :global(.scrollable-content::-webkit-scrollbar-track) {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	.content-column :global(.scrollable-content::-webkit-scrollbar-thumb) {
		background: rgba(212, 175, 55, 0.3);
		border-radius: 3px;
		transition: background 0.2s ease;
	}

	.content-column :global(.scrollable-content::-webkit-scrollbar-thumb:hover) {
		background: rgba(212, 175, 55, 0.5);
	}

	/* Keep two-column layout on all screen sizes - matches profile page behavior */
</style>
