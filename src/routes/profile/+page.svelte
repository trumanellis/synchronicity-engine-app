<script lang="ts">
	/**
	 * Profile Page - "My Account"
	 * Your identity and account management in the Synchronicity Engine
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser, temple, recentActivity } from '$data/mockData';

	// Layout Primitives
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

	// V0 Components
	import BottomNav from '$components/core/BottomNav.svelte';

	let isEditing = false;
	let editedName = currentUser.name;
	let editedBio = currentUser.bio;

	onMount(() => {
		activeTab.set('profile');
	});

	function handleEditProfile() {
		isEditing = true;
	}

	function handleSaveProfile() {
		// Would save to backend
		isEditing = false;
		alert('Profile updated!');
	}

	function handleCancelEdit() {
		editedName = currentUser.name;
		editedBio = currentUser.bio;
		isEditing = false;
	}

	function handleLogout() {
		if (confirm('Are you sure you want to logout?')) {
			alert('Logout functionality would happen here');
		}
	}
</script>

<svelte:head>
	<title>My Account - Synchronicity Engine</title>
</svelte:head>

<div class="profile-page">
	<PageContainer maxWidth="xl">
		<Stack gap="lg">
			<!-- Page Header -->
			<Section spacing="sm">
				<h1 class="page-title">My Account</h1>
			</Section>

			<!-- Profile Identity Card -->
			<Section spacing="md">
				<Card variant="default" padding="lg">
					<Stack gap="lg">
						<!-- Avatar and Name -->
						<Row gap="lg" align="start">
							<div class="profile-avatar">{currentUser.avatar}</div>
							<Stack gap="sm" className="flex-1">
								{#if isEditing}
									<input
										type="text"
										bind:value={editedName}
										class="edit-input name-input"
										placeholder="Your name"
									/>
									<textarea
										bind:value={editedBio}
										class="edit-input bio-input"
										placeholder="Your bio"
										rows="3"
									/>
								{:else}
									<h2 class="profile-name">{currentUser.name}</h2>
									<p class="profile-bio">{currentUser.bio}</p>
								{/if}
							</Stack>
						</Row>

						<!-- Temple Affiliation -->
						<Card variant="subtle" padding="md">
							<Row gap="md" align="center">
								<div class="temple-icon">{temple.icon}</div>
								<Stack gap="xs" className="flex-1">
									<div class="temple-name">{temple.name}</div>
									<div class="temple-meta">
										{currentUser.temple.role} • Joined {new Date(currentUser.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
									</div>
								</Stack>
							</Row>
						</Card>

						<!-- Edit Actions -->
						{#if isEditing}
							<Row gap="sm">
								<button class="btn-secondary flex-1" on:click={handleCancelEdit}>Cancel</button>
								<button class="btn-primary flex-1" on:click={handleSaveProfile}>Save Changes</button>
							</Row>
						{:else}
							<button class="btn-secondary" on:click={handleEditProfile}>
								✏️ Edit Profile
							</button>
						{/if}
					</Stack>
				</Card>
			</Section>

			<!-- Quick Stats Overview -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="📊" title="Your Impact" />
					<div class="stats-grid">
						<Card variant="subtle" padding="md" interactive={true} onClick={() => goto('/tokens')}>
							<Stack gap="xs" align="center">
								<div class="stat-icon">💎</div>
								<div class="stat-value">{currentUser.stats.tokensHeld}</div>
								<div class="stat-label">Tokens</div>
							</Stack>
						</Card>
						<Card variant="subtle" padding="md" interactive={true}>
							<Stack gap="xs" align="center">
								<div class="stat-icon">⏱️</div>
								<div class="stat-value">{currentUser.stats.totalHoursEarned}h</div>
								<div class="stat-label">Hours Earned</div>
							</Stack>
						</Card>
						<Card variant="subtle" padding="md" interactive={true}>
							<Stack gap="xs" align="center">
								<div class="stat-icon">✓</div>
								<div class="stat-value">{currentUser.stats.fulfillmentsCompleted}</div>
								<div class="stat-label">Fulfillments</div>
							</Stack>
						</Card>
						<Card variant="subtle" padding="md" interactive={true}>
							<Stack gap="xs" align="center">
								<div class="stat-icon">🤝</div>
								<div class="stat-value">{currentUser.stats.connections}</div>
								<div class="stat-label">Connections</div>
							</Stack>
						</Card>
					</div>
				</Stack>
			</Section>

			<!-- Recent Activity -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="📜" title="Recent Activity" />
					<Card variant="subtle" padding="md">
						<Stack gap="sm">
							{#each recentActivity.slice(0, 3) as activity}
								<div class="activity-item">
									<div class="activity-icon">{activity.icon}</div>
									<Stack gap="xs" className="flex-1">
										<div class="activity-text">{activity.text}</div>
										{#if activity.meta}
											<div class="activity-meta">{activity.meta}</div>
										{/if}
									</Stack>
								</div>
							{/each}
						</Stack>
					</Card>
				</Stack>
			</Section>

			<!-- Payment Methods -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="💳" title="Payment Methods" />
					<Card variant="subtle" padding="md">
						<Stack gap="sm">
							{#each currentUser.paymentMethods as method}
								<div class="payment-method">
									<div class="payment-icon">
										{#if method.type === 'bank_transfer'}💰{:else if method.type === 'paypal'}💵{:else if method.type === 'venmo'}💸{:else}₿{/if}
									</div>
									<Stack gap="xs" className="flex-1">
										<div class="payment-type">
											{method.type === 'bank_transfer' ? 'Bank Transfer' : method.type}
										</div>
										<div class="payment-details">•••• {method.lastFour}</div>
									</Stack>
									{#if method.isPrimary}
										<div class="payment-badge">Primary</div>
									{/if}
								</div>
							{/each}
							<button class="btn-secondary" on:click={() => alert('Add payment method')}>
								+ Add Payment Method
							</button>
						</Stack>
					</Card>
				</Stack>
			</Section>

			<!-- Settings & Actions -->
			<Section spacing="md">
				<Stack gap="md">
					<SectionTitle icon="⚙️" title="Settings & Support" />
					<Stack gap="sm">
						<button class="settings-button" on:click={() => alert('Notifications settings')}>
							<span class="settings-icon">🔔</span>
							<span class="settings-label">Notifications</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button" on:click={() => alert('Privacy settings')}>
							<span class="settings-icon">🔒</span>
							<span class="settings-label">Privacy & Security</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button" on:click={() => alert('Temple settings')}>
							<span class="settings-icon">🛕</span>
							<span class="settings-label">Temple Settings</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button" on:click={() => alert('Help & support')}>
							<span class="settings-icon">❓</span>
							<span class="settings-label">Help & Support</span>
							<span class="settings-arrow">›</span>
						</button>
						<button class="settings-button danger" on:click={handleLogout}>
							<span class="settings-icon">🚪</span>
							<span class="settings-label">Logout</span>
							<span class="settings-arrow">›</span>
						</button>
					</Stack>
				</Stack>
			</Section>

			<!-- App Info -->
			<Section spacing="lg">
				<Card variant="subtle" padding="md">
					<Stack gap="xs" align="center">
						<div class="app-version">Synchronicity Engine v1.0.0</div>
						<div class="app-tagline">Making gratitude flow visible and valuable</div>
					</Stack>
				</Card>
			</Section>
		</Stack>
	</PageContainer>

	<BottomNav />
</div>

<style>
	.profile-page {
		min-height: 100vh;
		padding-top: 5rem; /* Mobile: top bar */
		padding-bottom: 1rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	/* Desktop: sidebar */
	@media (min-width: 768px) {
		.profile-page {
			margin-left: 5rem;
			padding-top: 0;
		}
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0;
	}

	/* Profile Identity */
	.profile-avatar {
		width: 80px;
		height: 80px;
		font-size: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: theme('colors.bg.mid');
		border: 3px solid theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		flex-shrink: 0;
		box-shadow: 0 0 20px theme('colors.cyan.glow');
	}

	.profile-name {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
	}

	.profile-bio {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0;
	}

	/* Temple Affiliation */
	.temple-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.temple-name {
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		font-size: 0.95rem;
	}

	.temple-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	/* Edit Mode */
	.edit-input {
		width: 100%;
		background: theme('colors.bg.deep');
		border: 2px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
		padding: 0.75rem;
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.edit-input:focus {
		outline: none;
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px theme('colors.cyan.glow');
	}

	.name-input {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.bio-input {
		resize: vertical;
		min-height: 80px;
	}

	/* Buttons */
	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
	}

	.btn-primary {
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
	}

	.btn-primary:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-1px);
	}

	.btn-secondary {
		background: theme('colors.bg.mid');
		color: theme('colors.cyan.DEFAULT');
		border: 2px solid theme('colors.cyan.border');
	}

	.btn-secondary:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-icon {
		font-size: 2rem;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: 700;
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		text-align: center;
	}

	/* Activity Items */
	.activity-item {
		display: flex;
		align-items: start;
		gap: 0.75rem;
		padding: 0.75rem;
		background: theme('colors.bg.deep');
		border-radius: 0.5rem;
	}

	.activity-icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.border');
		border-radius: 50%;
		flex-shrink: 0;
	}

	.activity-text {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		line-height: 1.4;
	}

	.activity-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	/* Payment Methods */
	.payment-method {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: theme('colors.bg.deep');
		border-radius: 0.5rem;
	}

	.payment-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		flex-shrink: 0;
	}

	.payment-type {
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: capitalize;
	}

	.payment-details {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.payment-badge {
		background: theme('colors.gold.bg');
		color: theme('colors.gold.DEFAULT');
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.7rem;
		font-weight: 600;
		border: 1px solid theme('colors.gold.border');
	}

	/* Settings Buttons */
	.settings-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.settings-button:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.settings-button.danger {
		border-color: rgba(255, 99, 71, 0.3);
	}

	.settings-button.danger:hover {
		border-color: rgba(255, 99, 71, 0.6);
		background: rgba(255, 99, 71, 0.05);
	}

	.settings-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.settings-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.9rem;
		font-weight: 500;
		flex: 1;
	}

	.settings-button.danger .settings-label {
		color: rgba(255, 99, 71, 1);
	}

	.settings-arrow {
		color: theme('colors.sage.DEFAULT');
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	/* App Info */
	.app-version {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.app-tagline {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
		font-style: italic;
	}
</style>
