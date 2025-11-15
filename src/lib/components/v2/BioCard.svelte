<script lang="ts">
	import type { User } from '$types';
	import FlippableAvatar from './FlippableAvatar.svelte';

	export let user: User;
	export let canEdit: boolean = false;

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
</script>

<div class="bio-card">
	<!-- Avatar Section -->
	<div class="avatar-section">
		<FlippableAvatar avatar={user.avatar} username={user.username} size="medium" />
		<div class="username">{user.name}</div>
		<div class="bio-tagline">{user.bio}</div>
		<div class="profile-url">syncengine.earth/{user.username}</div>
	</div>

	<!-- Stats Row -->
	<div class="stats-row">
		<div class="stat-box">
			<div class="stat-label">Tokens</div>
			<div class="stat-value">{user.stats.totalHoursEarned}h</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">Fulfilled</div>
			<div class="stat-value">{user.stats.fulfillmentsCompleted}</div>
		</div>
		<div class="stat-box">
			<div class="stat-label">Temple</div>
			<div class="stat-value temple-name">{user.temple.templeName.split(' ')[0]}</div>
		</div>
	</div>
</div>

<style>
	.bio-card {
		text-align: center;
	}

	.avatar-section {
		margin-bottom: var(--spacing-2);
	}

	.username {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0);
		font-weight: 700;
		margin: var(--spacing-3) 0 var(--spacing-4);
		text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
	}

	.bio-tagline {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		margin-bottom: var(--spacing-4);
		line-height: 1.4;
	}

	.profile-url {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.8;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-3);
		margin-top: var(--spacing-2);
	}

	.stat-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-3);
		padding: var(--spacing-3);
		text-align: center;
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
	}

	.stat-value.temple-name {
		font-size: var(--font-size-2);
	}
</style>
