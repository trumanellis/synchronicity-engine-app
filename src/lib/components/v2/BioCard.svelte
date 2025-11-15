<script lang="ts">
	import type { User } from '$types';
	import FlippableAvatar from './FlippableAvatar.svelte';

	export let user: User;
	export let canEdit: boolean = false;

	function handleEdit() {
		window.location.href = '/profile/edit';
	}

	function handleShare() {
		const url = `https://syncengine.earth/${user.username}`;
		if (navigator.share) {
			navigator.share({
				title: `${user.name}'s Profile`,
				text: user.bio,
				url: url
			});
		} else {
			navigator.clipboard.writeText(url);
			alert('Profile link copied to clipboard!');
		}
	}

	const memberSince = new Date(user.joinDate).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric'
	});
</script>

<div class="bio-card">
	<!-- Flippable Avatar -->
	<div class="avatar-section">
		<FlippableAvatar avatar={user.avatar} username={user.username} size="large" />
	</div>

	<!-- Name & Title -->
	<div class="identity-section">
		<h1 class="profile-name">{user.name}</h1>
		<div class="username">@{user.username}</div>
	</div>

	<!-- Bio -->
	<div class="bio-section">
		<p class="bio-text">{user.bio}</p>
	</div>

	<!-- Temple Affiliation -->
	<div class="temple-section">
		<div class="temple-badge">
			<span class="temple-icon">{user.temple.templeIcon}</span>
			<div class="temple-info">
				<div class="temple-name">{user.temple.templeName}</div>
				<div class="temple-role">{user.temple.role}</div>
			</div>
		</div>
		<div class="temple-location">
			<span class="location-icon">📍</span>
			<span class="location-text">{user.temple.location}</span>
		</div>
	</div>

	<!-- Stats Row -->
	<div class="stats-row">
		<div class="stat-item">
			<div class="stat-icon">💎</div>
			<div class="stat-value">{user.stats.tokensHeld}</div>
			<div class="stat-label">Tokens</div>
		</div>
		<div class="stat-item">
			<div class="stat-icon">⏱️</div>
			<div class="stat-value">{user.stats.totalHoursEarned}h</div>
			<div class="stat-label">Hours</div>
		</div>
		<div class="stat-item">
			<div class="stat-icon">🎯</div>
			<div class="stat-value">{user.stats.activeIntentions}</div>
			<div class="stat-label">Intentions</div>
		</div>
		<div class="stat-item">
			<div class="stat-icon">🤝</div>
			<div class="stat-value">{user.stats.connections}</div>
			<div class="stat-label">Connections</div>
		</div>
	</div>

	<!-- Member Since -->
	<div class="member-since">
		<span class="member-icon">🗓️</span>
		<span class="member-text">Member since {memberSince}</span>
	</div>

	<!-- Action Buttons -->
	<div class="action-buttons">
		{#if canEdit}
			<button class="btn-edit" on:click={handleEdit}>
				<span class="btn-icon">✏️</span>
				<span class="btn-label">Edit Profile</span>
			</button>
		{/if}
		<button class="btn-share" on:click={handleShare}>
			<span class="btn-icon">🔗</span>
			<span class="btn-label">Share Profile</span>
		</button>
	</div>
</div>

<style>
	.bio-card {
		background: linear-gradient(
			135deg,
			theme('colors.bg.mid') 0%,
			theme('colors.bg.front') 100%
		);
		border: 3px solid theme('colors.gold.DEFAULT');
		border-radius: var(--spacing-2);
		padding: var(--spacing-1);
		box-shadow: 0 0 40px theme('colors.gold.glow');
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2);
		position: relative;
		overflow: hidden;
	}

	/* Golden shimmer effect */
	.bio-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			45deg,
			transparent 40%,
			rgba(212, 175, 55, 0.1) 50%,
			transparent 60%
		);
		animation: shimmer 3s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes shimmer {
		0%,
		100% {
			transform: translate(-50%, -50%);
		}
		50% {
			transform: translate(50%, 50%);
		}
	}

	.avatar-section {
		margin-top: var(--spacing-2);
		z-index: 1;
	}

	.identity-section {
		text-align: center;
		z-index: 1;
	}

	.profile-name {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
		letter-spacing: 0.02em;
	}

	.username {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 500;
		margin-top: 0.25rem;
		opacity: 0.8;
	}

	.bio-section {
		text-align: center;
		max-width: 600px;
		padding: 0 var(--spacing-2);
		z-index: 1;
	}

	.bio-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		line-height: 1.6;
		margin: 0;
		font-style: italic;
		opacity: 0.95;
	}

	.temple-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		width: 100%;
		max-width: 500px;
		padding: var(--spacing-2);
		background: theme('colors.bg.deep');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3);
		z-index: 1;
	}

	.temple-badge {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
	}

	.temple-icon {
		font-size: var(--font-size-0);
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.temple-info {
		flex: 1;
	}

	.temple-name {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
	}

	.temple-role {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		margin-top: 0.25rem;
		opacity: 0.9;
	}

	.temple-location {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-top: var(--spacing-4);
		border-top: 1px solid theme('colors.gold.border');
	}

	.location-icon {
		font-size: var(--font-size-2);
	}

	.location-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.9;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-3);
		width: 100%;
		max-width: 600px;
		z-index: 1;
	}

	@media (max-width: 640px) {
		.stats-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: var(--spacing-3);
		background: theme('colors.bg.deep');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3);
		transition: all 0.3s ease;
	}

	.stat-item:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.stat-icon {
		font-size: var(--font-size-1);
		filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		opacity: 0.8;
	}

	.member-since {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--spacing-4) var(--spacing-2);
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4);
		z-index: 1;
	}

	.member-icon {
		font-size: var(--font-size-2);
	}

	.member-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 500;
		opacity: 0.9;
	}

	.action-buttons {
		display: flex;
		gap: var(--spacing-3);
		width: 100%;
		max-width: 400px;
		z-index: 1;
	}

	.btn-edit,
	.btn-share {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: var(--spacing-4) var(--spacing-2);
		border: none;
		border-radius: var(--spacing-4);
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: var(--font-size-2);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-edit {
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
	}

	.btn-edit:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.btn-share {
		background: theme('colors.bg.mid');
		color: theme('colors.gold.DEFAULT');
		border: 2px solid theme('colors.gold.border');
	}

	.btn-share:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.btn-icon {
		font-size: var(--font-size-1);
	}

	.btn-label {
		font-size: var(--font-size-2);
	}
</style>
