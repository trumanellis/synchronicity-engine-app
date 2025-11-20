<script lang="ts">
	import type { Article } from '$types';
	import { formatTimeAgo } from '$lib/data/mockData';

	export let article: Article;

	// Generate initials for fallback when no image
	function getInitials(title: string): string {
		return title
			.split(' ')
			.map((word) => word[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	}

	// Format reading time
	function formatReadingTime(minutes: number): string {
		return `${minutes} min read`;
	}
</script>

<a href={article.substackUrl} target="_blank" rel="noopener noreferrer" class="article-card">
	<!-- Featured Image or Fallback -->
	<div class="article-image">
		{#if article.imageUrl}
			<img src={article.imageUrl} alt={article.title} />
		{:else}
			<div class="fallback-image">
				<span class="fallback-initials">{getInitials(article.title)}</span>
			</div>
		{/if}
		<div class="reading-time-badge">{formatReadingTime(article.readingTime)}</div>
	</div>

	<!-- Content -->
	<div class="article-content">
		<!-- Title -->
		<h3 class="article-title">{article.title}</h3>

		<!-- Subtitle -->
		<p class="article-subtitle">{article.subtitle}</p>

		<!-- Preview Text -->
		<div class="article-preview">
			{@html article.preview.length > 180
				? article.preview.substring(0, 180) + '...'
				: article.preview}
		</div>

		<!-- Footer -->
		<div class="article-footer">
			<!-- Topics -->
			<div class="hashtags">
				{#each article.hashtags as tag}
					<span class="hashtag">{tag}</span>
				{/each}
			</div>

			<!-- Published Date -->
			<div class="published-date">{formatTimeAgo(article.publishedDate)}</div>
		</div>
	</div>
</a>

<style>
	.article-card {
		display: flex;
		flex-direction: column;
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		overflow: hidden;
		transition: all 0.3s ease;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		width: 100%;
		max-width: 100%;
	}

	.article-card:hover {
		transform: translateY(-2px);
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: theme('boxShadow.glow-cyan');
	}

	/* Featured Image */
	.article-image {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 aspect ratio - more compact */
		background: theme('colors.bg.mid');
		overflow: hidden;
	}

	.article-image img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.fallback-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.15), rgba(212, 175, 55, 0.15));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fallback-initials {
		font-size: 2rem;
		font-weight: 700;
		color: theme('colors.gold.DEFAULT');
		text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
		opacity: 0.7;
	}

	.reading-time-badge {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		background: rgba(0, 0, 0, 0.85);
		border: 1px solid theme('colors.gold.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		backdrop-filter: blur(4px);
	}

	/* Content Section */
	.article-content {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		flex: 1;
	}

	.article-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.3;
		margin: 0 0 0.25rem 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.article-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.4;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.article-preview {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.75rem;
		line-height: 1.5;
		opacity: 0.85;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.article-preview :global(strong) {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		display: block;
		margin: 0.25rem 0;
	}

	.article-preview :global(br) {
		display: block;
		content: '';
		margin: 0.25rem 0;
	}

	/* Footer */
	.article-footer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.75rem;
		border-top: 1px solid theme('colors.cyan.border');
	}

	.hashtags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.hashtag {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: 0.5rem;
		padding: 0.2rem 0.4rem;
		font-size: 0.7rem;
		color: theme('colors.cyan.DEFAULT');
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.article-card:hover .hashtag {
		background: rgba(0, 255, 209, 0.2);
		border-color: rgba(0, 255, 209, 0.5);
	}

	.published-date {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		opacity: 0.7;
		font-weight: 500;
	}

	/* Responsive adjustments */
	@media (max-width: 480px) {
		.article-content {
			padding: 0.875rem;
		}

		.article-title {
			font-size: 0.875rem;
		}

		.article-subtitle {
			font-size: 0.75rem;
		}

		.article-preview {
			font-size: 0.7rem;
		}

		.hashtag {
			font-size: 0.65rem;
		}

		.published-date {
			font-size: 0.7rem;
		}

		.fallback-initials {
			font-size: 1.75rem;
		}
	}

	@media (max-width: 360px) {
		.article-content {
			padding: 0.75rem;
		}

		.article-title {
			font-size: 0.8rem;
		}

		.article-subtitle {
			font-size: 0.7rem;
		}

		.fallback-initials {
			font-size: 1.5rem;
		}
	}
</style>
