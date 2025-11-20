<script lang="ts">
	import { selectedHashtag, availableHashtags, hashtagCounts } from '$lib/stores/articlesStore';

	// Format hashtag for display: CamelCase → "Camel Case"
	function formatHashtag(tag: string): string {
		// Insert space before capital letters
		return tag.replace(/([A-Z])/g, ' $1').trim();
	}

	function handleHashtagClick(tag: string) {
		selectedHashtag.set(tag);
	}
</script>

<div class="hashtag-sidebar">
	<!-- All Articles Button -->
	<button
		class="hashtag-button"
		class:active={$selectedHashtag === 'all'}
		on:click={() => handleHashtagClick('all')}
	>
		<span class="hashtag-label">All Articles</span>
		<span class="hashtag-count">{$hashtagCounts['all'] || 0}</span>
	</button>

	<!-- Individual Topic Filters -->
	{#each $availableHashtags as tag}
		<button
			class="hashtag-button"
			class:active={$selectedHashtag === tag}
			on:click={() => handleHashtagClick(tag)}
		>
			<span class="hashtag-label">{formatHashtag(tag)}</span>
			<span class="hashtag-count">{$hashtagCounts[tag] || 0}</span>
		</button>
	{/each}
</div>

<style>
	.hashtag-sidebar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: var(--spacing-3);
	}

	.hashtag-button {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		background: rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(0, 255, 209, 0.3);
		border-radius: 1.5rem;
		padding: 0.375rem 0.75rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.hashtag-button:hover {
		border-color: rgba(0, 255, 209, 0.5);
		background: rgba(0, 255, 209, 0.05);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.hashtag-button.active {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.15);
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.4);
	}

	.hashtag-label {
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.8rem;
		font-weight: 500;
	}

	.hashtag-button.active .hashtag-label {
		color: theme('colors.cyan.DEFAULT');
		font-weight: 600;
	}

	.hashtag-count {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		font-weight: 600;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 0.75rem;
		padding: 0.125rem 0.375rem;
		min-width: 1.5rem;
		text-align: center;
	}

	.hashtag-button.active .hashtag-count {
		color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.2);
	}
</style>
