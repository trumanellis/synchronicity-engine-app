<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ProofOfService } from '$types';
	import MediaUploader from '$components/core/MediaUploader.svelte';

	export let intentionId: string;
	export let intentionTitle: string;

	const dispatch = createEventDispatcher<{ submit: Omit<ProofOfService, 'proofId' | 'timestamp' | 'status'> }>();

	let title = '';
	let description = '';
	let hoursWorked: number | '' = '';
	let locationName = '';
	let media: string[] = [];
	let isSubmitting = false;

	function handleMediaChange(event: CustomEvent<string[]>) {
		media = event.detail;
	}

	function handleSubmit() {
		if (!title || !description || !hoursWorked) {
			alert('Please fill in all required fields');
			return;
		}

		isSubmitting = true;

		// Simulate submission delay
		setTimeout(() => {
			dispatch('submit', {
				intentionId,
				userId: '', // Will be filled by parent
				userName: '', // Will be filled by parent
				userAvatar: '', // Will be filled by parent
				title: title.trim(),
				description: description.trim(),
				hoursWorked: Number(hoursWorked),
				media: media.length > 0 ? media : undefined,
				location: locationName ? { name: locationName } : undefined
			});
			isSubmitting = false;
		}, 500);
	}

	$: isValid = title.trim() && description.trim() && hoursWorked > 0;
</script>

<form class="proof-form" on:submit|preventDefault={handleSubmit}>
	<!-- Header -->
	<div class="form-header">
		<div class="header-icon">✓</div>
		<div class="header-text">
			<h2 class="header-title">Submit Proof of Service</h2>
			<p class="header-subtitle">{intentionTitle}</p>
		</div>
	</div>

	<!-- Title Field -->
	<div class="form-field">
		<label for="title" class="field-label">
			Title <span class="required">*</span>
		</label>
		<input
			id="title"
			type="text"
			class="field-input"
			bind:value={title}
			placeholder="Brief summary of work completed"
			maxlength="100"
			required
		/>
		<div class="field-hint">{title.length}/100 characters</div>
	</div>

	<!-- Description Field -->
	<div class="form-field">
		<label for="description" class="field-label">
			Description <span class="required">*</span>
		</label>
		<textarea
			id="description"
			class="field-textarea"
			bind:value={description}
			placeholder="Detailed description of the work performed, materials used, and results achieved..."
			rows="6"
			maxlength="500"
			required
		/>
		<div class="field-hint">{description.length}/500 characters</div>
	</div>

	<!-- Hours Worked Field -->
	<div class="form-field">
		<label for="hours" class="field-label">
			Hours Worked <span class="required">*</span>
		</label>
		<input
			id="hours"
			type="number"
			class="field-input hours-input"
			bind:value={hoursWorked}
			placeholder="0"
			min="0.5"
			max="100"
			step="0.5"
			required
		/>
		<div class="field-hint">Estimated time spent on this service</div>
	</div>

	<!-- Location Field (Optional) -->
	<div class="form-field">
		<label for="location" class="field-label">Location (Optional)</label>
		<input
			id="location"
			type="text"
			class="field-input"
			bind:value={locationName}
			placeholder="Where was this work performed?"
		/>
	</div>

	<!-- Media Upload -->
	<div class="form-field">
		<label class="field-label">Photos/Videos (Optional)</label>
		<MediaUploader on:change={handleMediaChange} />
		<div class="field-hint">Add photos or videos to document your work</div>
	</div>

	<!-- Info Box -->
	<div class="info-box">
		<div class="info-icon">💡</div>
		<div class="info-text">
			Your proof will be reviewed by community stewards. Once approved, you'll receive a gratitude
			token representing the hours worked.
		</div>
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		class="submit-button"
		disabled={!isValid || isSubmitting}
		class:submitting={isSubmitting}
	>
		{#if isSubmitting}
			<span class="spinner"></span>
			Submitting...
		{:else}
			Submit Proof
		{/if}
	</button>
</form>

<style>
	.proof-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2); /* 18px φ-based */
	}

	.form-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-2); /* 18px φ-based */
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 0, 0, 0.3));
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3);
	}

	.header-icon {
		width: 48px;
		height: 48px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		flex-shrink: 0;
	}

	.header-text {
		flex: 1;
	}

	.header-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin: 0 0 4px 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.header-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		margin: 0;
		opacity: 0.85;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.field-label {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.required {
		color: theme('colors.gold.DEFAULT');
	}

	.field-input,
	.field-textarea {
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid theme('colors.cyan.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		transition: all 0.3s ease;
	}

	.field-input:focus,
	.field-textarea:focus {
		outline: none;
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
	}

	.field-textarea {
		resize: vertical;
		min-height: 120px;
		line-height: 1.6;
	}

	.hours-input {
		width: 120px;
	}

	.field-hint {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.7;
	}

	.info-box {
		display: flex;
		gap: var(--spacing-3); /* 12px φ-based */
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		margin-top: var(--spacing-3);
	}

	.info-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.info-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		line-height: 1.6;
		opacity: 0.9;
	}

	.submit-button {
		background: linear-gradient(135deg, theme('colors.gold.DEFAULT'), #f4d03f);
		border: none;
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3) var(--spacing-2); /* 12px 18px φ-based */
		color: #000000;
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: var(--spacing-3);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-4);
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 0 30px theme('colors.gold.glow');
	}

	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.submit-button.submitting {
		opacity: 0.8;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid #000000;
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
