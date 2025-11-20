<script lang="ts">
	/**
	 * V2 Shared Layout
	 * Provides ActiveIntentionHero and BottomNav to all pages
	 * Implements golden ratio layout (61.8% content / 38.2% hero+nav)
	 */
	import { onMount } from 'svelte';
	import { intentions, activeIntentionId } from '$data/mockData';

	// V2 Components
	import ActiveIntentionHero from '$lib/components/v2/ActiveIntentionHero.svelte';
	import BottomNav from '$lib/components/v2/BottomNav.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';

	// Get active intention
	$: activeIntention = intentions.find((i) => i.intentionId === activeIntentionId) || null;

	function handleExpandIntention() {
		if (activeIntention) {
			window.location.href = `/browse/${activeIntention.intentionId}`;
		}
	}
</script>

<div class="v2-layout">
	<div class="golden-layout">
		<!-- Content Section: 61.8% viewport height (top), scrollable -->
		<div class="content-section">
			<PageContainer maxWidth="xl">
				<slot />
			</PageContainer>
		</div>

		<!-- Hero Section: Only show BottomNav, active intention now inline on home page -->
		<div class="hero-section">
			<div class="hero-container" style="display: none;">
				<ActiveIntentionHero intention={activeIntention} onClick={handleExpandIntention} />
			</div>
			<BottomNav />
		</div>
	</div>
</div>

<style>
	.v2-layout {
		min-height: 100vh;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		position: relative;
	}

	/* Desktop: sidebar */
	@media (min-width: 1024px) {
		.v2-layout {
			margin-left: 5rem;
		}
	}

	/* Golden Ratio Layout: 61.8% Content (top) / 38.2% Hero+Nav (bottom) */
	.golden-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content-section {
		/* Full viewport height with padding for fixed bottom nav */
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: visible; /* Allow horizontal glow spread */
		padding: var(--spacing-3); /* 12px all around */
		padding-bottom: 80px; /* Space for fixed bottom nav */
		scrollbar-width: thin;
	}

	/* Desktop: no bottom nav, no extra padding needed */
	@media (min-width: 1024px) {
		.content-section {
			padding-bottom: var(--spacing-3);
		}
	}

	.hero-section {
		/* Fixed at bottom - just the bottom nav now */
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: auto; /* Auto height for just the nav */
		display: flex;
		flex-direction: column;
		justify-content: flex-end; /* Push content to bottom */
		gap: 0;
		background: transparent;
		overflow: visible;
		z-index: 100;
	}

	/* Desktop: nav is sidebar, so hide this fixed bottom section */
	@media (min-width: 1024px) {
		.hero-section {
			display: none;
		}
	}

	.hero-container {
		flex: 0 0 auto; /* Don't grow, just fit content */
		padding: var(--spacing-3) var(--spacing-3) 0; /* 12px top padding for hover state, sides only */
		display: flex;
		align-items: center;
		overflow: visible; /* Allow hover effect to show */
	}

	/* Desktop: smaller top padding */
	@media (min-width: 768px) {
		.hero-container {
			padding: var(--spacing-4) var(--spacing-3) 0; /* 8px top padding on desktop */
		}
	}
</style>
