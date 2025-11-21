<script lang="ts">
	/**
	 * V2 Shared Layout
	 * Provides ActiveIntentionHero and RadialNav to all pages
	 * Implements golden ratio layout (61.8% content / 38.2% hero+nav)
	 */
	import { onMount } from 'svelte';
	import { intentions, activeIntentionId } from '$data/mockData';

	// V2 Components
	import ActiveIntentionHero from '$lib/components/v2/ActiveIntentionHero.svelte';
	import RadialNav from '$lib/components/v2/RadialNav.svelte';
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

		<!-- Radial Navigation -->
		<RadialNav />
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
		/* Full viewport height with padding for radial nav */
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: visible; /* Allow horizontal glow spread */
		padding: var(--spacing-3); /* 12px all around */
		padding-bottom: 120px; /* Space for radial nav */
		scrollbar-width: thin;
	}
</style>
