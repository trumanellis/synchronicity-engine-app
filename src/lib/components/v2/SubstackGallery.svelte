<script lang="ts">
	import { onMount } from 'svelte';
	import { filteredArticles, isLoading, searchTerm, fetchArticles, fetchError } from '$lib/stores/articlesStore';
	import HashtagSidebar from './HashtagSidebar.svelte';
	import ArticleGrid from './ArticleGrid.svelte';

	export let substackUrl: string | undefined = undefined;
	export let canEdit: boolean = false;

	let searchQuery = '';
	let searchDebounce: ReturnType<typeof setTimeout>;

	onMount(() => {
		// Fetch articles on mount with the provided Substack URL
		fetchArticles(substackUrl);
	});

	// Debounced search
	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;

		clearTimeout(searchDebounce);
		searchDebounce = setTimeout(() => {
			searchTerm.set(searchQuery);
		}, 300);
	}

	function handleScanClick() {
		// Re-fetch articles from Substack
		fetchArticles(substackUrl);
	}
</script>

<div class="substack-gallery">
	<!-- Header Section -->
	<div class="section-title">
		<span>📖</span>
		<span>Further Reading</span>
	</div>

	{#if !substackUrl && canEdit}
		<!-- No Substack URL Banner -->
		<div class="no-url-banner">
			<div class="banner-icon">📝</div>
			<h3 class="banner-title">Connect Your Substack</h3>
			<p class="banner-message">
				Add your Substack publication URL in settings to automatically display your articles here.
			</p>
			<button class="banner-button" on:click={() => alert('Settings integration coming soon')}>
				<span>Add Substack URL</span>
			</button>
		</div>
	{:else if $fetchError}
		<!-- Error Banner -->
		<div class="error-banner">
			<div class="banner-icon">⚠️</div>
			<h3 class="banner-title">Failed to Load Articles</h3>
			<p class="banner-message">{$fetchError}</p>
			<button class="banner-button" on:click={handleScanClick}>
				<span>Retry</span>
			</button>
		</div>
	{:else}
		<!-- Topic Filters -->
		<HashtagSidebar />

		<!-- Articles Grid -->
		<ArticleGrid articles={$filteredArticles} isLoading={$isLoading} />
	{/if}
</div>

<style>
	.substack-gallery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	/* Section Title - Centered style matching other sections */
	.section-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		font-family: theme('fontFamily.exo');
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--spacing-2);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-4);
		text-align: center;
		text-shadow: 0 0 15px rgba(0, 255, 209, 0.5);
	}

	/* No URL Banner */
	.no-url-banner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		text-align: center;
		gap: var(--spacing-3);
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 255, 209, 0.05));
		border: 2px dashed rgba(212, 175, 55, 0.4);
		border-radius: var(--spacing-3);
	}

	.banner-icon {
		font-size: 4rem;
		opacity: 0.8;
	}

	.banner-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		margin: 0;
	}

	.banner-message {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		opacity: 0.9;
		margin: 0;
		max-width: 500px;
	}

	.banner-button {
		background: theme('colors.gold.DEFAULT');
		border: none;
		border-radius: var(--spacing-4);
		padding: var(--spacing-4) var(--spacing-2);
		color: theme('colors.bg.deep');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.banner-button:hover {
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
		transform: translateY(-2px);
	}

	/* Error Banner */
	.error-banner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		text-align: center;
		gap: var(--spacing-3);
		background: linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(212, 175, 55, 0.05));
		border: 2px dashed rgba(255, 99, 71, 0.4);
		border-radius: var(--spacing-3);
	}

	.error-banner .banner-title {
		color: rgba(255, 99, 71, 1);
	}


</style>
