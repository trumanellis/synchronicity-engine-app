<script lang="ts">
	/**
	 * Profile Page - Iteration 1
	 * Uses PageContainer and v1 components built with layout primitives
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser } from '$data/mockData';
	import { connections } from '$data/mockData';
	import { tokens } from '$stores/tokensStore';
	import type { ProfileTab } from '$types';

	// Layout Primitives
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V0 Components (not yet rebuilt)
	import ProfileHeader from '$components/core/ProfileHeader.svelte';
	import ProfileTabs from '$components/core/ProfileTabs.svelte';
	import StatCard from '$components/core/StatCard.svelte';
	import TokenCard from '$components/core/TokenCard.svelte';
	import ConnectionCard from '$components/core/ConnectionCard.svelte';
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

<div class="profile-page">
	<PageContainer maxWidth="xl">
		<Stack gap="lg">
			<!-- Profile Header -->
			<ProfileHeader user={currentUser} />

			<!-- Stats Grid -->
			<Section spacing="sm">
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
			</Section>

			<!-- Profile Tabs -->
			<ProfileTabs activeTab={currentProfileTab} onTabChange={handleTabChange} />

			<!-- Tab Content -->
			{#if currentProfileTab === 'tokens'}
				<!-- Tokens Tab -->
				<Section spacing="md">
					<Stack gap="md">
						<SectionTitle icon="💎" title="My Tokens" />
						<Stack gap="md">
							{#each $tokens.slice(0, 3) as token (token.tokenId)}
								<TokenCard {token} onClick={() => goto('/tokens')} />
							{/each}
						</Stack>
						<ActionButton variant="secondary" fullWidth={true} onClick={() => goto('/tokens')}>
							View All Tokens
						</ActionButton>
					</Stack>
				</Section>
			{:else if currentProfileTab === 'fulfillments'}
				<!-- Fulfillments Tab -->
				<Section spacing="md">
					<Stack gap="md">
						<SectionTitle icon="✓" title="Fulfillments" />
						<Stack gap="md">
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
						</Stack>
					</Stack>
				</Section>
			{:else if currentProfileTab === 'connections'}
				<!-- Connections Tab -->
				<Section spacing="md">
					<Stack gap="md">
						<SectionTitle icon="🤝" title="Connections" />
						<Stack gap="md">
							{#each connections as connection (connection.userId)}
								<ConnectionCard {connection} onClick={() => alert(`View ${connection.name}'s profile`)} />
							{/each}
						</Stack>
					</Stack>
				</Section>
			{:else if currentProfileTab === 'settings'}
				<!-- Settings Tab -->
				<Section spacing="md">
					<Stack gap="md">
						<SectionTitle icon="⚙️" title="Settings" />
						<Stack gap="sm">
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
						</Stack>
					</Stack>
				</Section>
			{/if}
		</Stack>
	</PageContainer>

	<BottomNav />
</div>

<style>
	.profile-page {
		min-height: 100vh;
		padding-bottom: 5rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		width: 100%;
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
