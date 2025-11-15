<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';

	// Optional username for public profile pages
	export let username: string | undefined = undefined;

	function handleNavigate(tab: string) {
		// If we have a username and navigating to profile, go to their bio page
		if (tab === 'profile' && username) {
			goto(`/${username}`);
			return;
		}

		activeTab.set(tab as any);
		goto(`/${tab === 'home' ? '' : tab}`);
	}

	function handleCreate() {
		goto('/create');
	}
</script>

<nav class="bottom-nav">
	<!-- Left Section -->
	<button
		class="nav-item"
		class:active={$activeTab === 'home'}
		on:click={() => handleNavigate('home')}
		aria-label="Home"
	>
		<span class="nav-icon">🏠</span>
		<span class="nav-label">Home</span>
	</button>

	<button
		class="nav-item"
		class:active={$activeTab === 'browse'}
		on:click={() => handleNavigate('browse')}
		aria-label="Browse"
	>
		<span class="nav-icon">🔍</span>
		<span class="nav-label">Browse</span>
	</button>

	<!-- Center Action Button -->
	<button class="nav-item action-button" on:click={handleCreate} aria-label="Create Intention">
		<span class="nav-icon">🙏</span>
		<span class="nav-label">Create</span>
	</button>

	<!-- Right Section -->
	<button
		class="nav-item"
		class:active={$activeTab === 'tokens'}
		on:click={() => handleNavigate('tokens')}
		aria-label="Tokens"
	>
		<span class="nav-icon">💎</span>
		<span class="nav-label">Tokens</span>
	</button>

	<button
		class="nav-item"
		class:active={$activeTab === 'profile'}
		on:click={() => handleNavigate('profile')}
		aria-label="Profile"
	>
		<span class="nav-icon">👤</span>
		<span class="nav-label">Profile</span>
	</button>
</nav>

<style>
	.bottom-nav {
		position: relative; /* Changed from fixed to relative */
		bottom: auto; /* Reset bottom positioning */
		left: auto; /* Reset left positioning */
		right: auto; /* Reset right positioning */
		background: #000000; /* Solid black background */
		backdrop-filter: none; /* Remove blur */
		border-top: none; /* Remove divider */
		padding: 0 0.25rem 0; /* Remove top and bottom padding */
		display: flex;
		align-items: center; /* Vertically center icons */
		justify-content: space-around;
		gap: 0.15rem;
		z-index: 1000;
		box-shadow: none; /* Remove shadow */
		flex-shrink: 0; /* Prevent shrinking */
		height: 60px; /* Smaller on mobile */
	}

	/* Desktop: taller nav */
	@media (min-width: 768px) {
		.bottom-nav {
			height: 85px;
		}
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		flex: 1;
		position: relative;
	}

	.nav-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based - smaller on mobile */
		transition: all 0.3s ease;
		filter: grayscale(0.5);
		opacity: 0.6;
	}

	/* Desktop: larger icons */
	@media (min-width: 768px) {
		.nav-icon {
			font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		}
	}

	.nav-label {
		display: none; /* Hide labels - icons are sufficient */
	}

	.nav-item:hover .nav-icon,
	.nav-item.active .nav-icon {
		filter: grayscale(0);
		opacity: 1;
		transform: translateY(-2px);
	}


	.nav-item.active .nav-icon {
		filter: drop-shadow(0 0 8px rgba(0, 255, 209, 0.6));
	}

	/* Action buttons (create & proof) */
	.nav-item.action-button .nav-icon {
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.nav-item.action-button:hover .nav-icon {
		filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
		transform: translateY(-3px) scale(1.1);
	}
</style>
