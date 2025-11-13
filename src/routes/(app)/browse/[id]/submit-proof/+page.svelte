<script lang="ts">
	/**
	 * Submit Proof of Service Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getIntentionById, currentUser, submitProofOfService } from '$data/mockData';
	import type { Intention, ProofOfService } from '$types';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V2 Components
	import ProofOfServiceForm from '$lib/components/v2/ProofOfServiceForm.svelte';

	let intention: Intention | undefined;
	let showSuccess = false;
	let submittedProof: ProofOfService | null = null;

	onMount(() => {
		const intentionId = $page.params.id;
		if (intentionId) {
			intention = getIntentionById(intentionId);
			if (!intention) {
				goto('/browse');
			}
		}
	});

	function handleSubmit(
		event: CustomEvent<Omit<ProofOfService, 'proofId' | 'timestamp' | 'status'>>
	) {
		const proofData = event.detail;

		// Add current user info
		const proof = submitProofOfService({
			...proofData,
			userId: currentUser.userId,
			userName: currentUser.name,
			userAvatar: currentUser.avatar
		});

		submittedProof = proof;
		showSuccess = true;

		// After showing success, redirect back to intention detail
		setTimeout(() => {
			goto(`/browse/${intention!.intentionId}`);
		}, 3000);
	}

	function handleCancel() {
		goto(`/browse/${intention!.intentionId}`);
	}
</script>

<svelte:head>
	<title>Submit Proof of Service - Synchronicity Engine</title>
</svelte:head>

{#if intention}
	{#if showSuccess && submittedProof}
		<!-- Success State -->
		<div class="success-container">
			<div class="success-animation">
				<div class="success-icon">✓</div>
				<div class="success-glow"></div>
			</div>
			<h1 class="success-title">Proof Submitted!</h1>
			<p class="success-message">
				Your proof of service has been submitted for review. Community stewards will evaluate your
				contribution and, once approved, you'll receive a {submittedProof.hoursWorked}h gratitude token.
			</p>
			<div class="success-details">
				<div class="detail-item">
					<span class="detail-label">Title:</span>
					<span class="detail-value">{submittedProof.title}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Hours:</span>
					<span class="detail-value">{submittedProof.hoursWorked}h</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Status:</span>
					<span class="detail-value status">⏳ Pending Review</span>
				</div>
			</div>
			<p class="redirect-hint">Returning to intention...</p>
		</div>
	{:else}
		<!-- Form State -->
		<Stack gap="md">
			<!-- Back Button -->
			<Section spacing="sm">
				<button class="back-button" on:click={handleCancel}>
					<span class="back-icon">←</span>
					Back to Intention
				</button>
			</Section>

			<!-- Form -->
			<Section spacing="md">
				<ProofOfServiceForm
					intentionId={intention.intentionId}
					intentionTitle={intention.title}
					on:submit={handleSubmit}
				/>
			</Section>

			<!-- Cancel Button -->
			<Section spacing="sm">
				<button class="cancel-button" on:click={handleCancel}>Cancel</button>
			</Section>
		</Stack>
	{/if}
{:else}
	<div class="loading">Loading...</div>
{/if}

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
	}

	.back-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: transparent;
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.back-button:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.back-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
	}

	.cancel-button {
		width: 100%;
		background: rgba(255, 0, 0, 0.1);
		border: 1px solid rgba(255, 0, 0, 0.3);
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		color: #ff6b6b;
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cancel-button:hover {
		background: rgba(255, 0, 0, 0.2);
		box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
	}

	.success-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 500px;
		padding: var(--spacing-1); /* 30px φ-based */
		text-align: center;
	}

	.success-animation {
		position: relative;
		margin-bottom: var(--spacing-1); /* 30px φ-based */
	}

	.success-icon {
		width: 120px;
		height: 120px;
		background: theme('colors.gold.bg');
		border: 4px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 4rem;
		color: theme('colors.gold.DEFAULT');
		animation: success-pop 0.6s ease-out;
		position: relative;
		z-index: 2;
	}

	.success-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 140px;
		height: 140px;
		background: radial-gradient(
			circle,
			rgba(212, 175, 55, 0.4) 0%,
			rgba(212, 175, 55, 0.2) 40%,
			transparent 70%
		);
		border-radius: 50%;
		animation: glow-pulse 2s ease-in-out infinite;
		z-index: 1;
	}

	@keyframes success-pop {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes glow-pulse {
		0%,
		100% {
			opacity: 0.6;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.2);
		}
	}

	.success-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 700;
		margin: 0 0 var(--spacing-3) 0; /* 12px bottom margin φ-based */
		text-shadow: 0 0 20px theme('colors.gold.glow');
		animation: fade-in 0.6s ease-out 0.3s both;
	}

	.success-message {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		margin: 0 0 var(--spacing-2) 0; /* 18px bottom margin φ-based */
		max-width: 500px;
		opacity: 0.9;
		animation: fade-in 0.6s ease-out 0.5s both;
	}

	.success-details {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-2); /* 18px φ-based */
		margin-bottom: var(--spacing-2);
		min-width: 300px;
		animation: fade-in 0.6s ease-out 0.7s both;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-3); /* 12px φ-based */
	}

	.detail-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.detail-value {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
	}

	.detail-value.status {
		color: theme('colors.gold.DEFAULT');
	}

	.redirect-hint {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.7;
		margin-top: var(--spacing-2); /* 18px φ-based */
		animation: fade-in 0.6s ease-out 0.9s both;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
