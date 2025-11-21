<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import { currentUser, intentions, potentialAttention, getUpcomingItinerary } from '$lib/data/mockData';

	import ProfileCard from '$lib/components/v2/ProfileCard.svelte';
	import ItinerarySection from '$lib/components/v2/ItinerarySection.svelte';
	import ProfileGallery from '$lib/components/v2/ProfileGallery.svelte';
	import SubstackGallery from '$lib/components/v2/SubstackGallery.svelte';
	import VisibilitySelector from '$lib/components/v2/VisibilitySelector.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	onMount(() => {
		activeTab.set('profile');
	});

	// Internal view - show everything
	$: user = currentUser;
	$: isPublicView = false;

	// Get user's intentions (ones they have potential attention for)
	$: userIntentions = intentions.filter((i) => potentialAttention[i.intentionId] !== undefined);

	// Get upcoming itinerary items (all items for internal view)
	$: upcomingItinerary = getUpcomingItinerary();

	// Mock tags for bio
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];
</script>

<svelte:head>
	<title>My Profile - Synchronicity Engine</title>
</svelte:head>

<div class="profile-page">
	<Stack gap="md">
		<!-- Profile Card -->
		<Section spacing="md">
			<ProfileCard user={user} canEdit={true} tags={bioTags} />
		</Section>

		<!-- Contact Information Section -->
		<Section spacing="md">
			<div class="section-header">
				<div class="section-title">
					<span>📱</span>
					<span>Contact Information</span>
				</div>
			</div>
			<div class="compact-contact">
				<div class="contact-row">
					<input type="email" placeholder="📧 Email" value={user.contactInfo?.email || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.email || 'private'} compact={true} onChange={(v) => console.log('Email:', v)} />
				</div>
				<div class="contact-row">
					<input type="tel" placeholder="📞 Phone" value={user.contactInfo?.phone || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.phone || 'private'} compact={true} onChange={(v) => console.log('Phone:', v)} />
				</div>
				<div class="contact-row">
					<input type="tel" placeholder="💬 WhatsApp" value={user.contactInfo?.whatsapp || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.whatsapp || 'private'} compact={true} onChange={(v) => console.log('WhatsApp:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="✈️ Telegram" value={user.contactInfo?.telegram || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.telegram || 'private'} compact={true} onChange={(v) => console.log('Telegram:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="🎮 Discord" value={user.contactInfo?.discord || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.discord || 'private'} compact={true} onChange={(v) => console.log('Discord:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="📷 Instagram" value={user.contactInfo?.instagram || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.instagram || 'private'} compact={true} onChange={(v) => console.log('Instagram:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="👥 Facebook" value={user.contactInfo?.facebook || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.facebook || 'private'} compact={true} onChange={(v) => console.log('Facebook:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="𝕏 X" value={user.contactInfo?.twitter || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.twitter || 'private'} compact={true} onChange={(v) => console.log('X:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="💼 LinkedIn" value={user.contactInfo?.linkedin || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.linkedin || 'private'} compact={true} onChange={(v) => console.log('LinkedIn:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="📹 YouTube" value={user.contactInfo?.youtube || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.youtube || 'private'} compact={true} onChange={(v) => console.log('YouTube:', v)} />
				</div>
				<div class="contact-row">
					<input type="text" placeholder="🎵 TikTok" value={user.contactInfo?.tiktok || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.tiktok || 'private'} compact={true} onChange={(v) => console.log('TikTok:', v)} />
				</div>
				<div class="contact-row">
					<input type="url" placeholder="🌐 Website" value={user.contactInfo?.website || ''} class="compact-input" />
					<VisibilitySelector visibility={user.contactInfo?.visibility?.website || 'private'} compact={true} onChange={(v) => console.log('Website:', v)} />
				</div>
			</div>
		</Section>

		<!-- Itinerary Section -->
		{#if upcomingItinerary.length > 0}
			<Section spacing="md">
				<ItinerarySection items={upcomingItinerary} canEdit={true} />
			</Section>
		{/if}

		<!-- Tabbed Gallery: Intentions & Offerings -->
		<Section spacing="md">
			<ProfileGallery intentions={userIntentions} offerings={user.offerings} canEdit={true} />
		</Section>

		<!-- Substack Articles Gallery -->
		{#if user.substackUrl}
			<Section spacing="md">
				<SubstackGallery substackUrl={user.substackUrl} canEdit={true} />
			</Section>
		{/if}

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

	/* Compact Contact Info */
	.compact-contact {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.contact-row {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.compact-input {
		flex: 1;
		background: rgba(0, 0, 0, 0.25);
		border: 1px solid rgba(135, 169, 107, 0.3);
		border-radius: 4px;
		padding: 3px 6px;
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.7rem;
		line-height: 1.2;
		transition: all 0.2s ease;
		min-height: 22px;
	}

	.compact-input:focus {
		outline: none;
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
		box-shadow: 0 0 6px rgba(0, 255, 209, 0.2);
	}

	.compact-input::placeholder {
		color: theme('colors.sage.DEFAULT');
		opacity: 0.6;
		font-size: 0.7rem;
	}
</style>
