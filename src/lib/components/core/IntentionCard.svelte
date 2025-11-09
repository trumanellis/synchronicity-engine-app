<script lang="ts">
	import type { Intention } from '$types';

	export let intention: Intention;
	export let onClick: (() => void) | undefined = undefined;

	// Get emoji based on category
	function getCategoryEmoji(category: string): string {
		const emojiMap: Record<string, string> = {
			'Organic Food & Nutrition': '🌱',
			'Land Stewardship': '🌳',
			'Off-Grid & Sustainable Living': '☀️',
			'Health & Vitality': '💪',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '🧘',
			'Creative Expression': '🎨'
		};
		return emojiMap[category] || '🎯';
	}

	$: emoji = getCategoryEmoji(intention.category);
</script>

<div
	class="intention-card"
	role="button"
	tabindex="0"
	on:click={onClick}
	on:keypress={onClick}
>
	<div class="intention-card-header">
		<div class="intention-card-icon">{emoji}</div>
		<div class="intention-card-content">
			<div class="intention-card-title">{intention.title}</div>
			<div class="intention-card-desc">
				{intention.description.length > 80 ? intention.description.slice(0, 80) + '...' : intention.description}
			</div>
		</div>
	</div>
	<div class="intention-card-stats">
		<div class="intention-stat">
			<span>⏱️</span>
			<span class="intention-stat-value">{intention.stats.totalAttentionHours.toLocaleString()}h</span>
		</div>
		<div class="intention-stat">
			<span>👥</span>
			<span class="intention-stat-value">{intention.stats.participantCount}</span>
		</div>
		<div class="intention-stat">
			<span>🎯</span>
			<span class="intention-stat-value">{intention.stats.impactLevel}</span>
		</div>
	</div>
</div>

<style>
	.intention-card {
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
	}

	.intention-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: theme('boxShadow.glow-cyan');
		transform: translateY(-2px);
	}

	.intention-card-header {
		display: flex;
		align-items: start;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.intention-card-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.intention-card-content {
		flex: 1;
	}

	.intention-card-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.intention-card-desc {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.4;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.intention-card-stats {
		display: flex;
		gap: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid theme('colors.cyan.border');
	}

	.intention-stat {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.intention-stat-value {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
	}

	@media (max-width: 480px) {
		.intention-card {
			padding: 0.875rem;
		}

		.intention-card-icon {
			font-size: 1.5rem;
		}

		.intention-card-title {
			font-size: 0.875rem;
		}

		.intention-card-desc {
			font-size: 0.75rem;
		}

		.intention-stat {
			font-size: 0.7rem;
		}
	}

	@media (max-width: 360px) {
		.intention-card {
			padding: 0.75rem;
		}

		.intention-card-header {
			gap: 0.5rem;
		}

		.intention-card-icon {
			font-size: 1.25rem;
		}

		.intention-card-title {
			font-size: 0.8rem;
		}

		.intention-card-desc {
			font-size: 0.7rem;
		}

		.intention-card-stats {
			gap: 0.75rem;
		}

		.intention-stat {
			font-size: 0.65rem;
		}
	}
</style>
