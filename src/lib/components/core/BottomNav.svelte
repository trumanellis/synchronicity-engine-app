<script lang="ts">
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

<nav class="fixed bottom-0 left-0 right-0 bg-bg-mid border-t-2 border-cyan px-4 py-3 z-50">
	<div class="flex justify-around items-center max-w-md mx-auto">
		{#each tabs as tab}
			<button
				class="nav-button"
				class:active={$activeTab === tab.id}
				on:click={() => handleTabClick(tab)}
				aria-label={tab.label}
			>
				<div class="relative">
					<span class="text-2xl">{tab.icon}</span>
					{#if tab.badge}
						<span class="nav-badge">{tab.badge}</span>
					{/if}
				</div>
				<span class="text-xs font-medium mt-1">{tab.label}</span>
			</button>
		{/each}
	</div>
</nav>

<style>
	.nav-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: none;
		border: none;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0.5rem 1rem;
		min-width: 60px;
	}

	.nav-button:hover,
	.nav-button.active {
		color: theme('colors.cyan.DEFAULT');
	}

	.nav-button.active span:first-child {
		filter: drop-shadow(0 0 8px rgba(0, 255, 209, 0.8));
	}

	.nav-badge {
		position: absolute;
		top: -4px;
		right: -4px;
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
		border-radius: 10px;
		padding: 2px 6px;
		font-size: 0.65rem;
		font-weight: 700;
		box-shadow: 0 0 10px theme('colors.gold.glow');
	}
</style>
