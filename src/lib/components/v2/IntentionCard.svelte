<script lang="ts">
	import type { Intention, VisibilityLevel } from '$types';
	import FlipCard from './FlipCard.svelte';
	import VisibilitySelector from './VisibilitySelector.svelte';
	import AttentionSpiral from './AttentionSpiral.svelte';

	export let intention: Intention;
	export let size: 'small' | 'medium' | 'large' = 'large';
	export let canEdit: boolean = false;
	export let onClick: (() => void) | undefined = undefined;
	export let onVisibilityChange: ((newVisibility: VisibilityLevel) => void) | undefined = undefined;

	$: imageUrl = intention.media && intention.media.length > 0 ? intention.media[0] : null;
	$: categoryIcon = getCategoryIcon(intention.category);

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			'Off-Grid & Sustainable Living': '🌱',
			'Health & Vitality': '💪',
			'Organic Food & Nutrition': '🥗',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '✨',
			'Land Stewardship': '🌳',
			'Creative Expression': '🎨'
		};
		return icons[category] || '🎯';
	}

	function handleNavigate() {
		if (onClick) {
			onClick();
		}
	}
</script>

<div>
	<FlipCard {size} tapHintText="Tap for details" ariaLabelFront="View intention details" ariaLabelBack="Show intention preview">
		<div slot="front" class="intention-front">
			{#if imageUrl}
				<img src={imageUrl} alt={intention.title} class="intention-image" />
			{:else}
				<div class="intention-placeholder">
					<span class="placeholder-icon">{categoryIcon}</span>
				</div>
			{/if}

			<div class="front-overlay">
				<div class="category-badge">{intention.category}</div>
				<div class="front-title">{intention.title}</div>
				<div class="front-stats">
					<div class="stat-chip">
						<span class="stat-icon">⏱️</span>
						<span class="stat-value">{intention.stats.totalAttentionHours}h</span>
						<span class="stat-label">gratitude</span>
					</div>
					<div class="stat-chip">
						<span class="stat-icon">👥</span>
						<span class="stat-value">{intention.stats.participantCount}</span>
						<span class="stat-label">contributors</span>
					</div>
					<div class="stat-chip">
						<span class="stat-icon">✨</span>
						<span class="stat-value">{intention.stats.percentManifested}%</span>
						<span class="stat-label">manifested</span>
					</div>
				</div>
			</div>
		</div>

		<div slot="back" let:isExpanded class="intention-back">
			{#if intention.attentionSummary}
				<div class="spiral-wrapper">
					<AttentionSpiral attentionSummary={intention.attentionSummary} />
				</div>
			{:else if imageUrl}
				<div class="back-image" style="background-image: url({imageUrl})"></div>
			{/if}
			<div class="back-content" class:expanded={isExpanded}>
				<div class="back-header">
					<h3 class="back-title">{intention.title}</h3>
					{#if canEdit && intention.visibility !== undefined && onVisibilityChange}
						<VisibilitySelector
							visibility={intention.visibility}
							onChange={onVisibilityChange}
							compact={true}
						/>
					{/if}
				</div>

				<p class="back-description">{intention.description}</p>

				<div class="back-details">
					<div class="detail-row">
						<span class="detail-icon">📍</span>
						<span class="detail-text">{intention.location.name}</span>
					</div>
					<div class="detail-row">
						<span class="detail-icon">🏷️</span>
						<span class="detail-text">{intention.category}</span>
					</div>
					<div class="detail-row">
						<span class="detail-icon">📊</span>
						<span class="detail-text">{intention.stats.participantCount} participants • {intention.stats.totalAttentionHours}h • {intention.stats.activeDays} days</span>
					</div>
					<div class="detail-row">
						<span class="detail-icon">📅</span>
						<span class="detail-text">{new Date(intention.createdAt).toLocaleDateString()}</span>
					</div>
				</div>

				<button class="action-button" on:click|stopPropagation={handleNavigate}>
					{canEdit ? 'Edit Intention' : 'View Details'} →
				</button>
			</div>
		</div>
	</FlipCard>
</div>

<style>
	.intention-front {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
	}

	.intention-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.intention-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(107, 207, 126, 0.2), rgba(0, 0, 0, 0.4));
	}

	.placeholder-icon {
		font-size: 5rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
		opacity: 0.5;
	}

	.front-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
		padding: var(--spacing-3);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.category-badge {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		background: rgba(107, 207, 126, 0.2);
		border: 1px solid rgba(107, 207, 126, 0.5);
		border-radius: var(--spacing-4);
		padding: 0.25rem 0.75rem;
		font-size: 0.65rem;
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		backdrop-filter: blur(8px);
	}

	.front-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		margin-bottom: var(--spacing-4);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
		line-height: 1.2;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.front-stats {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
	}

	.stat-chip {
		display: flex;
		align-items: center;
		gap: 6px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-4);
		padding: 0.3rem 0.6rem;
		font-size: 0.7rem;
		color: theme('colors.cyan.DEFAULT');
		font-weight: 600;
	}

	.stat-icon {
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-weight: 700;
		flex-shrink: 0;
	}

	.stat-label {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.65rem;
		opacity: 0.8;
		margin-left: auto;
	}

	.intention-back {
		width: 100%;
		height: 100%;
		background: theme('colors.bg.deep');
		padding: var(--spacing-2);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.spiral-wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 0;
	}

	.back-image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		filter: blur(8px) brightness(0.4);
		z-index: 0;
	}

	.back-content {
		position: relative;
		z-index: 1;
		text-align: left;
		max-width: 90%;
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
		transform: scale(0.55);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.back-content.expanded {
		transform: scale(1);
		max-width: 600px;
		gap: var(--spacing-2);
	}

	.back-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--spacing-4);
	}

	.back-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		line-height: 1.2;
		flex: 1;
	}

	.back-content.expanded .back-title {
		font-size: var(--font-size-0);
	}

	.back-description {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.7rem;
		line-height: 1.5;
		margin: 0;
		opacity: 0.9;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.back-content.expanded .back-description {
		font-size: var(--font-size-2);
		-webkit-line-clamp: unset;
	}

	.back-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.back-content.expanded .back-details {
		gap: var(--spacing-4);
	}

	.detail-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		color: theme('colors.sage.DEFAULT');
		font-size: 0.65rem;
	}

	.back-content.expanded .detail-row {
		font-size: var(--font-size-3);
	}

	.detail-icon {
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.back-content.expanded .detail-icon {
		font-size: var(--font-size-1);
	}

	.detail-text {
		line-height: 1.3;
	}

	.action-button {
		background: theme('colors.moss.DEFAULT');
		color: theme('colors.bg.deep');
		border: none;
		border-radius: var(--spacing-4);
		padding: 0.35rem 0.75rem;
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: 0.7rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: center;
		align-self: center;
	}

	.back-content.expanded .action-button {
		padding: var(--spacing-4) var(--spacing-2);
		font-size: var(--font-size-2);
	}

	.action-button:hover {
		box-shadow: 0 0 20px theme('colors.moss.glow');
		transform: translateY(-2px);
	}
</style>
