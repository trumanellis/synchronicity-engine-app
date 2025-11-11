<script lang="ts">
	/**
	 * ResponsiveNav - Adaptive navigation component
	 * Mobile (< 768px): Top bar with horizontal layout
	 * Desktop (>= 768px): Left sidebar with vertical layout
	 */
	import { activeTab } from '$stores/navigationStore';
	import { userTokenCount } from '$stores/userStore';
	import { goto } from '$app/navigation';
	import type { NavTab } from '$types';

	interface Tab {
		id: NavTab;
		icon: string;
		label: string;
		path: string;
		badge?: number;
	}

	$: tabs = [
		{ id: 'home' as NavTab, icon: '🏠', label: 'Home', path: '/home' },
		{ id: 'browse' as NavTab, icon: '🔍', label: 'Browse', path: '/browse' },
		{ id: 'create' as NavTab, icon: '✨', label: 'Create', path: '/create' },
		{
			id: 'tokens' as NavTab,
			icon: '💎',
			label: 'Tokens',
			path: '/tokens',
			badge: $userTokenCount
		},
		{ id: 'profile' as NavTab, icon: '👤', label: 'Profile', path: '/profile' }
	];

	function handleTabClick(tab: Tab) {
		activeTab.set(tab.id);
		goto(tab.path);
	}
</script>

<!-- Mobile: Top bar -->
<!-- Desktop: Left sidebar -->
<nav class="responsive-nav">
	<div class="nav-container">
		{#each tabs as tab}
			<button
				class="nav-button"
				class:active={$activeTab === tab.id}
				on:click={() => handleTabClick(tab)}
				aria-label={tab.label}
			>
				<div class="relative">
					<span class="nav-icon">{tab.icon}</span>
					{#if tab.badge}
						<span class="nav-badge">{tab.badge}</span>
					{/if}
				</div>
				<span class="nav-label">{tab.label}</span>
			</button>
		{/each}
	</div>
</nav>

<style>
	/* Base navigation styles */
	.responsive-nav {
		position: fixed;
		background: theme('colors.bg.mid');
		z-index: 50;
	}

	/* Mobile: Top bar */
	@media (max-width: 767px) {
		.responsive-nav {
			top: 0;
			left: 0;
			right: 0;
			border-bottom: 2px solid theme('colors.cyan.DEFAULT');
			padding: 0.75rem 1rem;
		}

		.nav-container {
			display: flex;
			justify-content: space-around;
			align-items: center;
			max-width: 100%;
			gap: 0.5rem;
		}

		.nav-button {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.25rem;
			min-width: 60px;
		}

		.nav-icon {
			font-size: 1.5rem;
		}

		.nav-label {
			font-size: 0.65rem;
			font-weight: 500;
		}
	}

	/* Desktop: Left sidebar */
	@media (min-width: 768px) {
		.responsive-nav {
			top: 0;
			left: 0;
			bottom: 0;
			width: 5rem;
			border-right: 2px solid theme('colors.cyan.DEFAULT');
			padding: 1.5rem 0.5rem;
		}

		.nav-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;
			height: 100%;
		}

		.nav-button {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			width: 100%;
		}

		.nav-icon {
			font-size: 2rem;
		}

		.nav-label {
			font-size: 0.7rem;
			font-weight: 500;
			text-align: center;
		}
	}

	/* Common button styles */
	.nav-button {
		background: none;
		border: none;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0.5rem;
	}

	.nav-button:hover,
	.nav-button.active {
		color: theme('colors.cyan.DEFAULT');
	}

	.nav-button.active .nav-icon {
		filter: drop-shadow(0 0 8px rgba(0, 255, 209, 0.8));
	}

	.nav-badge {
		position: absolute;
		top: -4px;
		right: -8px;
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
		border-radius: 10px;
		padding: 2px 6px;
		font-size: 0.65rem;
		font-weight: 700;
		box-shadow: 0 0 10px theme('colors.gold.glow');
	}
</style>
