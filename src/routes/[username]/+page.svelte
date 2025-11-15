<script lang="ts">
	import type { PageData } from './$types';
	import BioCard from '$lib/components/v2/BioCard.svelte';
	import OfferingCard from '$lib/components/v2/OfferingCard.svelte';
	import PublicIntentionsList from '$lib/components/v2/PublicIntentionsList.svelte';

	export let data: PageData;

	$: ({ user, visibleSections, userIntentions, canEdit } = data);

	// Mock tags for bio - in real app these would come from user data
	const bioTags = ['#permaculture', '#community', '#design', '#sacred-economics'];
</script>

<svelte:head>
	<title>{user.name} - Synchronicity Engine</title>
	<meta name="description" content={user.bio} />
</svelte:head>

<div class="public-profile-page">
	<div class="profile-container">
		<!-- Status Bar -->
		<div class="status-bar">
			<span>⚡ syncengine.earth/{user.username}</span>
			<span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
		</div>

		<!-- Bio Card - Avatar and Stats -->
		{#if visibleSections.bio}
			<BioCard {user} {canEdit} />
		{/if}

		<!-- About Section with Bio and Tags -->
		{#if visibleSections.bio}
			<div class="section-header">
				<div class="section-title">
					<span>📖</span>
					<span>About</span>
				</div>
				<div class="visibility-badge">PUBLIC</div>
			</div>
			<div class="bio-box">
				<div class="bio-text">{user.bio}</div>
				<div class="tags-container">
					{#each bioTags as tag}
						<div class="tag">{tag}</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Active Intentions -->
		{#if visibleSections.intentions && userIntentions.length > 0}
			<div class="section-header">
				<div class="section-title">
					<span>🎯</span>
					<span>Active Intentions</span>
				</div>
				<div class="visibility-badge">MEMBERS</div>
			</div>
			<PublicIntentionsList intentions={userIntentions} />
		{/if}

		<!-- Offerings -->
		{#if visibleSections.offerings && user.offerings.length > 0}
			<div class="section-header">
				<div class="section-title">
					<span>🎁</span>
					<span>Offerings</span>
				</div>
				<div class="visibility-badge">PUBLIC</div>
			</div>
			<div class="offerings-list">
				{#each user.offerings as offering}
					<OfferingCard {offering} compact={true} />
				{/each}
			</div>
		{/if}

		<!-- Connect Button -->
		<button class="button-primary">Connect with {user.name.split(' ')[0]}</button>
	</div>
</div>

<style>
	.public-profile-page {
		min-height: 100vh;
		background: theme('colors.bg.deep');
		padding: 1rem;
	}

	.profile-container {
		max-width: 600px;
		margin: 0 auto;
		background: theme('colors.bg.front');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 1.5rem;
		padding: 1.5rem;
		box-shadow: 0 0 40px rgba(0, 255, 209, 0.3);
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(0, 255, 209, 0.2);
		font-size: 0.75rem;
		color: theme('colors.sage.DEFAULT');
	}

	.section-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.section-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.visibility-badge {
		background: rgba(132, 169, 140, 0.2);
		border: 1px solid theme('colors.sage.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.65rem;
		color: theme('colors.sage.DEFAULT');
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.bio-box {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: 1rem;
		padding: 1rem;
		margin-bottom: 1.5rem;
	}

	.bio-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.6;
		font-size: 0.95rem;
		margin-bottom: 1rem;
	}

	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: rgba(0, 255, 209, 0.15);
		border: 1px solid rgba(0, 255, 209, 0.4);
		border-radius: 0.5rem;
		padding: 0.35rem 0.75rem;
		font-size: 0.8rem;
		color: theme('colors.cyan.DEFAULT');
	}

	.offerings-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.button-primary {
		background: rgba(0, 255, 209, 0.9);
		color: theme('colors.bg.deep');
		border: none;
		border-radius: 0.75rem;
		padding: 0.85rem 1.5rem;
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.4);
		width: 100%;
	}

	.button-primary:hover {
		background: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 30px rgba(0, 255, 209, 0.6);
		transform: translateY(-2px);
	}
</style>
