<script lang="ts">
	import type { Achievement } from '$types';

	export let achievements: Achievement[];
	export let limit: number | null = null;

	$: displayedAchievements = limit ? achievements.slice(0, limit) : achievements;

	const rarityConfig = {
		common: { color: 'sage', glow: 'rgba(132, 169, 140, 0.4)' },
		rare: { color: 'cyan', glow: 'rgba(0, 255, 209, 0.4)' },
		legendary: { color: 'gold', glow: 'rgba(212, 175, 55, 0.6)' }
	};

	function getRarityClass(rarity: Achievement['rarity']): string {
		return rarityConfig[rarity].color;
	}
</script>

<div class="achievement-showcase">
	<div class="showcase-grid">
		{#each displayedAchievements as achievement, index}
			<div
				class="achievement-card {getRarityClass(achievement.rarity)}"
				style="animation-delay: {index * 0.1}s"
			>
				<div class="achievement-icon-wrapper">
					<span class="achievement-icon">{achievement.icon}</span>
					{#if achievement.rarity === 'legendary'}
						<div class="legendary-sparkle"></div>
					{/if}
				</div>
				<h3 class="achievement-title">{achievement.title}</h3>
				<p class="achievement-description">{achievement.description}</p>
				<div class="achievement-footer">
					<span class="achievement-date">
						{new Date(achievement.earnedDate).toLocaleDateString('en-US', {
							month: 'short',
							year: 'numeric'
						})}
					</span>
					<span class="achievement-rarity {achievement.rarity}">
						{achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
					</span>
				</div>
			</div>
		{/each}
	</div>

	{#if limit && achievements.length > limit}
		<div class="more-indicator">
			<span class="more-text">+ {achievements.length - limit} more achievements</span>
		</div>
	{/if}
</div>

<style>
	.achievement-showcase {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.showcase-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-3);
	}

	@media (max-width: 768px) {
		.showcase-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		}
	}

	.achievement-card {
		background: theme('colors.bg.mid');
		border: 2px solid;
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-4);
		text-align: center;
		transition: all 0.3s ease;
		animation: fadeInUp 0.6s ease-out backwards;
		position: relative;
		overflow: hidden;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.achievement-card.sage {
		border-color: rgba(132, 169, 140, 0.5);
	}

	.achievement-card.cyan {
		border-color: theme('colors.cyan.border');
	}

	.achievement-card.gold {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 20px theme('colors.gold.glow');
	}

	.achievement-card:hover {
		transform: translateY(-4px);
	}

	.achievement-card.sage:hover {
		border-color: theme('colors.sage.DEFAULT');
		box-shadow: 0 0 15px rgba(132, 169, 140, 0.4);
	}

	.achievement-card.cyan:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
	}

	.achievement-card.gold:hover {
		box-shadow: 0 0 30px theme('colors.gold.glow');
	}

	.achievement-icon-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		background: theme('colors.bg.deep');
		border-radius: 50%;
		border: 2px solid theme('colors.gold.border');
	}

	.achievement-card.gold .achievement-icon-wrapper {
		border-color: theme('colors.gold.DEFAULT');
		animation: pulse-glow var(--duration-0) ease-in-out infinite;
	}

	.achievement-icon {
		font-size: var(--font-size-0);
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.legendary-sparkle {
		position: absolute;
		inset: -10px;
		border-radius: 50%;
		background: conic-gradient(
			from 0deg,
			transparent 0%,
			theme('colors.gold.DEFAULT') 10%,
			transparent 20%,
			theme('colors.gold.DEFAULT') 30%,
			transparent 40%
		);
		opacity: 0.3;
		animation: rotate-sparkle 3s linear infinite;
		pointer-events: none;
	}

	@keyframes rotate-sparkle {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.achievement-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
	}

	.achievement-description {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3);
		line-height: 1.4;
		margin: 0;
		opacity: 0.9;
	}

	.achievement-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: auto;
		padding-top: var(--spacing-4);
		border-top: 1px solid theme('colors.gold.border');
	}

	.achievement-date {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		opacity: 0.8;
	}

	.achievement-rarity {
		font-size: var(--font-size-3);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
	}

	.achievement-rarity.common {
		color: theme('colors.sage.DEFAULT');
		background: rgba(132, 169, 140, 0.1);
	}

	.achievement-rarity.rare {
		color: theme('colors.cyan.DEFAULT');
		background: theme('colors.cyan.bg');
	}

	.achievement-rarity.legendary {
		color: theme('colors.gold.DEFAULT');
		background: theme('colors.gold.bg');
		text-shadow: 0 0 6px rgba(212, 175, 55, 0.6);
	}

	.more-indicator {
		text-align: center;
		padding: var(--spacing-3);
		background: theme('colors.bg.mid');
		border: 2px dashed theme('colors.gold.border');
		border-radius: var(--spacing-3);
	}

	.more-text {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
		opacity: 0.8;
	}
</style>
