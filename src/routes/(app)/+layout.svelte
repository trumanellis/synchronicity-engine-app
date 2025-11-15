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
	<!-- Relative Banner Background - at top of scrollable content -->
	<div class="banner-background" />

	<div class="golden-layout">
		<!-- Content Section: 61.8% viewport height (top), scrollable -->
		<div class="content-section">
			<PageContainer maxWidth="xl">
				<slot />
			</PageContainer>
		</div>

		<!-- Hero Section: 38.2% viewport height (bottom) - includes hero card + nav bar -->
		<div class="hero-section">
			<div class="hero-container">
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
	@media (min-width: 768px) {
		.v2-layout {
			margin-left: 5rem;
		}
	}

	/* Relative Banner Background - at top of scrollable content */
	.banner-background {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 56.25%; /* 16:9 aspect ratio for mobile */
		background-image: url('/Synchronicity Engine.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.5; /* More visible */
		pointer-events: none;
		margin-bottom: var(--spacing-3);
		z-index: 10; /* Bring forward */
	}

	@media (min-width: 768px) {
		.banner-background {
			padding-bottom: 40%; /* Wider aspect ratio on desktop */
		}
	}

	/* Golden Ratio Layout: 61.8% Content (top) / 38.2% Hero+Nav (bottom) */
	.golden-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content-section {
		/* Full viewport height with padding for fixed hero at bottom */
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0 var(--spacing-3) var(--spacing-3); /* No top padding, sides and bottom */
		padding-bottom: 190px; /* Mobile: fixed 170px hero + 20px breathing room */
		scrollbar-width: thin;
		position: relative;
		z-index: 5; /* Below banner */
	}

	/* Desktop: adjust padding for golden ratio hero */
	@media (min-width: 768px) {
		.content-section {
			padding-bottom: calc(100vh * var(--small-ratio) + var(--spacing-1)); /* Extra padding for fixed hero + breathing room */
		}
	}

	.hero-section {
		/* Fixed at bottom - smaller on mobile, golden ratio on desktop */
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 170px; /* Fixed height on mobile (more room for hero card) */
		display: flex;
		flex-direction: column;
		justify-content: flex-end; /* Push content to bottom */
		gap: 0; /* No gap between hero and nav */
		background: transparent; /* Transparent - no black gap */
		overflow: visible; /* Allow top of card to show on hover */
		z-index: 100;
	}

	/* Desktop: golden ratio and account for sidebar */
	@media (min-width: 768px) {
		.hero-section {
			left: 5rem;
			height: calc(100vh * var(--small-ratio)); /* 38.2% golden ratio on desktop */
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
