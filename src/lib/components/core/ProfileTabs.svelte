<script lang="ts">
	import type { ProfileTab } from '$types';

	export let activeTab: ProfileTab = 'tokens';
	export let onTabChange: ((tab: ProfileTab) => void) | undefined = undefined;

	const tabs: { value: ProfileTab; label: string; icon: string }[] = [
		{ value: 'tokens', label: 'Tokens', icon: '💎' },
		{ value: 'fulfillments', label: 'Fulfillments', icon: '✓' },
		{ value: 'connections', label: 'Connections', icon: '🤝' },
		{ value: 'settings', label: 'Settings', icon: '⚙️' }
	];

	function handleClick(tab: ProfileTab) {
		activeTab = tab;
		if (onTabChange) onTabChange(tab);
	}
</script>

<div class="profile-tabs">
	{#each tabs as tab}
		<button
			class="tab-button"
			class:active={activeTab === tab.value}
			on:click={() => handleClick(tab.value)}
		>
			<span class="tab-icon">{tab.icon}</span>
			<span class="tab-label">{tab.label}</span>
		</button>
	{/each}
</div>

<style>
	.profile-tabs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
	}

	.tab-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 0.5rem;
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		background: rgba(0, 255, 209, 0.05);
		border-color: theme('colors.cyan.border');
	}

	.tab-button.active {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.tab-icon {
		font-size: 1.25rem;
		line-height: 1;
	}

	.tab-label {
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: color 0.2s ease;
	}

	.tab-button.active .tab-label {
		color: theme('colors.cyan.DEFAULT');
	}

	@media (max-width: 768px) {
		.profile-tabs {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
