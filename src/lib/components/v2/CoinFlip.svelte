<script lang="ts">
	import { calculateCoinSize } from '$lib/utils/logarithmicScale';
	import { formatTimeSignificant } from '$lib/utils/timeFormatting';

	export let attentionHours: number;
	export let imageUrl: string = '/TokenDefault.png';
	export let title: string;
	export let description: string = '';
	export let showTapHint: boolean = false;
	export let isFlipped: boolean = false;
	export let onFlip: ((isFlipped: boolean) => void) | undefined = undefined;

	let container: HTMLDivElement;

	// Calculate coin size using logarithmic scale
	$: coinSize = calculateCoinSize(attentionHours);
	$: formattedTime = formatTimeSignificant(attentionHours, 3);

	function handleClick() {
		const newFlippedState = !isFlipped;
		if (onFlip) {
			onFlip(newFlippedState);
		}
	}
</script>

<div class="coin-flip-wrapper">
	<div
		class="coin-container"
		class:flipped={isFlipped}
		on:click={handleClick}
		on:keypress={(e) => e.key === 'Enter' && handleClick()}
		bind:this={container}
		style="--coin-size: {coinSize}px"
		role="button"
		tabindex="0"
		aria-label={isFlipped ? 'Show heads' : 'Show tails'}
	>
		<div class="coin">
			<!-- Heads: Image with time overlay -->
			<div class="coin-heads">
				<img src={imageUrl} alt={title} class="coin-image" />
				<div class="heads-content">
					<div class="heads-time">{formattedTime}</div>
				</div>
			</div>

			<!-- Tails: Semi-transparent image with title -->
			<div class="coin-tails">
				<div class="tails-background" style="background-image: url({imageUrl})"></div>
				<div class="tails-content">
					<div class="tails-title">{title}</div>
				</div>
			</div>
		</div>

		<!-- Tap hint -->
		{#if showTapHint && !isFlipped}
			<div class="tap-hint">Tap to flip</div>
		{/if}
	</div>
</div>

<style>
	.coin-flip-wrapper {
		position: relative;
		display: inline-block;
	}

	.coin-container {
		width: var(--coin-size);
		height: var(--coin-size);
		perspective: 1000px;
		cursor: pointer;
		position: relative;
		margin: 0 auto;
	}

	.coin {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 1.4s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 50%;
	}

	.coin-container.flipped .coin {
		transform: rotateY(180deg);
	}

	.coin-heads,
	.coin-tails {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid theme('colors.gold.DEFAULT');
		box-shadow: 0 0 20px theme('colors.gold.glow');
	}

	/* Heads side */
	.coin-heads {
		z-index: 2;
		transform: rotateY(0deg);
		background: theme('colors.bg.deep');
	}

	.coin-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.coin-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(0, 0, 0, 0.4));
	}

	.placeholder-icon {
		font-size: calc(var(--coin-size) * 0.4);
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
	}

	/* Tails side */
	.coin-tails {
		transform: rotateY(180deg);
		background: theme('colors.bg.deep');
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.heads-content {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-3);
	}

	.heads-time {
		color: theme('colors.gold.DEFAULT');
		font-size: calc(var(--coin-size) * 0.18);
		font-weight: 700;
		text-shadow:
			0 0 20px rgba(212, 175, 55, 0.8),
			0 0 40px rgba(212, 175, 55, 0.6),
			0 2px 4px rgba(0, 0, 0, 0.8);
		line-height: 1;
		white-space: nowrap;
	}

	.tails-background {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0.55;
		filter: blur(2px);
	}

	.tails-content {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 15%;
	}

	.tails-title {
		color: theme('colors.cream.DEFAULT');
		font-size: calc(var(--coin-size) * 0.12);
		font-weight: 600;
		line-height: 1.2;
		text-shadow:
			0 0 15px rgba(0, 0, 0, 0.9),
			0 2px 8px rgba(0, 0, 0, 0.8);
		word-wrap: break-word;
		overflow-wrap: break-word;
		hyphens: auto;
	}

	.tap-hint {
		position: absolute;
		bottom: calc(var(--coin-size) * -0.4);
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

	/* Hover effects */
	.coin-container:hover .coin {
		transform: scale(1.05);
	}

	.coin-container.flipped:hover .coin {
		transform: rotateY(180deg) scale(1.05);
	}

	/* Focus state for accessibility */
	.coin-container:focus {
		outline: 2px solid rgba(212, 175, 55, 0.5);
		outline-offset: 4px;
	}
</style>
