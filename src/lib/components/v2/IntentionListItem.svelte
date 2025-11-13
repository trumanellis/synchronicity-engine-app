<script lang="ts">
	import type { Intention } from '$types';

	export let intention: Intention;
	export let potentialHours: number = 0;
	export let showPotential: boolean = false;
	export let isRecommended: boolean = false;
	export let recommendationReason: string = '';
	export let onClick: (() => void) | undefined = undefined;

	function getCategoryEmoji(category: string): string {
		const map: Record<string, string> = {
			'Organic Food & Nutrition': '🌱',
			'Land Stewardship': '🌳',
			'Off-Grid & Sustainable Living': '☀️',
			'Health & Vitality': '💪',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '🧘',
			'Creative Expression': '🎨'
		};
		return map[category] || '✨';
	}
</script>

<button class="intention-item" on:click={onClick}>
	<div class="item-header">
		<span class="emoji">{getCategoryEmoji(intention.category)}</span>
		<div class="item-content">
			<h3 class="item-title">{intention.title}</h3>
			{#if showPotential && potentialHours > 0}
				<div class="potential-badge">⚡ {potentialHours}h potential</div>
			{/if}
			{#if isRecommended}
				<div class="recommended-badge">
					{#if recommendationReason.includes('NEW')}
						<span class="badge new">NEW</span>
					{:else if recommendationReason.includes('TRENDING')}
						<span class="badge trending">🔥 TRENDING</span>
					{/if}
					{#if recommendationReason && !recommendationReason.includes('NEW') && !recommendationReason.includes('TRENDING')}
						<span class="reason">{recommendationReason}</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="item-stats">
		<span class="stat">{intention.stats.totalAttentionHours.toLocaleString()}h total</span>
		<span class="divider">•</span>
		<span class="stat">{intention.stats.participantCount} participants</span>
	</div>
</button>

<style>
	.intention-item {
		width: 100%;
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.02), rgba(0, 0, 0, 0.3));
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: 16px;
		padding: var(--spacing-3); /* 12px φ-based */
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
	}

	.intention-item:hover {
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.05), rgba(0, 0, 0, 0.4));
		border-color: rgba(0, 255, 209, 0.4);
		transform: translateX(4px);
		box-shadow: 0 4px 20px rgba(0, 255, 209, 0.2);
	}

	.item-header {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3);
	}

	.emoji {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.item-content {
		flex: 1;
		min-width: 0;
	}

	.item-title {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		color: theme('colors.cyan.DEFAULT');
		margin: 0 0 var(--spacing-4) 0; /* 8px bottom margin φ-based */
		line-height: 1.3;
	}

	.potential-badge {
		display: inline-block;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
		border: 1px solid rgba(212, 175, 55, 0.4);
		border-radius: 12px;
		padding: 4px var(--spacing-3); /* 4px vertical, 12px horizontal φ-based */
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 700;
		color: theme('colors.gold.DEFAULT');
		letter-spacing: 0.3px;
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
		animation: pulse-gold var(--duration-1) ease-in-out infinite; /* 1.85s φ-based */
	}

	@keyframes pulse-gold {
		0%,
		100% {
			box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
		}
		50% {
			box-shadow: 0 0 25px rgba(212, 175, 55, 0.5);
		}
	}

	.recommended-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge {
		display: inline-block;
		border-radius: 10px;
		padding: 4px var(--spacing-4); /* 4px vertical, 8px horizontal φ-based */
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	.badge.new {
		background: linear-gradient(135deg, #00ffd1, #00d4aa);
		color: #0a0e0f;
		text-shadow: none;
		box-shadow: 0 0 15px rgba(0, 255, 209, 0.6);
	}

	.badge.trending {
		background: linear-gradient(135deg, #d4af37, #f4d03f);
		color: #0a0e0f;
		text-shadow: none;
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
	}

	.reason {
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		color: theme('colors.sage.DEFAULT');
		font-style: italic;
	}

	.item-stats {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.stat {
		color: theme('colors.cream.DEFAULT');
		opacity: 0.7;
	}

	.divider {
		color: theme('colors.sage.DEFAULT');
		opacity: 0.3;
	}
</style>
