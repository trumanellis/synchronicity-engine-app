<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import type { User } from '$types';

	export let avatar: string;
	export let username: string;
	export let name: string;
	export let user: User | undefined = undefined;
	export let size: 'small' | 'medium' | 'large' = 'large';

	// Get public contact info
	$: publicContacts = user?.contactInfo ? Object.entries(user.contactInfo)
		.filter(([key, value]) => {
			if (key === 'visibility') return false;
			const visibility = user.contactInfo?.visibility?.[key as keyof typeof user.contactInfo.visibility];
			return visibility === 'public' && value;
		})
		.map(([key, value]) => ({
			key,
			value,
			icon: getContactIcon(key)
		})) : [];

	function getContactIcon(key: string): string {
		const icons: Record<string, string> = {
			email: '📧',
			phone: '📞',
			whatsapp: '💬',
			telegram: '✈️',
			discord: '🎮',
			instagram: '📷',
			facebook: '👥',
			twitter: '𝕏',
			linkedin: '💼',
			youtube: '📹',
			tiktok: '🎵',
			website: '🌐'
		};
		return icons[key] || '🔗';
	}

	function formatContactValue(key: string, value: string): string {
		if (key === 'instagram' || key === 'twitter' || key === 'tiktok' || key === 'telegram') {
			return `@${value}`;
		}
		if (key === 'website' && !value.startsWith('http')) {
			return value;
		}
		return value;
	}

	let isFlipped = false;
	let isExpanded = false;
	let qrDataUrl = '';
	let container: HTMLDivElement;

	// Size variants (compact design) - Golden rectangle with height > width
	const sizes = {
		small: { width: '80px', height: '130px', emoji: '3.5rem', qr: 70 },
		medium: { width: '140px', height: '227px', emoji: '4rem', qr: 110 },
		large: { width: '180px', height: '291px', emoji: '7rem', qr: 170 }
	};

	const currentSize = sizes[size];

	// Detect if avatar is an image URL or emoji/text
	$: isImageUrl = avatar && (avatar.startsWith('/') || avatar.startsWith('http'));

	onMount(async () => {
		// Generate QR code on mount
		try {
			const url = `https://syncengine.earth/${username}`;
			qrDataUrl = await QRCode.toDataURL(url, {
				width: currentSize.qr * 6,
				margin: 1,
				color: {
					dark: '#0a0e0f', // Dark pattern
					light: '#D4AF37' // Gold background
				}
			});
		} catch (err) {
			console.error('Failed to generate QR code:', err);
		}
	});

	function handleFlip() {
		if (!isFlipped) {
			// Opening: flip first, then expand
			isFlipped = true;
			setTimeout(() => {
				isExpanded = true;
			}, 1400); // Wait for flip to complete
		} else {
			// Closing: flip back first, then shrink
			isFlipped = false;
			setTimeout(() => {
				isExpanded = false;
			}, 1400); // Wait for flip to complete
		}
	}
</script>

<div
	class="bio-card-wrapper"
	class:expanded={isExpanded}
>
	<div
		class="bio-card-container"
		class:flipped={isFlipped}
		on:click={handleFlip}
		on:keypress={(e) => e.key === 'Enter' && handleFlip()}
		bind:this={container}
		style="--width: {currentSize.width}; --height: {currentSize.height}"
		role="button"
		tabindex="0"
		aria-label={isFlipped ? 'Show profile photo' : 'Show QR code'}
	>
		<div class="flip-card">
			<!-- Front: Avatar -->
			<div class="flip-card-front">
				<div class="avatar-circle">
					{#if isImageUrl}
						<img src={avatar} alt={username} class="avatar-image" />
					{:else}
						<span class="avatar-emoji" style="font-size: {currentSize.emoji}">{avatar}</span>
					{/if}
				</div>
			</div>

			<!-- Back: QR Code -->
			<div class="flip-card-back" style="--avatar-bg: url({avatar})">
				<div class="name-header">{name}</div>
				<div class="background-blur"></div>

			{#if qrDataUrl}
				<div class="qr-bottom-section">
					<div class="qr-wrapper">
						<img src={qrDataUrl} alt="Profile QR Code" class="qr-image-bottom" />
					</div>
					<div class="profile-url">syncengine.earth/{username}</div>

					<!-- Public Contact Info (below URL) -->
					{#if publicContacts.length > 0}
						<div class="public-contacts">
							{#each publicContacts as contact}
								<div class="contact-item">
									<span class="contact-emoji">{contact.icon}</span>
									<span class="contact-text">{formatContactValue(contact.key, contact.value)}</span>
								</div>
							{/each}
						</div>
					{/if}
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

	<!-- Backdrop overlay when expanded -->
	{#if isExpanded}
		<div class="backdrop" on:click={handleFlip}></div>
	{/if}
</div>

<style>
	.bio-card-wrapper {
		position: relative;
		z-index: 1;
	}

	.bio-card-wrapper.expanded {
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

	.bio-card-wrapper.expanded .bio-card-container {
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

	.bio-card-container {
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

	.bio-card-wrapper.expanded .bio-card-container {
		width: 100vw;
		max-width: 100vw;
		height: 100vh;
		max-height: 100vh;
	}

	.flip-card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 1.4s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	.bio-card-container.flipped .flip-card {
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

	.bio-card-wrapper.expanded .flip-card-front,
	.bio-card-wrapper.expanded .flip-card-back {
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
		padding: 15px;
		position: relative;
		overflow: hidden;
	}

	.background-blur {
		position: absolute;
		inset: 0;
		background-image: var(--avatar-bg);
		background-size: cover;
		background-position: center;
		opacity: 0.55;
		z-index: 0;
	}

	.bio-card-wrapper.expanded .flip-card-back {
		padding: 0;
	}

	.bio-card-wrapper.expanded .background-blur {
		opacity: 0.55;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.avatar-circle {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
		border: none;
		border-radius: 16px;
		box-shadow: none;
		position: relative;
		overflow: hidden;
		transition:
			border-radius 1s cubic-bezier(0.4, 0.0, 0.2, 1),
			box-shadow 1s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	.bio-card-wrapper.expanded .avatar-circle {
		border-radius: 32px;
		box-shadow:
			0 0 35px rgba(212, 175, 55, 0.6),
			0 0 70px rgba(212, 175, 55, 0.4),
			0 0 105px rgba(212, 175, 55, 0.2);
	}

	.avatar-emoji {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		line-height: 1;
		filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}

	.qr-wrapper {
		position: relative;
		display: inline-block;
	}

	.qr-image-bottom {
		width: 100%;
		height: auto;
		max-width: 100%;
		border-radius: 16px;
		background: #87a96b;
		padding: 3px;
		opacity: 0.66;
		border: 3px solid #87a96b;
		box-shadow:
			0 0 25px rgba(135, 169, 107, 0.7),
			0 0 45px rgba(135, 169, 107, 0.5),
			0 0 65px rgba(135, 169, 107, 0.3);
		transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s;
	}

	.qr-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 33%;
		height: 33%;
		object-fit: contain;
		opacity: 0.33;
		pointer-events: none;
	}

	.bio-card-wrapper.expanded .qr-image-bottom {
		padding: 3px;
		border-radius: 20px;
		border: 3px solid #87a96b;
		box-shadow:
			0 0 35px rgba(135, 169, 107, 0.8),
			0 0 70px rgba(135, 169, 107, 0.6),
			0 0 105px rgba(135, 169, 107, 0.4);
		width: 31.8vw;
		height: 31.8vw;
		max-width: 100%;
		object-fit: contain;
	}

	.qr-label {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
		transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.2s;
	}

	.bio-card-wrapper.expanded .qr-label {
		font-size: var(--font-size-2);
		margin-top: 0;
		margin-bottom: var(--spacing-2);
	}

	.qr-bottom-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	/* Small flipped card state - scale content to fit small card */
	.bio-card-wrapper:not(.expanded) .bio-card-container.flipped .qr-bottom-section {
		transform: scale(0.55);
		transform-origin: center center;
	}

	.bio-card-wrapper.expanded .qr-bottom-section {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 63.6%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: var(--spacing-1);
		gap: var(--spacing-3);
		transform: scale(1);
	}

	.qr-loading {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.7;
		position: relative;
		z-index: 1;
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
	.bio-card-wrapper:not(.expanded) .bio-card-container:hover .flip-card {
		transform: rotateY(10deg);
	}

	.bio-card-wrapper:not(.expanded) .bio-card-container.flipped:hover .flip-card {
		transform: rotateY(190deg);
	}

	/* Focus state for accessibility - only when not expanded */
	.bio-card-wrapper:not(.expanded) .bio-card-container:focus {
		outline: 2px solid rgba(255, 255, 255, 0.3);
		outline-offset: 4px;
	}

	/* Remove focus outline when expanded */
	.bio-card-wrapper.expanded .bio-card-container:focus {
		outline: none;
	}

	.profile-url {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.8;
		text-decoration: none;
		text-align: center;
		transition: all 0.2s ease;
		position: relative;
		z-index: 1;
	}

	.bio-card-wrapper.expanded .profile-url {
		font-size: var(--font-size-1);
	}

	.name-header {
		position: absolute;
		top: var(--spacing-1);
		left: 0;
		right: 0;
		text-align: center;
		color: #ffffff;
		font-size: var(--font-size-2);
		font-weight: 700;
		text-shadow:
			0 0 10px rgba(255, 255, 255, 0.8),
			0 0 20px rgba(255, 255, 255, 0.6),
			0 0 30px rgba(255, 255, 255, 0.4);
		z-index: 10;
		pointer-events: none;
		letter-spacing: 0.05em;
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
	}

	/* Small flipped card state - scale name header */
	.bio-card-wrapper:not(.expanded) .bio-card-container.flipped .name-header {
		font-size: 0.6rem;
		top: 4px;
	}

	.bio-card-wrapper.expanded .name-header {
		font-size: var(--font-size-0);
		top: var(--spacing-0);
	}

	/* Public Contact Info */
	.public-contacts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3px;
		width: 100%;
		margin-top: var(--spacing-4);
		z-index: 10;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 4px;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		border-radius: 3px;
		padding: 2px 6px;
		font-size: 0.65rem;
		line-height: 1.2;
	}

	.contact-emoji {
		font-size: 0.8rem;
		flex-shrink: 0;
	}

	.contact-text {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bio-card-wrapper.expanded .public-contacts {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4);
		margin-top: var(--spacing-2);
	}

	.bio-card-wrapper.expanded .contact-item {
		font-size: var(--font-size-2);
		padding: var(--spacing-4) var(--spacing-3);
		border-radius: var(--spacing-4);
	}

	.bio-card-wrapper.expanded .contact-emoji {
		font-size: var(--font-size-1);
	}

	.bio-card-wrapper.expanded .contact-text {
		font-size: var(--font-size-2);
	}
</style>
