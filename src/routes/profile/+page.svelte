<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser } from '$data/mockData';
	import { connections } from '$data/mockData';
	import { tokens } from '$stores/tokensStore';
	import type { ProfileTab } from '$types';

	// Components
	import ProfileHeader from '$components/core/ProfileHeader.svelte';
	import ProfileTabs from '$components/core/ProfileTabs.svelte';
	import StatCard from '$components/core/StatCard.svelte';
	import TokenCard from '$components/core/TokenCard.svelte';
	import ConnectionCard from '$components/core/ConnectionCard.svelte';
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import EmptyState from '$components/core/EmptyState.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';

	let currentProfileTab: ProfileTab = 'tokens';

	onMount(() => {
		activeTab.set('profile');
	});

	function handleTabChange(tab: ProfileTab) {
		currentProfileTab = tab;
	}

	function handleEditProfile() {
		alert('Edit profile would open here');
	}

	function handleLogout() {
		alert('Logout functionality would happen here');
	}
</script>

<svelte:head>
	<title>{currentUser.name} - Synchronicity Engine</title>
</svelte:head>

<div class="min-h-screen pb-24">
	<div class="phone-mockup">
		<div class="screen-content">
			<!-- Profile Header -->
			<ProfileHeader user={currentUser} />

			<!-- Stats Grid -->
			<div class="stats-grid">
				<StatCard
					icon="💎"
					value={currentUser.stats.tokensHeld}
					label="Tokens"
					onClick={() => (currentProfileTab = 'tokens')}
				/>
				<StatCard
					icon="⏱️"
					value={`${currentUser.stats.totalHoursEarned}h`}
					label="Hours"
					onClick={() => (currentProfileTab = 'tokens')}
				/>
				<StatCard
					icon="✓"
					value={currentUser.stats.fulfillmentsCompleted}
					label="Fulfilled"
					onClick={() => (currentProfileTab = 'fulfillments')}
				/>
				<StatCard
					icon="🤝"
					value={currentUser.stats.connections}
					label="Connections"
					onClick={() => (currentProfileTab = 'connections')}
				/>
			</div>

			<!-- Profile Tabs -->
			<ProfileTabs activeTab={currentProfileTab} onTabChange={handleTabChange} />

			<!-- Tab Content -->
			{#if currentProfileTab === 'tokens'}
				<!-- Tokens Tab -->
				<SectionTitle icon="💎" title="My Tokens" />
				<div class="tokens-list">
					{#each $tokens.slice(0, 3) as token (token.tokenId)}
						<TokenCard {token} onClick={() => goto('/tokens')} />
					{/each}
				</div>
				<ActionButton variant="secondary" fullWidth={true} onClick={() => goto('/tokens')}>
					View All Tokens
				</ActionButton>
			{:else if currentProfileTab === 'fulfillments'}
				<!-- Fulfillments Tab -->
				<SectionTitle icon="✓" title="Fulfillments" />
				<div class="fulfillments-list">
					<div class="fulfillment-item">
						<div class="fulfillment-icon">✓</div>
						<div class="fulfillment-content">
							<h4 class="fulfillment-title">Tool Shed Construction</h4>
							<p class="fulfillment-meta">Garden Infrastructure • 16h • Completed</p>
						</div>
					</div>
					<div class="fulfillment-item">
						<div class="fulfillment-icon">✓</div>
						<div class="fulfillment-content">
							<h4 class="fulfillment-title">Irrigation Design</h4>
							<p class="fulfillment-meta">Water Systems • 6h • Completed</p>
						</div>
					</div>
					<div class="fulfillment-item">
						<div class="fulfillment-icon">🔄</div>
						<div class="fulfillment-content">
							<h4 class="fulfillment-title">Solar Dehydrator Workshop</h4>
							<p class="fulfillment-meta">Off-Grid Living • In Progress</p>
						</div>
					</div>
				</div>
			{:else if currentProfileTab === 'connections'}
				<!-- Connections Tab -->
				<SectionTitle icon="🤝" title="Connections" />
				<div class="connections-list">
					{#each connections as connection (connection.userId)}
						<ConnectionCard {connection} onClick={() => alert(`View ${connection.name}'s profile`)} />
					{/each}
				</div>
			{:else if currentProfileTab === 'settings'}
				<!-- Settings Tab -->
				<SectionTitle icon="⚙️" title="Settings" />
				<div class="settings-list">
					<button class="setting-item" on:click={handleEditProfile}>
						<span class="setting-icon">✏️</span>
						<span class="setting-label">Edit Profile</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item">
						<span class="setting-icon">🔔</span>
						<span class="setting-label">Notifications</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item">
						<span class="setting-icon">🛕</span>
						<span class="setting-label">Temple Settings</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item">
						<span class="setting-icon">💳</span>
						<span class="setting-label">Payment Methods</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item">
						<span class="setting-icon">🔒</span>
						<span class="setting-label">Privacy & Security</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item">
						<span class="setting-icon">❓</span>
						<span class="setting-label">Help & Support</span>
						<span class="setting-arrow">›</span>
					</button>
					<button class="setting-item danger" on:click={handleLogout}>
						<span class="setting-icon">🚪</span>
						<span class="setting-label">Logout</span>
						<span class="setting-arrow">›</span>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<BottomNav />
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.tokens-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.fulfillments-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.fulfillment-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem;
		transition: all 0.2s ease;
	}

	.fulfillment-item:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.fulfillment-icon {
		width: 40px;
		height: 40px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.fulfillment-content {
		flex: 1;
	}

	.fulfillment-title {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.9rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.fulfillment-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.connections-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.settings-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.setting-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.setting-item:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.setting-item.danger {
		border-color: rgba(255, 99, 71, 0.3);
	}

	.setting-item.danger:hover {
		border-color: rgba(255, 99, 71, 0.6);
		background: rgba(255, 99, 71, 0.05);
	}

	.setting-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.setting-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		font-weight: 500;
		flex: 1;
	}

	.setting-item.danger .setting-label {
		color: rgba(255, 99, 71, 1);
	}

	.setting-arrow {
		color: theme('colors.sage.DEFAULT');
		font-size: 1.5rem;
		flex-shrink: 0;
	}
</style>
