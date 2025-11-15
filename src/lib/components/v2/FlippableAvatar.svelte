<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	export let avatar: string;
	export let username: string;
	export let size: 'small' | 'medium' | 'large' = 'large';

	let isFlipped = false;
	let qrDataUrl = '';
	let container: HTMLDivElement;

	// Size variants (φ-based)
	const sizes = {
		small: { container: '80px', emoji: '3.5rem', qr: 70 },
		medium: { container: '120px', emoji: '5rem', qr: 110 },
		large: { container: '180px', emoji: '7rem', qr: 170 }
	};

	const currentSize = sizes[size];

	onMount(async () => {
		// Generate QR code on mount
		try {
			const url = `https://syncengine.earth/${username}`;
			qrDataUrl = await QRCode.toDataURL(url, {
				width: currentSize.qr,
				margin: 1,
				color: {
					dark: '#D4AF37', // Gold color
					light: '#0a0e0f' // Background
				}
			});
		} catch (err) {
			console.error('Failed to generate QR code:', err);
		}
	});

	function handleFlip() {
		isFlipped = !isFlipped;
	}
</script>

<div
	class="flippable-avatar-container"
	class:flipped={isFlipped}
	on:click={handleFlip}
	on:keypress={(e) => e.key === 'Enter' && handleFlip()}
	bind:this={container}
	style="--size: {currentSize.container}"
	role="button"
	tabindex="0"
	aria-label={isFlipped ? 'Show profile photo' : 'Show QR code'}
>
	<div class="flip-card">
		<!-- Front: Avatar -->
		<div class="flip-card-front">
			<div class="avatar-circle">
				<span class="avatar-emoji" style="font-size: {currentSize.emoji}">{avatar}</span>
			</div>
		</div>

		<!-- Back: QR Code -->
		<div class="flip-card-back">
			{#if qrDataUrl}
				<div class="qr-container">
					<img src={qrDataUrl} alt="Profile QR Code" class="qr-image" />
					<div class="qr-label">Scan to visit</div>
				</div>
			{:else}
				<div class="qr-loading">Generating QR...</div>
			{/if}
		</div>
	</div>

	<!-- Tap hint for first-time users -->
	{#if !isFlipped}
		<div class="tap-hint">Tap to reveal QR</div>
	{/if}
</div>

<style>
	.flippable-avatar-container {
		width: var(--size);
		height: var(--size);
		perspective: 1000px;
		cursor: pointer;
		position: relative;
		margin: 0 auto;
	}

	.flip-card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.flippable-avatar-container.flipped .flip-card {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 50%;
	}

	.flip-card-front {
		z-index: 2;
		transform: rotateY(0deg);
	}

	.flip-card-back {
		transform: rotateY(180deg);
		background: theme('colors.bg.mid');
		border: 4px solid theme('colors.gold.DEFAULT');
		box-shadow: 0 0 40px theme('colors.gold.glow');
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-circle {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: theme('colors.bg.mid');
		border: 4px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		box-shadow: 0 0 40px theme('colors.gold.glow');
		animation: pulse-glow var(--duration-0) ease-in-out infinite;
		position: relative;
		overflow: hidden;
	}

	.avatar-emoji {
		display: block;
		line-height: 1;
		filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
	}

	.qr-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-4);
		padding: var(--spacing-4);
	}

	.qr-image {
		width: 100%;
		height: auto;
		border-radius: var(--spacing-4);
		background: theme('colors.bg.deep');
		padding: 4px;
	}

	.qr-label {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
	}

	.qr-loading {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.7;
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

	/* Hover effects */
	.flippable-avatar-container:hover .avatar-circle {
		box-shadow: 0 0 60px theme('colors.gold.glow');
		border-color: rgba(212, 175, 55, 1);
	}

	.flippable-avatar-container:hover .flip-card-back {
		box-shadow: 0 0 60px theme('colors.gold.glow');
	}

	/* Focus state for accessibility */
	.flippable-avatar-container:focus {
		outline: 2px solid theme('colors.gold.DEFAULT');
		outline-offset: 4px;
	}
</style>
