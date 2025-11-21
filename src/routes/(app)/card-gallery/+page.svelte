<script lang="ts">
	import { onMount } from 'svelte';
	import { activeTab } from '$stores/navigationStore';
	import CardGallery from '$lib/components/v2/CardGallery.svelte';
	import MediaCard from '$lib/components/v2/MediaCard.svelte';
	import FlipCard from '$lib/components/v2/FlipCard.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Section from '$lib/components/layout/Section.svelte';

	onMount(() => {
		activeTab.set('home');
	});

	// Example data for MediaCards
	const mediaItems = [
		{
			mediaUrl: '/images/permaculture-garden.jpg',
			title: 'Permaculture Garden Design',
			description: 'A sustainable food forest designed using permaculture principles, featuring companion planting and water harvesting systems.',
			category: 'Permaculture',
			date: '2024-03-15'
		},
		{
			mediaUrl: '/images/community-meal.jpg',
			title: 'Community Meal Gathering',
			description: 'Weekly potluck where temple members share home-cooked meals and stories.',
			category: 'Community',
			date: '2024-03-10'
		},
		{
			mediaUrl: '/images/workshop.jpg',
			title: 'Natural Building Workshop',
			description: 'Hands-on workshop teaching cob construction and earthen architecture techniques.',
			category: 'Workshop',
			date: '2024-02-28'
		}
	];
</script>

<svelte:head>
	<title>Card Gallery - Synchronicity Engine</title>
</svelte:head>

<div class="card-gallery-page">
	<Stack gap="lg">
		<!-- Header -->
		<Section spacing="md">
			<div class="page-header">
				<h1 class="page-title">Interactive Card Gallery</h1>
				<p class="page-description">
					Explore our reusable flip card system. Tap any card to reveal more details!
				</p>
			</div>
		</Section>

		<!-- Media Cards -->
		<Section spacing="md">
			<CardGallery title="📸 Media Showcase" columns={3}>
				{#each mediaItems as item}
					<MediaCard
						mediaUrl={item.mediaUrl}
						title={item.title}
						description={item.description}
						category={item.category}
						date={item.date}
						size="large"
					/>
				{/each}
			</CardGallery>
		</Section>

		<!-- Custom Card Examples -->
		<Section spacing="md">
			<CardGallery title="🎨 Custom Card Examples" columns={3}>
				<!-- Example 1: Simple Text Card -->
				<FlipCard size="large" tapHintText="Tap to read more">
					<div slot="front" class="custom-card-front gradient-1">
						<div class="custom-icon">🌱</div>
						<div class="custom-title">Sacred Economics</div>
					</div>
					<div slot="back" class="custom-card-back">
						<h3 class="custom-back-title">Gift Economy</h3>
						<p class="custom-back-text">
							A system where goods and services are given without explicit agreement for immediate or future rewards.
						</p>
					</div>
				</FlipCard>

				<!-- Example 2: Quote Card -->
				<FlipCard size="large" tapHintText="Tap for author">
					<div slot="front" class="custom-card-front gradient-2">
						<div class="quote-mark">"</div>
						<div class="quote-text">Be the change you wish to see in the world</div>
					</div>
					<div slot="back" class="custom-card-back">
						<h3 class="custom-back-title">Mahatma Gandhi</h3>
						<p class="custom-back-text">
							Leader of the Indian independence movement. His philosophy of nonviolent resistance inspired civil rights movements worldwide.
						</p>
					</div>
				</FlipCard>

				<!-- Example 3: Stat Card -->
				<FlipCard size="large" tapHintText="Tap for breakdown">
					<div slot="front" class="custom-card-front gradient-3">
						<div class="stat-number">156h</div>
						<div class="stat-label">Tokens of Gratitude</div>
					</div>
					<div slot="back" class="custom-card-back">
						<h3 class="custom-back-title">Token Breakdown</h3>
						<div class="stat-breakdown">
							<div class="breakdown-item">
								<span>🌾 Gardening:</span>
								<span>68h</span>
							</div>
							<div class="breakdown-item">
								<span>🏗️ Building:</span>
								<span>42h</span>
							</div>
							<div class="breakdown-item">
								<span>🍳 Cooking:</span>
								<span>46h</span>
							</div>
						</div>
					</div>
				</FlipCard>
			</CardGallery>
		</Section>

		<!-- Usage Instructions -->
		<Section spacing="md">
			<div class="instructions-panel">
				<h2 class="instructions-title">How to Use</h2>
				<div class="instructions-grid">
					<div class="instruction-item">
						<div class="instruction-icon">🔄</div>
						<h3>FlipCard Component</h3>
						<p>Generic component that handles flip and expand animations. Use slots for custom content on front and back.</p>
					</div>
					<div class="instruction-item">
						<div class="instruction-icon">🎭</div>
						<h3>MediaCard Example</h3>
						<p>Pre-built card for images and media content. Shows preview on front, details on back.</p>
					</div>
					<div class="instruction-item">
						<div class="instruction-icon">🎨</div>
						<h3>Custom Cards</h3>
						<p>Build your own card types using FlipCard with any content you want!</p>
					</div>
					<div class="instruction-item">
						<div class="instruction-icon">📐</div>
						<h3>CardGallery Layout</h3>
						<p>Responsive grid component for organizing multiple cards with adjustable columns.</p>
					</div>
				</div>
			</div>
		</Section>
	</Stack>
</div>

<style>
	.card-gallery-page {
		/* Layout provided by Stack and Section */
	}

	.page-header {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-00);
		font-weight: 700;
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
		margin-bottom: var(--spacing-3);
	}

	.page-description {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1);
		line-height: 1.6;
		opacity: 0.9;
	}

	/* Custom Card Styles */
	.custom-card-front {
		width: 100%;
		height: 100%;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2);
		text-align: center;
		gap: var(--spacing-3);
	}

	.gradient-1 {
		background: linear-gradient(135deg, rgba(135, 169, 107, 0.3), rgba(135, 169, 107, 0.1));
	}

	.gradient-2 {
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(0, 255, 209, 0.1));
	}

	.gradient-3 {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1));
	}

	.custom-icon {
		font-size: 4rem;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	}

	.custom-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.quote-mark {
		font-size: 6rem;
		color: theme('colors.cyan.DEFAULT');
		opacity: 0.3;
		line-height: 1;
	}

	.quote-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		font-style: italic;
		line-height: 1.4;
	}

	.stat-number {
		font-size: 4rem;
		color: theme('colors.gold.DEFAULT');
		font-weight: 700;
		text-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
	}

	.stat-label {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.8;
	}

	.custom-card-back {
		width: 100%;
		height: 100%;
		background: theme('colors.bg.deep');
		padding: var(--spacing-2);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.custom-back-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		margin-bottom: var(--spacing-3);
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.custom-back-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2);
		line-height: 1.5;
		opacity: 0.9;
		max-width: 80%;
	}

	.stat-breakdown {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		width: 100%;
		max-width: 200px;
	}

	.breakdown-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-4);
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-4);
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3);
	}

	/* Instructions Panel */
	.instructions-panel {
		background: rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-3);
		padding: var(--spacing-2);
	}

	.instructions-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--spacing-2);
		text-align: center;
	}

	.instructions-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-2);
	}

	@media (max-width: 768px) {
		.instructions-grid {
			grid-template-columns: 1fr;
		}
	}

	.instruction-item {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(135, 169, 107, 0.3);
		border-radius: var(--spacing-4);
		padding: var(--spacing-2);
		text-align: center;
	}

	.instruction-icon {
		font-size: 3rem;
		margin-bottom: var(--spacing-4);
	}

	.instruction-item h3 {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
		margin-bottom: var(--spacing-4);
	}

	.instruction-item p {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		line-height: 1.5;
	}
</style>
