<script lang="ts">
	/**
	 * Create Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import type { FilterCategory } from '$types';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V0 Components (form components not yet rebuilt)
	import FormField from '$components/core/FormField.svelte';
	import CategorySelector from '$components/core/CategorySelector.svelte';
	import MediaUploader from '$components/core/MediaUploader.svelte';
	import TokenAttachment from '$components/core/TokenAttachment.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';

	// Form state
	let title = '';
	let description = '';
	let selectedCategory: FilterCategory | '' = '';
	let location = '';
	let uploadedMedia: string[] = [];
	let attachedTokenId: string | null = null;
	let isSubmitting = false;
	let showSuccess = false;

	onMount(() => {
		activeTab.set('create');
	});

	function handleCategorySelect(category: FilterCategory) {
		selectedCategory = category;
	}

	function handleMediaUpload(files: string[]) {
		uploadedMedia = files;
	}

	function handleTokenSelect(tokenId: string | null) {
		attachedTokenId = tokenId;
	}

	function validateForm(): boolean {
		if (!title.trim()) {
			alert('Please enter a title for your intention');
			return false;
		}
		if (!description.trim()) {
			alert('Please enter a description');
			return false;
		}
		if (!selectedCategory) {
			alert('Please select a category');
			return false;
		}
		return true;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validateForm()) return;

		isSubmitting = true;

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		isSubmitting = false;
		showSuccess = true;

		// Show success message then redirect
		setTimeout(() => {
			goto('/browse');
		}, 2000);
	}

	function handleCancel() {
		if (confirm('Discard this intention?')) {
			goto('/browse');
		}
	}

	$: isValid = title.trim() && description.trim() && selectedCategory;
</script>

<svelte:head>
	<title>Create Intention - Synchronicity Engine</title>
</svelte:head>

{#if showSuccess}
	<!-- Success State -->
	<div class="success-container">
		<div class="success-icon">✓</div>
		<h2 class="success-title">Intention Created!</h2>
		<p class="success-message">Your intention has been shared with the community</p>
		<div class="success-spinner">Redirecting to Browse...</div>
	</div>
{:else}
	<div class="create-page-wrapper">
		<!-- Banner at top of page - full width, outside padding -->
		<div class="create-banner" />

		<!-- Content with padding -->
		<div class="create-content">
			<Stack gap="sm">
				<!-- Form -->
				<form on:submit={handleSubmit} class="create-form">
					<Stack gap="sm">
			<!-- Title -->
			<FormField
				label="Title"
				bind:value={title}
				placeholder="e.g., Need help building chicken coop"
				required={true}
				maxLength={80}
			/>

			<!-- Description -->
			<FormField
				label="Description"
				type="textarea"
				bind:value={description}
				placeholder="Describe your intention in detail. What help do you need or what can you offer?"
				required={true}
				rows={3}
				maxLength={500}
			/>

			<!-- Category -->
			<CategorySelector
				selectedCategory={selectedCategory}
				onSelect={handleCategorySelect}
			/>

			<!-- Location -->
			<FormField
				label="Location (Optional)"
				bind:value={location}
				placeholder="e.g., Main Garden, Workshop Barn, etc."
			/>

			<!-- Media Upload -->
			<MediaUploader uploadedFiles={uploadedMedia} onUpload={handleMediaUpload} />

			<!-- Token Attachment -->
			<TokenAttachment selectedTokenId={attachedTokenId} onSelect={handleTokenSelect} />

			<!-- Info Box -->
			<div class="info-box">
				<div class="info-box-title">
					<span>💡</span>
					<span>How It Works</span>
				</div>
				<div class="info-box-content">
					Once published, community members can see your intention, join the conversation, and
					offer help. When work is completed, Tokens are earned based on attention received.
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="action-buttons">
				<ActionButton
					type="button"
					variant="secondary"
					fullWidth={true}
					onClick={handleCancel}
					disabled={isSubmitting}
				>
					Cancel
				</ActionButton>
				<ActionButton
					type="submit"
					variant="primary"
					fullWidth={true}
					disabled={!isValid || isSubmitting}
				>
					{isSubmitting ? 'Publishing...' : 'Publish Intention'}
				</ActionButton>
			</div>
					</Stack>
				</form>
			</Stack>
		</div>
	</div>
{/if}

<style>
	/* Create page wrapper - no padding */
	.create-page-wrapper {
		margin: calc(var(--spacing-3) * -1); /* Negative margin to cancel PageContainer padding */
		overflow: visible; /* Allow glow to extend beyond container */
	}

	/* Banner at top of dashboard - full screen width */
	.create-banner {
		position: relative;
		width: 100%; /* Full screen width */
		height: 0;
		padding-bottom: 35%; /* More compact aspect ratio */
		background-image: url('/CreateIntentionBanner.png');
		background-size: contain; /* Changed to contain to show full image */
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.9; /* Prominent but not overwhelming */
		pointer-events: none;
		margin-bottom: 0;
		z-index: 1;
		overflow: visible; /* Allow glow to spread */
		animation: gold-banner-pulse 3s ease-in-out infinite;
	}

	@keyframes gold-banner-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))
				drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))
				drop-shadow(0 0 35px rgba(255, 255, 255, 0.2));
		}
		50% {
			filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.7))
				drop-shadow(0 0 50px rgba(255, 255, 255, 0.5))
				drop-shadow(0 0 70px rgba(255, 255, 255, 0.4));
		}
	}

	@media (min-width: 768px) {
		.create-banner {
			padding-bottom: 25%; /* More compact for desktop */
		}
	}

	/* Content with padding restored */
	.create-content {
		padding: var(--spacing-4) var(--spacing-3); /* Reduced vertical padding */
	}

	.create-form {
		width: 100%;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: 0; /* Remove top margin for compactness */
	}

	.info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based - more compact */
		padding: var(--spacing-4); /* 8px φ-based - more compact */
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-3); /* 8px Level 3 φ-based - more compact */
		margin-bottom: 2px; /* Even more compact */
		display: flex;
		align-items: center;
		gap: 4px; /* More compact */
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		line-height: 1.4; /* Tighter line height */
		opacity: 0.9;
	}

	.success-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 2rem;
	}

	.success-icon {
		width: 80px;
		height: 80px;
		background: theme('colors.gold.bg');
		border: 3px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		box-shadow: 0 0 40px theme('colors.gold.glow');
		animation: pulse-glow var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
		}
		50% {
			box-shadow: 0 0 60px rgba(212, 175, 55, 1);
		}
	}

	.success-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 700;
		margin-bottom: var(--spacing-4); /* 8px φ-based */
		text-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.success-message {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.success-spinner {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 500;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@media (max-width: 768px) {
		.action-buttons {
			grid-template-columns: 1fr;
		}
	}
</style>
