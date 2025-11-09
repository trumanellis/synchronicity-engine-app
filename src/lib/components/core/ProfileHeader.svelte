<script lang="ts">
	import type { User } from '$types';

	export let user: User;
</script>

<div class="profile-header">
	<div class="profile-avatar">{user.avatar}</div>
	<div class="profile-info">
		<h1 class="profile-name">{user.name}</h1>
		<p class="profile-role">{user.temple.role} • {user.temple.templeName}</p>
		{#if user.bio}
			<p class="profile-bio">{user.bio}</p>
		{/if}
	</div>
</div>

<style>
	.profile-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 1.5rem 1rem;
		background: linear-gradient(180deg, rgba(0, 255, 209, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%);
		border: 2px solid theme('colors.cyan.border');
		border-radius: 1rem;
		margin-bottom: 1.5rem;
	}

	.profile-avatar {
		width: 80px;
		height: 80px;
		background: theme('colors.gold.bg');
		border: 3px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		margin-bottom: 1rem;
		box-shadow: 0 0 30px theme('colors.gold.glow');
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.profile-info {
		width: 100%;
	}

	.profile-name {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		text-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.profile-role {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.85rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.profile-bio {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.9rem;
		line-height: 1.6;
		max-width: 400px;
		margin: 0 auto;
	}
</style>
