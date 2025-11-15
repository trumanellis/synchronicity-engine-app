<script lang="ts">
	export let tabs: Array<{ id: string; label: string; icon: string; count?: number }>;
	export let activeTab: string;

	function handleTabClick(tabId: string) {
		activeTab = tabId;
	}
</script>

<div class="tab-switcher">
	{#each tabs as tab}
		<button
			class="tab-button"
			class:active={activeTab === tab.id}
			on:click={() => handleTabClick(tab.id)}
		>
			<span class="tab-icon">{tab.icon}</span>
			<span class="tab-label">{tab.label}</span>
			{#if tab.count !== undefined}
				<span class="tab-count">{tab.count}</span>
			{/if}
		</button>
	{/each}
</div>

<style>
	.tab-switcher {
		display: flex;
		gap: var(--spacing-4);
		border-bottom: 2px solid rgba(0, 255, 209, 0.2);
		margin-bottom: var(--spacing-2);
	}

	.tab-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-4) var(--spacing-3);
		background: transparent;
		border: none;
		border-bottom: 3px solid transparent;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		bottom: -2px;
	}

	.tab-button:hover {
		color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.tab-button.active {
		color: theme('colors.cyan.DEFAULT');
		border-bottom-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.1);
	}

	.tab-icon {
		font-size: var(--font-size-1);
	}

	.tab-label {
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.tab-count {
		background: rgba(0, 255, 209, 0.2);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: 1rem;
		padding: 0.15rem 0.5rem;
		font-size: var(--font-size-3);
		font-weight: 700;
		min-width: 1.5rem;
		text-align: center;
	}

	.tab-button.active .tab-count {
		background: theme('colors.cyan.DEFAULT');
		color: theme('colors.bg.deep');
	}
</style>
