<script lang="ts">
	/**
	 * ContentCard v2 - Reusable card component for all content types
	 * Matches reference design with featured image, title, subtitle, tags, metrics, and action link
	 * Uses golden ratio proportions for image:text sections
	 */

	import type { VisibilityLevel } from '$types';
	import VisibilitySelector from './VisibilitySelector.svelte';

	// Props for flexibility
	export let imageUrl: string | null = null;
	export let imageAlt: string = '';
	export let imagePlaceholder: string = '🖼️';
	export let title: string;
	export let subtitle: string = '';
	export let tags: string[] = [];
	export let metrics: Array<{ icon: string; value: string | number; label?: string }> = [];
	export let date: string = '';
	export let actionText: string = 'Read More';
	export let actionIcon: string = '→';
	export let onClick: (() => void) | undefined = undefined;
	export let variant: 'default' | 'featured' = 'default';
	export let canEdit: boolean = false;
	export let visibility: VisibilityLevel | undefined = undefined;
	export let onVisibilityChange: ((newVisibility: VisibilityLevel) => void) | undefined = undefined;
</script>

<button class="content-card card-golden-ratio" on:click={onClick} disabled={!onClick}>
	<!-- Featured Image Section - φ proportion (larger) -->
	<div class="golden-ratio-image">
		<div class="image-container">
			{#if imageUrl}
				<img src={imageUrl} alt={imageAlt} class="featured-image" />
			{:else}
				<div class="image-placeholder">
					<span class="placeholder-icon">{imagePlaceholder}</span>
				</div>
			{/if}
			{#if variant === 'featured'}
				<div class="featured-badge">
					<span class="badge-icon">⭐</span>
					<span class="badge-text">Featured</span>
				</div>
			{/if}
		</div>
		<!-- Tags positioned over image -->
		{#if tags.length > 0}
			<div class="tags-overlay">
				{#each tags.slice(0, 3) as tag}
					<span class="tag">#{tag}</span>
				{/each}
				{#if tags.length > 3}
					<span class="tag-more">+{tags.length - 3}</span>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Content Section - 1 proportion (smaller) -->
	<div class="golden-ratio-text">
		<div class="card-content">
			<!-- Title and Visibility Selector -->
			<div class="title-row">
				<h3 class="card-title">{title}</h3>
				{#if canEdit && visibility !== undefined && onVisibilityChange}
					<VisibilitySelector
						visibility={visibility}
						onChange={onVisibilityChange}
						compact={true}
					/>
				{/if}
			</div>

			<!-- Subtitle -->
			{#if subtitle}
				<p class="card-subtitle">{subtitle}</p>
			{/if}

			<!-- Metrics Row -->
			{#if metrics.length > 0}
				<div class="metrics-row">
					{#each metrics as metric}
						<div class="metric-item">
							<span class="metric-icon">{metric.icon}</span>
							<span class="metric-value">{metric.value}</span>
							{#if metric.label}
								<span class="metric-label">{metric.label}</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Footer with Date & Action -->
			<div class="card-footer">
				{#if date}
					<span class="footer-date">{date}</span>
				{/if}
				<span class="footer-action">
					<span class="action-text">{actionText}</span>
					<span class="action-icon">{actionIcon}</span>
				</span>
			</div>
		</div>
	</div>
</button>

<style>
	.content-card {
		background: linear-gradient(135deg, theme('colors.moss.bg'), rgba(0, 0, 0, 0.3));
		border: 2px solid theme('colors.moss.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 0 10px rgba(107, 207, 126, 0.1);
		overflow: hidden;
		position: relative;
	}

	.content-card:hover:not(:disabled) {
		border-color: theme('colors.moss.DEFAULT');
		background: linear-gradient(135deg, rgba(107, 207, 126, 0.12), rgba(0, 0, 0, 0.3));
		box-shadow: 0 0 25px theme('colors.moss.glow');
		transform: translateY(-2px);
	}

	.content-card:hover:not(:disabled) .image-container {
		border-color: theme('colors.moss.DEFAULT');
		box-shadow: 0 0 20px theme('colors.moss.glow');
	}

	.content-card:disabled {
		cursor: default;
	}

	/* Image Section - Rounded rectangle */
	.image-container {
		width: 100%;
		aspect-ratio: 1 / 1; /* Square container */
		position: relative;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.4);
		border-radius: var(--spacing-3); /* Match card border radius */
		border: 2px solid theme('colors.moss.border');
	}

	.golden-ratio-image {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative; /* Positioning context for tags */
	}

	.featured-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.content-card:hover:not(:disabled) .featured-image {
		transform: scale(1.05);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(107, 207, 126, 0.1), rgba(0, 0, 0, 0.4));
	}

	.placeholder-icon {
		font-size: 2.5rem; /* Reduced from 4rem for compact cards */
		opacity: 0.3;
	}

	.featured-badge {
		position: absolute;
		top: var(--spacing-3);
		right: var(--spacing-3);
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4);
		padding: 4px var(--spacing-4);
		display: flex;
		align-items: center;
		gap: 4px;
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
	}

	.badge-icon {
		font-size: var(--font-size-3);
	}

	.badge-text {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Content Section - 1 proportion */
	.card-content {
		display: flex;
		flex-direction: column;
		gap: 4px; /* Reduced from 8px for more compact layout */
		padding: var(--spacing-4); /* 8px φ-based - reduced from 12px */
		height: 100%;
	}

	/* Tags overlay on image - positioned at bottom left corner */
	.tags-overlay {
		position: absolute;
		bottom: var(--spacing-4); /* 8px from bottom */
		left: var(--spacing-4); /* 8px from left */
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		z-index: 10;
		max-width: 70%;
	}

	.tag {
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(8px);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
		padding: 2px 6px;
		border-radius: 4px;
		font-size: 0.6rem;
		font-weight: 600;
		text-transform: lowercase;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.tag-more {
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(8px);
		color: theme('colors.sage.DEFAULT');
		font-size: 0.6rem;
		font-weight: 600;
		padding: 2px 5px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	/* Title row with optional visibility selector */
	.title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 4px;
	}

	/* Title at top of card */
	.card-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 700;
		margin: 0;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		flex: 1;
	}

	.card-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		line-height: 1.4;
		margin: 0;
		margin-top: 2px;
		opacity: 0.85;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* Metrics */
	.metrics-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4); /* 8px φ-based - reduced from 12px */
		align-items: center;
	}

	.metric-item {
		display: flex;
		align-items: center;
		gap: 2px;
		color: theme('colors.cream.DEFAULT');
		font-size: 0.65rem; /* Smaller than Level 3 for compact layout */
		font-weight: 500;
	}

	.metric-icon {
		font-size: 0.75rem;
		opacity: 0.7;
		filter: drop-shadow(0 0 3px rgba(0, 255, 209, 0.5));
		animation: icon-pulse 3s ease-in-out infinite;
	}

	@keyframes icon-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 3px rgba(0, 255, 209, 0.5));
		}
		50% {
			filter: drop-shadow(0 0 6px rgba(0, 255, 209, 0.8));
		}
	}

	.metric-value {
		font-weight: 700;
	}

	.metric-label {
		opacity: 0.7;
	}

	/* Footer */
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 4px;
		border-top: 1px solid theme('colors.moss.border');
		margin-top: auto;
	}

	.footer-date {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.6rem; /* Smaller than Level 3 for compact cards */
		opacity: 0.7;
	}

	.footer-action {
		display: flex;
		align-items: center;
		gap: 2px;
		color: theme('colors.moss.DEFAULT');
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.3px;
		transition: all 0.2s ease;
	}

	.content-card:hover:not(:disabled) .footer-action {
		color: theme('colors.cyan.DEFAULT');
		text-shadow: 0 0 10px theme('colors.cyan.glow');
	}

	.action-icon {
		font-size: 0.75rem;
		transition: transform 0.2s ease;
	}

	.content-card:hover:not(:disabled) .action-icon {
		transform: translateX(4px);
	}
</style>
