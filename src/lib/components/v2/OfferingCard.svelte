<script lang="ts">
	import type { Offering, VisibilityLevel } from '$types';
	import FlipCard from './FlipCard.svelte';
	import VisibilitySelector from './VisibilitySelector.svelte';

	export let offering: Offering;
	export let size: 'small' | 'medium' | 'large' = 'large';
	export let canEdit: boolean = false;
	export let onClick: (() => void) | undefined = undefined;
	export let onVisibilityChange: ((newVisibility: VisibilityLevel) => void) | undefined = undefined;

	$: imageUrl = offering.media && offering.media.length > 0 ? offering.media[0] : '/OfferingDefault.png';
	$: categoryIcon = getCategoryIcon(offering.category);
	$: statusInfo = getStatusInfo(offering.status);

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			'Skill Sharing': '🎓',
			'Tool Lending': '🔧',
			'Space Sharing': '🏠',
			'Food Sharing': '🍲',
			'Knowledge': '📚',
			'Service': '🤝',
			'Resource': '🌱'
		};
		return icons[category] || '🎁';
	}

	function getStatusInfo(status: string) {
		const statusConfig = {
			active: { icon: '✓', label: 'Available', color: 'cyan' },
			completed: { icon: '✓', label: 'Completed', color: 'gold' },
			archived: { icon: '✕', label: 'Archived', color: 'sage' }
		};
		return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
	}

	function handleNavigate() {
		if (onClick) {
			onClick();
		}
	}
</script>

<div>
	<FlipCard {size} tapHintText="Tap for details" ariaLabelFront="View offering details" ariaLabelBack="Show offering preview">
		<div slot="front" class="offering-front">
			<img src={imageUrl} alt={offering.title} class="offering-image" />

			<div class="front-overlay">
				<div class="status-badge {statusInfo.color}">
					<span>{statusInfo.icon}</span>
					<span>{statusInfo.label}</span>
				</div>
				<div class="offering-title-front">{offering.title}</div>
				<div class="offering-category">{offering.category}</div>
			</div>
		</div>

		<div slot="back" let:isExpanded class="offering-back">
			<div class="offering-content" class:expanded={isExpanded}>
				<div class="back-header">
					<h3 class="offering-title">{offering.title}</h3>
					{#if canEdit && offering.visibility !== undefined && onVisibilityChange}
						<VisibilitySelector
							visibility={offering.visibility}
							onChange={onVisibilityChange}
							compact={true}
						/>
					{/if}
				</div>

				<p class="offering-description">{offering.description}</p>

				<div class="offering-details">
					<div class="detail-item">
						<span class="detail-icon">📍</span>
						<span class="detail-text">{offering.location.name}</span>
					</div>
					<div class="detail-item">
						<span class="detail-icon">🏷️</span>
						<span class="detail-text">{offering.category}</span>
					</div>
					<div class="detail-item">
						<span class="detail-icon">📊</span>
						<span class="detail-text">{offering.stats.totalRecipients} recipients • {offering.stats.timesShared} shares • {offering.stats.activeDays} days</span>
					</div>
					<div class="detail-item">
						<span class="detail-icon">📅</span>
						<span class="detail-text">{new Date(offering.createdAt).toLocaleDateString()}</span>
					</div>
				</div>

				{#if offering.status === 'active'}
					<button class="request-button" on:click|stopPropagation={handleNavigate}>
						<span class="button-icon">💬</span>
						<span class="button-label">{canEdit ? 'Edit Offering' : 'Request Service'}</span>
					</button>
				{/if}
			</div>
		</div>
	</FlipCard>
</div>

<style>
	.offering-front {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
	}

	.offering-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.offering-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(0, 0, 0, 0.4));
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
		gap: var(--spacing-3);
	}

	.offering-title-front {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
		line-height: 1.2;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.offering-category {
		background: rgba(212, 175, 55, 0.2);
		border: 1px solid rgba(212, 175, 55, 0.5);
		border-radius: var(--spacing-4);
		padding: 0.25rem 0.75rem;
		font-size: 0.65rem;
		color: theme('colors.cream.DEFAULT');
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		backdrop-filter: blur(8px);
		align-self: flex-start;
	}

	.status-badge {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 0.25rem 0.5rem;
		border-radius: var(--spacing-4);
		font-size: 0.65rem;
		font-weight: 600;
		backdrop-filter: blur(8px);
	}

	.status-badge.cyan {
		background: rgba(0, 255, 209, 0.2);
		color: theme('colors.cyan.DEFAULT');
		border: 1px solid rgba(0, 255, 209, 0.5);
	}

	.status-badge.gold {
		background: rgba(212, 175, 55, 0.2);
		color: theme('colors.gold.DEFAULT');
		border: 1px solid rgba(212, 175, 55, 0.5);
	}

	.status-badge.sage {
		background: rgba(132, 169, 140, 0.1);
		color: theme('colors.sage.DEFAULT');
		border: 1px solid rgba(132, 169, 140, 0.3);
	}

	.offering-back {
		width: 100%;
		height: 100%;
		background: theme('colors.bg.deep');
		padding: var(--spacing-2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.offering-content {
		text-align: left;
		max-width: 90%;
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
		transform: scale(0.55);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.offering-content.expanded {
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

	.offering-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		margin: 0;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		flex: 1;
	}

	.offering-content.expanded .offering-title {
		font-size: var(--font-size-0);
	}

	.offering-description {
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

	.offering-content.expanded .offering-description {
		font-size: var(--font-size-2);
		-webkit-line-clamp: unset;
	}

	.offering-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.offering-content.expanded .offering-details {
		gap: var(--spacing-4);
	}

	.detail-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		color: theme('colors.sage.DEFAULT');
		font-size: 0.65rem;
	}

	.offering-content.expanded .detail-item {
		font-size: var(--font-size-3);
	}

	.detail-icon {
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.offering-content.expanded .detail-icon {
		font-size: var(--font-size-1);
	}

	.detail-text {
		line-height: 1.3;
	}

	.request-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.35rem 0.75rem;
		background: theme('colors.gold.DEFAULT');
		color: theme('colors.bg.deep');
		border: none;
		border-radius: var(--spacing-4);
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		font-size: 0.7rem;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: center;
	}

	.offering-content.expanded .request-button {
		padding: var(--spacing-4) var(--spacing-2);
		font-size: var(--font-size-2);
		gap: 0.5rem;
	}

	.request-button:hover {
		box-shadow: 0 0 20px theme('colors.gold.glow');
		transform: translateY(-2px);
	}

	.button-icon {
		font-size: 0.9rem;
	}

	.offering-content.expanded .button-icon {
		font-size: var(--font-size-1);
	}

	.button-label {
		font-size: inherit;
	}
</style>
