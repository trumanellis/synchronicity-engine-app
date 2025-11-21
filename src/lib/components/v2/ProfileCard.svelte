<script lang="ts">
	import type { User } from '$types';
	import BioCard from './BioCard.svelte';
	import VisibilitySelector from './VisibilitySelector.svelte';

	export let user: User;
	export let canEdit: boolean = false;
	export let tags: string[] = [];

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
	<!-- Two Column Layout: 38.2% / 61.8% (Golden Ratio) -->
	<div class="profile-header">
		<!-- Left: Avatar at full width (38.2%) -->
		<div class="avatar-column">
			<BioCard avatar={user.avatar} username={user.username} name={user.name} size="large" />

			<!-- Achievement Badges -->
			<div class="badges-section">
				<div class="badge founding-member">
					<div class="badge-icon">🌟</div>
					<div class="badge-label">Founding Member</div>
				</div>
				<div class="badge temple-steward">
					<div class="badge-icon">🏛️</div>
					<div class="badge-label">Temple Steward</div>
				</div>
				<div class="badge initiated">
					<div class="badge-icon">✨</div>
					<div class="badge-label">Initiated</div>
				</div>
			</div>
		</div>

		<!-- Right: Name, Bio, Profile Link, About, Stats (61.8%) -->
		<div class="info-column">
			<div class="username">{user.name}</div>
			<div class="bio-tagline">{user.bio}</div>
			<a href="/{user.username}" class="profile-url">syncengine.earth/{user.username}</a>

			<!-- About Section -->
			{#if tags.length > 0}
				<div class="about-section">
					<div class="tags-container">
						{#each tags as tag}
							<div class="tag">{tag}</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Stats List -->
			<div class="stats-list">
				<div class="stat-item">Tokens of Gratitude: <span class="stat-value">{user.stats.totalHoursEarned}h</span></div>
				<div class="stat-item">Intentions Fulfilled: <span class="stat-value">{user.stats.fulfillmentsCompleted}</span></div>
				<div class="stat-item">Temple: <span class="stat-value">{user.temple.templeName}</span></div>
			</div>
		</div>
	</div>
</div>

<style>
	.bio-card {
		/* Layout container */
	}

	/* Two Column Layout with Golden Ratio */
	.profile-header {
		display: grid;
		grid-template-columns: 38.2% 61.8%;
		gap: var(--spacing-2);
		align-items: flex-start;
		margin-bottom: var(--spacing-2);
	}

	.avatar-column {
		width: 100%;
	}

	/* Make avatar full width with golden ratio (height > width) */
	.avatar-column :global(.bio-card-container) {
		width: 100% !important;
		height: 0 !important;
		padding-bottom: 161.8%;
		position: relative;
	}

	.avatar-column :global(.bio-card-container) :global(.flip-card) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.avatar-column :global(.bio-card-container) :global(.tap-hint) {
		bottom: -24px;
	}

	.info-column {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: left;
		justify-content: flex-start;
		padding-top: 0;
	}

	.username {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0);
		font-weight: 700;
		text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
		line-height: 1.2;
	}

	.bio-tagline {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		line-height: 1.4;
		opacity: 0.9;
	}

	.profile-url {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.8;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-block;
	}

	.profile-url:hover {
		opacity: 1;
		text-shadow: 0 0 10px rgba(0, 255, 209, 0.5);
		transform: translateX(2px);
	}

	.about-section {
		margin-top: var(--spacing-3);
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

	.stats-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--spacing-4);
		margin-top: var(--spacing-3);
	}

	.stat-item {
		display: inline-flex;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-4);
		padding: 6px var(--spacing-3);
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		line-height: 1.4;
		width: fit-content;
		transition: all 0.2s ease;
	}

	.stat-item:hover {
		border-color: rgba(0, 255, 209, 0.5);
		background: rgba(0, 0, 0, 0.5);
		box-shadow: 0 0 8px rgba(0, 255, 209, 0.2);
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		margin-left: 4px;
	}

	/* Achievement Badges */
	.badges-section {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
		margin-top: var(--spacing-0);
		justify-content: center;
	}

	.badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		width: 60px;
		height: 60px;
		padding: var(--spacing-4);
		border-radius: 50%;
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
	}

	.badge::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		padding: 2px;
		background: linear-gradient(135deg, var(--badge-color-1), var(--badge-color-2));
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0.6;
	}

	.badge:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow: 0 4px 20px var(--badge-glow);
	}

	.badge:hover::before {
		opacity: 1;
	}

	/* Badge color schemes - aligned with app theme */
	.badge.founding-member {
		--badge-color-1: #D4AF37;
		--badge-color-2: #C9A961;
		--badge-glow: rgba(212, 175, 55, 0.3);
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(201, 169, 97, 0.08));
	}

	.badge.temple-steward {
		--badge-color-1: #8B7355;
		--badge-color-2: #A89076;
		--badge-glow: rgba(139, 115, 85, 0.3);
		background: linear-gradient(135deg, rgba(139, 115, 85, 0.12), rgba(168, 144, 118, 0.08));
	}

	.badge.initiated {
		--badge-color-1: #00FFD1;
		--badge-color-2: #7FC8BD;
		--badge-glow: rgba(0, 255, 209, 0.25);
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(127, 200, 189, 0.08));
	}

	.badge-icon {
		font-size: 1.5rem;
		line-height: 1;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.badge-label {
		font-size: 0.5rem;
		font-weight: 600;
		text-align: center;
		color: theme('colors.cream.DEFAULT');
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		line-height: 1;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
