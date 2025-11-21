<script lang="ts">
	import AttentionSpiral from './AttentionSpiral.svelte';
	import type { Intention, IntentionAttentionSummary } from '$types';

	export let intention: Intention;
	export let attentionSummary: IntentionAttentionSummary | undefined = undefined;
	export let size: 'small' | 'medium' | 'large' = 'large';

	let isFlipped = false;
	let isExpanded = false;
	let container: HTMLDivElement;

	// Size variants - Golden rectangle with height > width
	const sizes = {
		small: { width: '80px', height: '130px' },
		medium: { width: '140px', height: '227px' },
		large: { width: '180px', height: '291px' }
	};

	const currentSize = sizes[size];

	// Get first image or fallback
	$: imageUrl = intention.media && intention.media.length > 0 ? intention.media[0] : null;
	$: categoryIcon = getCategoryIcon(intention.category);

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			'Off-Grid & Sustainable Living': '🌱',
			'Health & Vitality': '💪',
			'Organic Food & Nutrition': '🥗',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '✨',
			'Land Stewardship': '🌳',
			'Creative Expression': '🎨'
		};
		return icons[category] || '🎯';
	}

	function handleFlip() {
		if (!isFlipped) {
			// Opening: flip and show medium view
			isFlipped = true;
			setTimeout(() => {
				isExpanded = true;
			}, 1400);
		} else {
			// Closing: shrink first, then flip back
			isExpanded = false;
			setTimeout(() => {
				isFlipped = false;
			}, 1400);
		}
	}
</script>

<div class="intention-card-wrapper" class:expanded={isExpanded}>
	<div
		class="intention-card-container"
		class:flipped={isFlipped}
		on:click={handleFlip}
		on:keypress={(e) => e.key === 'Enter' && handleFlip()}
		bind:this={container}
		style="--width: {currentSize.width}; --height: {currentSize.height}"
		role="button"
		tabindex="0"
		aria-label={isFlipped ? 'Show intention image' : 'Show attention spiral'}
	>
		<div class="flip-card">
			<!-- Front: Intention Image -->
			<div class="flip-card-front">
				{#if imageUrl}
					<img src={imageUrl} alt={intention.title} class="intention-image" />
				{:else}
					<div class="intention-placeholder">
						<span class="placeholder-icon">{categoryIcon}</span>
					</div>
				{/if}
			</div>

			<!-- Back: Attention Spiral with Image Background -->
			<div class="flip-card-back" style="--bg-image: url({imageUrl})">
				<!-- Background blur layer -->
				{#if imageUrl}
					<div class="background-blur"></div>
				{/if}

				<!-- Content overlay -->
				<div class="back-content-overlay">
					<!-- Title at top -->
					<div class="intention-title-overlay">{intention.title}</div>

					<!-- Attention Spiral in center -->
					{#if attentionSummary && attentionSummary.userSummaries.length > 0}
						<div class="spiral-container-overlay">
							<AttentionSpiral {attentionSummary} />
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Tap hint -->
		{#if !isFlipped}
			<div class="tap-hint">Tap to reveal</div>
		{/if}
	</div>

	<!-- Backdrop when expanded -->
	{#if isExpanded}
		<div class="backdrop" on:click={handleFlip} role="presentation"></div>
	{/if}
</div>

<style>
	.intention-card-wrapper {
		position: relative;
		z-index: 1;
	}

	.intention-card-wrapper.expanded {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.intention-card-wrapper.expanded .intention-card-container {
		pointer-events: all;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		z-index: -1;
		animation: fadeIn 1s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.intention-card-container {
		width: var(--width);
		height: var(--height);
		perspective: 1000px;
		cursor: pointer;
		position: relative;
		margin: 0 auto;
		transition:
			width 1s cubic-bezier(0.4, 0.0, 0.2, 1),
			height 1s cubic-bezier(0.4, 0.0, 0.2, 1),
			max-width 1s cubic-bezier(0.4, 0.0, 0.2, 1),
			max-height 1s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	.intention-card-wrapper.expanded .intention-card-container {
		width: 420px;
		max-width: 90vw;
		height: 680px;
		max-height: 90vh;
	}

	.flip-card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 1.4s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	.intention-card-container.flipped .flip-card {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 16px;
		transition:
			border-radius 1s cubic-bezier(0.4, 0.0, 0.2, 1),
			box-shadow 1s cubic-bezier(0.4, 0.0, 0.2, 1);
		overflow: hidden;
	}

	.intention-card-wrapper.expanded .flip-card-front,
	.intention-card-wrapper.expanded .flip-card-back {
		border-radius: 32px;
		box-shadow:
			0 0 40px rgba(212, 175, 55, 0.8),
			0 0 80px rgba(212, 175, 55, 0.6),
			0 0 120px rgba(212, 175, 55, 0.4);
	}

	.flip-card-front {
		z-index: 2;
		transform: rotateY(0deg);
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
	}

	.intention-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.intention-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(107, 207, 126, 0.2), rgba(0, 0, 0, 0.4));
	}

	.placeholder-icon {
		font-size: 5rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
		opacity: 0.5;
	}

	.flip-card-back {
		transform: rotateY(180deg);
		background: theme('colors.bg.deep');
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.background-blur {
		position: absolute;
		inset: 0;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		filter: blur(8px) brightness(0.3);
		z-index: 0;
	}

	.back-content-overlay {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-3);
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
		transform: scale(0.55);
	}

	.intention-card-wrapper.expanded .back-content-overlay {
		transform: scale(1);
		padding: var(--spacing-1);
	}

	.intention-title-overlay {
		color: #ffffff;
		font-size: var(--font-size-2);
		font-weight: 700;
		text-align: center;
		text-shadow:
			0 0 10px rgba(255, 255, 255, 0.8),
			0 0 20px rgba(255, 255, 255, 0.6),
			0 0 30px rgba(255, 255, 255, 0.4);
		letter-spacing: 0.05em;
		line-height: 1.2;
		width: 100%;
	}

	.intention-card-wrapper.expanded .intention-title-overlay {
		font-size: var(--font-size-0);
	}

	.spiral-container-overlay {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-height: 80%;
	}

	.spiral-container-overlay :global(canvas) {
		max-width: 100%;
		max-height: 100%;
		width: auto !important;
		height: auto !important;
	}

	.tap-hint {
		position: absolute;
		bottom: -30px;
		left: 50%;
		transform: translateX(-50%);
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		opacity: 0.6;
		white-space: nowrap;
		pointer-events: none;
		animation: fade-pulse 2s ease-in-out infinite;
	}

	@keyframes fade-pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.8;
		}
	}

	/* Hover effects - only when not expanded */
	.intention-card-wrapper:not(.expanded) .intention-card-container:hover .flip-card {
		transform: rotateY(10deg);
	}

	.intention-card-wrapper:not(.expanded) .intention-card-container.flipped:hover .flip-card {
		transform: rotateY(190deg);
	}

	/* Focus state for accessibility */
	.intention-card-wrapper:not(.expanded) .intention-card-container:focus {
		outline: 2px solid rgba(255, 255, 255, 0.3);
		outline-offset: 4px;
	}

	.intention-card-wrapper.expanded .intention-card-container:focus {
		outline: none;
	}
</style>
