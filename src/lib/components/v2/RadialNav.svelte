<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser } from '$lib/data/mockData';

	// Optional username for public profile pages
	export let username: string | undefined = undefined;

	let isOpen = false;

	const navItems = [
		{ icon: '/VisualizeBanner.png', route: 'home', label: 'Home', angle: -90 },
		{ icon: '/DiscoverBanner.png', route: 'browse', label: 'Discover', angle: -45 },
		{ icon: '/CreateIntentionBanner.png', route: 'create', label: 'Create', angle: 0 },
		{ icon: '/ArtifactsBanner.png', route: 'tokens', label: 'Tokens', angle: 45 },
		{ icon: '/AvatarBanner.png', route: 'profile', label: 'Profile', angle: 90 }
	];

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function handleNavigate(route: string) {
		// If navigating to profile and we have a username, go to their bio page
		if (route === 'profile' && username) {
			goto(`/${username}`);
			isOpen = false;
			return;
		}

		activeTab.set(route as any);
		goto(`/${route === 'home' ? '' : route}`);
		isOpen = false;
	}

	// Calculate radial position
	function getRadialPosition(angle: number, radius: number) {
		const rad = (angle * Math.PI) / 180;
		return {
			x: Math.sin(rad) * radius,
			y: -Math.cos(rad) * radius
		};
	}
</script>

<nav class="radial-nav">
	<!-- Backdrop overlay when open -->
	{#if isOpen}
		<div class="backdrop" on:click={toggleMenu}></div>
	{/if}

	<!-- Radial menu items -->
	<div class="radial-items" class:open={isOpen}>
		{#each navItems as item, i}
			{@const pos = getRadialPosition(item.angle, 120)}
			<button
				class="radial-item"
				class:active={$activeTab === item.route}
				style="--x: {pos.x}px; --y: {pos.y}px;"
				on:click={() => handleNavigate(item.route)}
				aria-label={item.label}
			>
				<img src={item.icon} alt={item.label} />
			</button>
		{/each}
	</div>

	<!-- Center profile button -->
	<button class="center-button" on:click={toggleMenu} aria-label="Menu">
		<img src={currentUser.avatar} alt="Profile" class="avatar-image" />
		<div class="pulse-ring"></div>
	</button>
</nav>

<style>
	.radial-nav {
		position: fixed;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2000;
	}

	/* Backdrop */
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 1999;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Center Button */
	.center-button {
		position: relative;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(0, 255, 209, 0.2));
		backdrop-filter: blur(12px);
		border: 3px solid rgba(212, 175, 55, 0.6);
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.1);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2001;
	}

	.center-button:hover {
		transform: scale(1.1);
		border-color: rgba(212, 175, 55, 1);
		box-shadow: 0 12px 48px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(212, 175, 55, 0.2);
	}

	.center-button:active {
		transform: scale(0.95);
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	/* Pulse ring animation */
	.pulse-ring {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid rgba(212, 175, 55, 0.8);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}

	/* Radial Items Container */
	.radial-items {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		pointer-events: none;
	}

	.radial-items.open {
		pointer-events: all;
	}

	/* Individual Radial Items */
	.radial-item {
		position: absolute;
		bottom: 32px;
		left: 50%;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4));
		backdrop-filter: blur(10px);
		border: 2px solid rgba(107, 207, 126, 0.4);
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		opacity: 0;
		transform: translate(-50%, 0) scale(0.3);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.radial-items.open .radial-item {
		opacity: 1;
		transform: translate(calc(-50% + var(--x)), var(--y)) scale(1);
	}

	.radial-item:hover {
		border-color: rgba(0, 255, 209, 0.8);
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.2), rgba(0, 0, 0, 0.5));
		box-shadow: 0 6px 24px rgba(0, 255, 209, 0.4);
		transform: translate(calc(-50% + var(--x)), var(--y)) scale(1.15);
		z-index: 10;
	}

	.radial-item.active {
		border-color: rgba(212, 175, 55, 0.9);
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(0, 0, 0, 0.5));
		box-shadow: 0 6px 24px rgba(212, 175, 55, 0.5);
	}

	.radial-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	/* Staggered animation delay */
	.radial-item:nth-child(1) {
		transition-delay: 0.05s;
	}
	.radial-item:nth-child(2) {
		transition-delay: 0.1s;
	}
	.radial-item:nth-child(3) {
		transition-delay: 0.15s;
	}
	.radial-item:nth-child(4) {
		transition-delay: 0.2s;
	}
	.radial-item:nth-child(5) {
		transition-delay: 0.25s;
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.radial-nav {
			bottom: 16px;
		}

		.center-button {
			width: 56px;
			height: 56px;
		}

		.radial-item {
			width: 48px;
			height: 48px;
		}
	}
</style>
