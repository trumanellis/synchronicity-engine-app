<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser, intentions, potentialAttention, getAllUserAttentionLogs } from '$lib/data/mockData';

	function formatTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	import BioCard from '$lib/components/v2/BioCard.svelte';
	import ProfileGallery from '$lib/components/v2/ProfileGallery.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	onMount(() => {
		activeTab.set('profile');
	});

	// Get user's intentions (ones they have potential attention for)
	$: userIntentions = intentions.filter((i) => potentialAttention[i.intentionId] !== undefined);

	// Mock tags for bio
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];

	// Get all user attention logs
	$: allUserLogs = getAllUserAttentionLogs();
</script>

<svelte:head>
	<title>My Profile - Synchronicity Engine</title>
</svelte:head>

<div class="profile-page">
	<Stack gap="md">
		<!-- Bio Card -->
		<Section spacing="md">
			<BioCard user={currentUser} canEdit={true} />
		</Section>

		<!-- About Section with Bio and Tags -->
		<Section spacing="md">
			<Stack gap="sm">
				<div class="section-header">
					<div class="section-title">
						<span>📖</span>
						<span>About</span>
					</div>
					<button class="edit-button">Edit</button>
				</div>
				<div class="bio-box">
					<Stack gap="sm">
						<div class="bio-text">{currentUser.bio}</div>
						<div class="tags-container">
							{#each bioTags as tag}
								<div class="tag">{tag}</div>
							{/each}
						</div>
					</Stack>
				</div>
			</Stack>
		</Section>

		<!-- Tabbed Gallery: Intentions & Offerings -->
		<Section spacing="md">
			<ProfileGallery intentions={userIntentions} offerings={currentUser.offerings} canEdit={true} />
		</Section>

		<!-- Attention Logs Section -->
		<Section spacing="md">
			<Stack gap="sm">
				<div class="section-header">
					<div class="section-title">
						<span>⚡</span>
						<span>Community Attention Logs</span>
					</div>
				</div>
				<div class="logs-container">
					{#each allUserLogs as userLog}
						<div class="user-log-card">
							<div class="user-log-header">
								<span class="user-avatar">{userLog.userAvatar}</span>
								<span class="user-name">{userLog.userName}</span>
								<span class="event-count">{userLog.events.length} events</span>
							</div>
							<div class="events-list">
								{#each userLog.events as event}
									<div class="event-item">
										<div class="event-time">{formatTimestamp(event.timestamp)}</div>
										<div class="event-intention">{event.intentionTitle}</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</Stack>
		</Section>

		<!-- Settings Section -->
		<Section spacing="md">
			<Stack gap="sm">
				<div class="section-header">
					<div class="section-title">
						<span>⚙️</span>
						<span>Settings</span>
					</div>
				</div>
				<Stack gap="sm">
					<button class="settings-button" on:click={() => alert('Privacy settings')}>
						<span class="settings-icon">🔒</span>
						<span class="settings-label">Privacy & Visibility</span>
						<span class="settings-arrow">›</span>
					</button>
					<button class="settings-button" on:click={() => alert('Payment methods')}>
						<span class="settings-icon">💳</span>
						<span class="settings-label">Payment Methods</span>
						<span class="settings-arrow">›</span>
					</button>
					<button class="settings-button" on:click={() => alert('Notifications')}>
						<span class="settings-icon">🔔</span>
						<span class="settings-label">Notifications</span>
						<span class="settings-arrow">›</span>
					</button>
					<button class="settings-button danger" on:click={() => alert('Logout')}>
						<span class="settings-icon">🚪</span>
						<span class="settings-label">Logout</span>
						<span class="settings-arrow">›</span>
					</button>
				</Stack>
			</Stack>
		</Section>
	</Stack>
</div>

<style>
	.profile-page {
		/* Layout provided by Stack and Section primitives */
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-4);
	}

	.section-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.edit-button {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-4);
		padding: 0.35rem 0.75rem;
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.edit-button:hover {
		background: rgba(0, 255, 209, 0.2);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.3);
	}

	.bio-box {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
	}

	.bio-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.6;
		font-size: var(--font-size-2);
	}

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
	}

	.tag {
		background: rgba(0, 255, 209, 0.15);
		border: 1px solid rgba(0, 255, 209, 0.4);
		border-radius: var(--spacing-4);
		padding: 0.35rem 0.75rem;
		font-size: var(--font-size-3);
		color: theme('colors.cyan.DEFAULT');
	}

	/* Settings Buttons */
	.settings-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4);
		padding: var(--spacing-3);
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
		font-size: var(--font-size-1);
		flex-shrink: 0;
	}

	.settings-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 500;
		flex: 1;
	}

	.settings-button.danger .settings-label {
		color: rgba(255, 99, 71, 1);
	}

	.settings-arrow {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1);
		flex-shrink: 0;
	}

	/* Attention Logs Section */
	.logs-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.user-log-card {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
		transition: all 0.2s ease;
	}

	.user-log-card:hover {
		border-color: rgba(0, 255, 209, 0.4);
		background: rgba(0, 0, 0, 0.4);
	}

	.user-log-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		margin-bottom: var(--spacing-3);
		padding-bottom: var(--spacing-3);
		border-bottom: 1px solid rgba(0, 255, 209, 0.1);
	}

	.user-avatar {
		font-size: var(--font-size-1);
		flex-shrink: 0;
	}

	.user-name {
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 600;
		flex: 1;
	}

	.event-count {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 600;
		background: rgba(212, 175, 55, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: var(--spacing-4);
		padding: 0.25rem 0.5rem;
	}

	.events-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.event-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4) 0;
		border-left: 2px solid rgba(0, 255, 209, 0.3);
		padding-left: var(--spacing-3);
	}

	.event-time {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		min-width: 140px;
		flex-shrink: 0;
	}

	.event-intention {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		line-height: 1.4;
		flex: 1;
	}
</style>
