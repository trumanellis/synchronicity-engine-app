<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import type { FilterCategory } from '$types';

	// Components
	import FormField from '$components/core/FormField.svelte';
	import CategorySelector from '$components/core/CategorySelector.svelte';
	import MediaUploader from '$components/core/MediaUploader.svelte';
	import TokenAttachment from '$components/core/TokenAttachment.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';

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

<div class="min-h-screen pb-24">
	<div class="phone-mockup">
		<div class="screen-content">
			{#if showSuccess}
				<!-- Success State -->
				<div class="success-container">
					<div class="success-icon">✓</div>
					<h2 class="success-title">Intention Created!</h2>
					<p class="success-message">Your intention has been shared with the community</p>
					<div class="success-spinner">Redirecting to Browse...</div>
				</div>
			{:else}
				<!-- Page Header -->
				<div class="mb-4">
					<h1 class="text-gold text-2xl font-bold mb-2">Create Intention</h1>
					<p class="text-sage text-sm">Share what you need or what you can offer</p>
				</div>

				<!-- Form -->
				<form on:submit={handleSubmit} class="create-form">
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
						rows={6}
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
				</form>
			{/if}
		</div>
	</div>

	<BottomNav />
</div>

<style>
	.create-form {
		padding-bottom: 1rem;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: 0.75rem;
		padding: 1rem;
		margin-bottom: 1.5rem;
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.6;
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
		margin-bottom: 1.5rem;
		box-shadow: 0 0 40px theme('colors.gold.glow');
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.success-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		text-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.success-message {
		color: theme('colors.cream.DEFAULT');
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.success-spinner {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.85rem;
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
