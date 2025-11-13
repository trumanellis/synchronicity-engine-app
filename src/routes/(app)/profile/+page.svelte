<script lang="ts">
	/**
	 * Profile Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser, temple, recentActivity } from '$data/mockData';

	// Layout Primitives
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	// V1 Components
	import SectionTitle from '$lib/components/v1/SectionTitle.svelte';

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

<style>
	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
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
		border: 3px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		flex-shrink: 0;
		box-shadow: 0 0 20px theme('colors.gold.glow');
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.profile-name {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
	}

	.profile-bio {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.5;
		margin: 0;
		opacity: 0.9;
	}

	/* Temple Affiliation */
	.temple-icon {
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		flex-shrink: 0;
	}

	.temple-name {
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.temple-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	/* Edit Mode */
	.edit-input {
		width: 100%;
		background: theme('colors.bg.deep');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		transition: all 0.2s ease;
	}

	.edit-input:focus {
		outline: none;
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.name-input {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
	}

	.bio-input {
		resize: vertical;
		min-height: 80px;
	}

	/* Buttons */
	.btn-primary,
	.btn-secondary {
		padding: var(--spacing-4) var(--spacing-2); /* 8px 18px φ-based */
		border-radius: var(--spacing-4); /* 8px φ-based */
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		cursor: pointer;
		transition: all 0.3s ease;
		border: none;
	}

	.btn-primary {
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
	}

	.btn-primary:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: theme('colors.bg.mid');
		color: theme('colors.gold.DEFAULT');
		border: 2px solid theme('colors.gold.border');
	}

	.btn-secondary:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
	}

	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-icon {
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		text-align: center;
		opacity: 0.8;
	}

	/* Activity Items */
	.activity-item {
		display: flex;
		align-items: start;
		gap: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4); /* 8px φ-based */
	}

	.activity-icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
		border-radius: 50%;
		flex-shrink: 0;
	}

	.activity-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.4;
	}

	.activity-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	/* Payment Methods */
	.payment-method {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4); /* 8px φ-based */
	}

	.payment-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		flex-shrink: 0;
	}

	.payment-type {
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		text-transform: capitalize;
	}

	.payment-details {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	.payment-badge {
		background: theme('colors.gold.bg');
		color: theme('colors.gold.DEFAULT');
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		border: 1px solid theme('colors.gold.border');
	}

	/* Settings Buttons */
	.settings-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.settings-button:hover {
		border-color: theme('colors.gold.DEFAULT');
		background: rgba(212, 175, 55, 0.05);
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
	}

	.settings-button.danger {
		border-color: rgba(255, 99, 71, 0.3);
	}

	.settings-button.danger:hover {
		border-color: rgba(255, 99, 71, 0.6);
		background: rgba(255, 99, 71, 0.05);
	}

	.settings-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.settings-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 500;
		flex: 1;
	}

	.settings-button.danger .settings-label {
		color: rgba(255, 99, 71, 1);
	}

	.settings-arrow {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	/* App Info */
	.app-version {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}

	.app-tagline {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-style: italic;
		opacity: 0.6;
	}
</style>
