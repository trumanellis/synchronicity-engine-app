<script lang="ts">
	import FlipCard from './FlipCard.svelte';

	export let mediaUrl: string;
	export let title: string;
	export let description: string;
	export let category: string;
	export let date: string;
	export let size: 'small' | 'medium' | 'large' = 'large';
</script>

<FlipCard {size} tapHintText="Tap for details">
	<div slot="front" class="media-front">
		<img src={mediaUrl} alt={title} class="media-image" />
		<div class="media-overlay">
			<div class="media-category">{category}</div>
		</div>
	</div>

	<div slot="back" let:isExpanded class="media-back">
		<div class="background-blur" style="--media-bg: url({mediaUrl})"></div>
		<div class="media-content" class:expanded={isExpanded}>
			<h3 class="media-title">{title}</h3>
			<p class="media-description">{description}</p>
			<div class="media-meta">
				<span class="media-date">{date}</span>
			</div>
		</div>
	</div>
</FlipCard>

<style>
	.media-front {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		background: linear-gradient(135deg, theme('colors.bg.mid') 0%, theme('colors.bg.front') 100%);
	}

	.media-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.media-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		padding: var(--spacing-3);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.media-category {
		background: rgba(0, 255, 209, 0.2);
		border: 1px solid rgba(0, 255, 209, 0.5);
		border-radius: var(--spacing-4);
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
		color: theme('colors.cyan.DEFAULT');
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.media-back {
		width: 100%;
		height: 100%;
		padding: var(--spacing-2);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.background-blur {
		position: absolute;
		inset: 0;
		background-image: var(--media-bg);
		background-size: cover;
		background-position: center;
		filter: blur(20px);
		opacity: 0.3;
		z-index: 0;
	}

	.media-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 90%;
		transition: all 1s cubic-bezier(0.4, 0.0, 0.2, 1);
		transform: scale(0.55);
	}

	.media-content.expanded {
		transform: scale(1);
		max-width: 600px;
	}

	.media-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 700;
		margin-bottom: var(--spacing-4);
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.media-content.expanded .media-title {
		font-size: var(--font-size-0);
		margin-bottom: var(--spacing-2);
	}

	.media-description {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.7rem;
		line-height: 1.4;
		margin-bottom: var(--spacing-4);
		opacity: 0.9;
	}

	.media-content.expanded .media-description {
		font-size: var(--font-size-2);
		margin-bottom: var(--spacing-2);
	}

	.media-meta {
		display: flex;
		justify-content: center;
		gap: var(--spacing-3);
	}

	.media-date {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.65rem;
		opacity: 0.7;
	}

	.media-content.expanded .media-date {
		font-size: var(--font-size-3);
	}
</style>
