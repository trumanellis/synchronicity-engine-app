<script lang="ts">
	import { onMount } from 'svelte';

	export let size: 'small' | 'medium' | 'large' = 'large';
	export let showTapHint: boolean = true;
	export let tapHintText: string = 'Tap to reveal';
	export let ariaLabelFront: string = 'Show front';
	export let ariaLabelBack: string = 'Show back';

	let isFlipped = false;
	let isExpanded = false;
	let container: HTMLDivElement;

	// Size variants (compact design) - Golden rectangle with height > width
	const sizes = {
		small: { width: '80px', height: '130px' },
		medium: { width: '140px', height: '227px' },
		large: { width: '180px', height: '291px' }
	};

	// Medium view size - larger golden rectangle when flipped (maintains 1.618 ratio)
	const mediumViewSize = { width: '420px', height: '680px' };

	const currentSize = sizes[size];

	function handleFlip() {
		if (!isFlipped) {
			// Opening: flip and show medium view with golden rectangle proportions
			isFlipped = true;
			setTimeout(() => {
				isExpanded = true;
			}, 1400); // Wait for flip to complete
		} else {
			// Closing: shrink first, then flip back
			isExpanded = false;
			setTimeout(() => {
				isFlipped = false;
			}, 1400); // Wait for shrink to complete
		}
	}

	// Export function to allow parent to trigger flip
	export function flip() {
		handleFlip();
	}
</script>

<div class="flip-card-wrapper" class:expanded={isExpanded}>
	<div
		class="flip-card-container"
		class:flipped={isFlipped}
		on:click={handleFlip}
		on:keypress={(e) => e.key === 'Enter' && handleFlip()}
		bind:this={container}
		style="--width: {currentSize.width}; --height: {currentSize.height}"
		role="button"
		tabindex="0"
		aria-label={isFlipped ? ariaLabelFront : ariaLabelBack}
	>
		<div class="flip-card">
			<!-- Front: Use slot for custom content -->
			<div class="flip-card-front">
				<slot name="front" />
			</div>

			<!-- Back: Use slot for custom content -->
			<div class="flip-card-back">
				<slot name="back" {isFlipped} {isExpanded} />
			</div>
		</div>

		<!-- Tap hint for first-time users -->
		{#if showTapHint && !isFlipped}
			<div class="tap-hint">{tapHintText}</div>
		{/if}
	</div>

	<!-- Backdrop overlay when expanded -->
	{#if isExpanded}
		<div class="backdrop" on:click={handleFlip} role="presentation"></div>
	{/if}
</div>

<style>
	.flip-card-wrapper {
		position: relative;
		z-index: 1;
	}

	.flip-card-wrapper.expanded {
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

	.flip-card-wrapper.expanded .flip-card-container {
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

	.flip-card-container {
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

	.flip-card-wrapper.expanded .flip-card-container {
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

	.flip-card-container.flipped .flip-card {
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
	}

	.flip-card-wrapper.expanded .flip-card-front,
	.flip-card-wrapper.expanded .flip-card-back {
		border-radius: 32px;
		box-shadow:
			0 0 40px rgba(212, 175, 55, 0.8),
			0 0 80px rgba(212, 175, 55, 0.6),
			0 0 120px rgba(212, 175, 55, 0.4);
	}

	.flip-card-front {
		z-index: 2;
		transform: rotateY(0deg);
	}

	.flip-card-back {
		transform: rotateY(180deg);
		background: theme('colors.bg.deep');
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
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
	.flip-card-wrapper:not(.expanded) .flip-card-container:hover .flip-card {
		transform: rotateY(10deg);
	}

	.flip-card-wrapper:not(.expanded) .flip-card-container.flipped:hover .flip-card {
		transform: rotateY(190deg);
	}

	/* Focus state for accessibility - only when not expanded */
	.flip-card-wrapper:not(.expanded) .flip-card-container:focus {
		outline: 2px solid rgba(255, 255, 255, 0.3);
		outline-offset: 4px;
	}

	/* Remove focus outline when expanded */
	.flip-card-wrapper.expanded .flip-card-container:focus {
		outline: none;
	}
</style>
