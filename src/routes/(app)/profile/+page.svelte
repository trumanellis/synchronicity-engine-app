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

		<!-- Contact Information Section -->
		<Section spacing="md">
			<Stack gap="sm">
				<div class="section-header">
					<div class="section-title">
						<span>📱</span>
						<span>Contact Information</span>
					</div>
				</div>
				<div class="contact-grid">
					<!-- Email -->
					<div class="contact-field">
						<label for="email" class="contact-label">
							<span class="contact-icon">📧</span>
							<span>Email</span>
						</label>
						<div class="contact-input-row">
							<input
								id="email"
								type="email"
								class="contact-input"
								placeholder="your.email@example.com"
								value={user.contactInfo?.email || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.email || 'private'}
								compact={true}
								onChange={(v) => console.log('Email visibility:', v)}
							/>
						</div>
					</div>

					<!-- Phone -->
					<div class="contact-field">
						<label for="phone" class="contact-label">
							<span class="contact-icon">📞</span>
							<span>Phone</span>
						</label>
						<div class="contact-input-row">
							<input
								id="phone"
								type="tel"
								class="contact-input"
								placeholder="+1 (555) 123-4567"
								value={user.contactInfo?.phone || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.phone || 'private'}
								compact={true}
								onChange={(v) => console.log('Phone visibility:', v)}
							/>
						</div>
					</div>

					<!-- WhatsApp -->
					<div class="contact-field">
						<label for="whatsapp" class="contact-label">
							<span class="contact-icon">💬</span>
							<span>WhatsApp</span>
						</label>
						<div class="contact-input-row">
							<input
								id="whatsapp"
								type="tel"
								class="contact-input"
								placeholder="+1 (555) 123-4567"
								value={user.contactInfo?.whatsapp || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.whatsapp || 'private'}
								compact={true}
								onChange={(v) => console.log('WhatsApp visibility:', v)}
							/>
						</div>
					</div>

					<!-- Telegram -->
					<div class="contact-field">
						<label for="telegram" class="contact-label">
							<span class="contact-icon">✈️</span>
							<span>Telegram</span>
						</label>
						<div class="contact-input-row">
							<input
								id="telegram"
								type="text"
								class="contact-input"
								placeholder="@username"
								value={user.contactInfo?.telegram || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.telegram || 'private'}
								compact={true}
								onChange={(v) => console.log('Telegram visibility:', v)}
							/>
						</div>
					</div>

					<!-- Discord -->
					<div class="contact-field">
						<label for="discord" class="contact-label">
							<span class="contact-icon">🎮</span>
							<span>Discord</span>
						</label>
						<div class="contact-input-row">
							<input
								id="discord"
								type="text"
								class="contact-input"
								placeholder="username#1234"
								value={user.contactInfo?.discord || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.discord || 'private'}
								compact={true}
								onChange={(v) => console.log('Discord visibility:', v)}
							/>
						</div>
					</div>

					<!-- Instagram -->
					<div class="contact-field">
						<label for="instagram" class="contact-label">
							<span class="contact-icon">📷</span>
							<span>Instagram</span>
						</label>
						<div class="contact-input-row">
							<input
								id="instagram"
								type="text"
								class="contact-input"
								placeholder="@username"
								value={user.contactInfo?.instagram || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.instagram || 'private'}
								compact={true}
								onChange={(v) => console.log('Instagram visibility:', v)}
							/>
						</div>
					</div>

					<!-- Facebook -->
					<div class="contact-field">
						<label for="facebook" class="contact-label">
							<span class="contact-icon">👥</span>
							<span>Facebook</span>
						</label>
						<div class="contact-input-row">
							<input
								id="facebook"
								type="text"
								class="contact-input"
								placeholder="facebook.com/username"
								value={user.contactInfo?.facebook || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.facebook || 'private'}
								compact={true}
								onChange={(v) => console.log('Facebook visibility:', v)}
							/>
						</div>
					</div>

					<!-- X (Twitter) -->
					<div class="contact-field">
						<label for="twitter" class="contact-label">
							<span class="contact-icon">𝕏</span>
							<span>X (Twitter)</span>
						</label>
						<div class="contact-input-row">
							<input
								id="twitter"
								type="text"
								class="contact-input"
								placeholder="@username"
								value={user.contactInfo?.twitter || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.twitter || 'private'}
								compact={true}
								onChange={(v) => console.log('Twitter visibility:', v)}
							/>
						</div>
					</div>

					<!-- LinkedIn -->
					<div class="contact-field">
						<label for="linkedin" class="contact-label">
							<span class="contact-icon">💼</span>
							<span>LinkedIn</span>
						</label>
						<div class="contact-input-row">
							<input
								id="linkedin"
								type="text"
								class="contact-input"
								placeholder="linkedin.com/in/username"
								value={user.contactInfo?.linkedin || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.linkedin || 'private'}
								compact={true}
								onChange={(v) => console.log('LinkedIn visibility:', v)}
							/>
						</div>
					</div>

					<!-- YouTube -->
					<div class="contact-field">
						<label for="youtube" class="contact-label">
							<span class="contact-icon">📹</span>
							<span>YouTube</span>
						</label>
						<div class="contact-input-row">
							<input
								id="youtube"
								type="text"
								class="contact-input"
								placeholder="youtube.com/@username"
								value={user.contactInfo?.youtube || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.youtube || 'private'}
								compact={true}
								onChange={(v) => console.log('YouTube visibility:', v)}
							/>
						</div>
					</div>

					<!-- TikTok -->
					<div class="contact-field">
						<label for="tiktok" class="contact-label">
							<span class="contact-icon">🎵</span>
							<span>TikTok</span>
						</label>
						<div class="contact-input-row">
							<input
								id="tiktok"
								type="text"
								class="contact-input"
								placeholder="@username"
								value={user.contactInfo?.tiktok || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.tiktok || 'private'}
								compact={true}
								onChange={(v) => console.log('TikTok visibility:', v)}
							/>
						</div>
					</div>

					<!-- Website -->
					<div class="contact-field">
						<label for="website" class="contact-label">
							<span class="contact-icon">🌐</span>
							<span>Website</span>
						</label>
						<div class="contact-input-row">
							<input
								id="website"
								type="url"
								class="contact-input"
								placeholder="https://yourwebsite.com"
								value={user.contactInfo?.website || ''}
							/>
							<VisibilitySelector
								visibility={user.contactInfo?.visibility?.website || 'private'}
								compact={true}
								onChange={(v) => console.log('Website visibility:', v)}
							/>
						</div>
					</div>
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

	/* Contact Information Section */
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-3);
	}

	.contact-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.contact-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3);
		font-weight: 500;
	}

	.contact-icon {
		font-size: var(--font-size-2);
	}

	.contact-input-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.contact-input {
		flex: 1;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.sage.DEFAULT');
		border-radius: var(--spacing-4);
		padding: var(--spacing-4) var(--spacing-3);
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3);
		transition: all 0.2s ease;
	}

	.contact-input:focus {
		outline: none;
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.contact-input::placeholder {
		color: theme('colors.sage.DEFAULT');
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
