<script lang="ts">
	/**
	 * IntentionCard v1 - Rebuilt using layout primitives
	 * Uses Card, Stack, and Row for guaranteed responsive behavior
	 */
	import type { Intention } from '$types';
	import Card from '$lib/components/layout/Card.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';

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

<Card variant="default" padding="md" interactive={true} on:click={onClick} on:keypress={onClick} className="card-golden-ratio">
	<div class="card-content">
		<!-- Header: Icon + Content -->
		<Row gap="md" align="start">
			<div class="icon">{emoji}</div>
			<Stack gap="xs" className="flex-1">
				<h3 class="title">{intention.title}</h3>
				<p class="description">
					{intention.description.slice(0, 100)}...
				</p>
			</Stack>
		</Row>

		<!-- Stats Row -->
		<div class="stats-section">
			<div class="divider" />
			<Row gap="lg" justify="between">
				<Row gap="sm" align="center">
					<span class="stat-icon">⏱️</span>
					<span class="stat-value"
						>{intention.stats.totalAttentionHours.toLocaleString()}h</span
					>
				</Row>
				<Row gap="sm" align="center">
					<span class="stat-icon">👥</span>
					<span class="stat-value">{intention.stats.participantCount}</span>
				</Row>
				<Row gap="sm" align="center">
					<span class="stat-icon">🎯</span>
					<span class="stat-value">{intention.stats.impactLevel}</span>
				</Row>
			</Row>
		</div>
	</div>
</Card>

<style>
	/* Card content wrapper */
	.card-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: var(--spacing-3);
	}

	.stats-section {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	/* Icon */
	.icon {
		font-size: 1.75rem;
		line-height: 1;
		flex-shrink: 0;
	}

	/* Title */
	.title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.95rem;
		margin: 0;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	/* Description */
	.description {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.4;
		margin: 0;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	/* Divider */
	.divider {
		height: 1px;
		background: theme('colors.cyan.border');
		width: 100%;
	}

	/* Stats */
	.stat-icon {
		font-size: 0.875rem;
		line-height: 1;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.75rem;
	}

	/* Responsive text sizing - handled by base typography, not media queries */
	@media (max-width: 480px) {
		.icon {
			font-size: 1.5rem;
		}

		.title {
			font-size: 0.875rem;
		}

		.description {
			font-size: 0.75rem;
		}

		.stat-value {
			font-size: 0.7rem;
		}
	}
</style>
