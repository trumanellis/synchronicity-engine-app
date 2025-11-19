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
	<!-- Home -->
	<button
		class="nav-item"
		class:active={$activeTab === 'home'}
		on:click={() => handleNavigate('home')}
		aria-label="Home"
	>
		<img src="/1.png" alt="Home" />
	</button>

	<!-- Discover -->
	<button
		class="nav-item"
		class:active={$activeTab === 'browse'}
		on:click={() => handleNavigate('browse')}
		aria-label="Discover"
	>
		<img src="/2.png" alt="Discover" />
	</button>

	<!-- Create Intention -->
	<button class="nav-item action-button" on:click={handleCreate} aria-label="Create Intention">
		<img src="/3.png" alt="Create" />
	</button>

	<!-- Tokens -->
	<button
		class="nav-item"
		class:active={$activeTab === 'tokens'}
		on:click={() => handleNavigate('tokens')}
		aria-label="Tokens"
	>
		<img src="/4.png" alt="Tokens" />
	</button>

	<!-- Profile -->
	<button
		class="nav-item"
		class:active={$activeTab === 'profile'}
		on:click={() => handleNavigate('profile')}
		aria-label="Profile"
	>
		<img src="/5.png" alt="Profile" />
	</button>
</nav>

<style>
	.bottom-nav {
		position: relative;
		background: linear-gradient(
			to bottom,
			rgba(107, 207, 126, 0) 0%,
			rgba(107, 207, 126, 0.15) 23%,
			rgba(107, 207, 126, 0.15) 100%
		); /* Gradient from transparent to moss green */
		backdrop-filter: blur(8px);
		box-shadow:
			0 -4px 20px rgba(107, 207, 126, 0.3),
			inset 0 0 30px rgba(107, 207, 126, 0.1);
		padding: var(--spacing-4); /* 8px padding around buttons */
		display: grid;
		grid-template-columns: repeat(5, 1fr); /* 5 equal columns */
		gap: var(--spacing-4); /* 8px gap between buttons */
		z-index: 1000;
		flex-shrink: 0;
		width: 100%; /* Ensure it doesn't exceed viewport */
		box-sizing: border-box; /* Include padding in width calculation */
	}

	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		position: relative;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		animation: gold-pulse 2s ease-in-out infinite;
	}

	.nav-item img {
		width: 100%;
		height: auto;
		display: block;
	}

	@keyframes gold-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		}
		50% {
			filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.9));
		}
	}
</style>
