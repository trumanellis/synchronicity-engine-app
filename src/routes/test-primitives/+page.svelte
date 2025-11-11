<script lang="ts">
	import { onMount } from 'svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Row from '$lib/components/layout/Row.svelte';
	import Card from '$lib/components/layout/Card.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import BottomNav from '$components/core/BottomNav.svelte';
	import { activeTab } from '$stores/navigationStore';

	onMount(() => {
		activeTab.set('home');
	});

	let windowWidth = 0;
	$: breakpoint =
		windowWidth < 480 ? 'xs' : windowWidth < 768 ? 'sm' : windowWidth < 1024 ? 'md' : 'lg';
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
	<title>Layout Primitives Test - Synchronicity Engine</title>
</svelte:head>

<div class="test-page">
	<PageContainer maxWidth="xl">
				<Stack gap="xl">
					<!-- Header -->
					<Section>
						<Stack gap="sm">
							<h1 class="text-gold text-2xl font-bold">Layout Primitives Test</h1>
							<p class="text-sage text-sm">
								Testing iteration 1 layout components at {windowWidth}px ({breakpoint})
							</p>
						</Stack>
					</Section>

					<!-- Stack Component Test -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">1. Stack Component</h2>
							<p class="text-sage text-sm">Vertical layout with consistent spacing</p>

							<Stack gap="sm">
								<Card variant="subtle" padding="sm">
									<p class="text-cream text-sm">Stack item 1 (gap: sm)</p>
								</Card>
								<Card variant="subtle" padding="sm">
									<p class="text-cream text-sm">Stack item 2</p>
								</Card>
								<Card variant="subtle" padding="sm">
									<p class="text-cream text-sm">Stack item 3</p>
								</Card>
							</Stack>
						</Stack>
					</Section>

					<!-- Row Component Test -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">2. Row Component</h2>
							<p class="text-sage text-sm">Horizontal layout with proper shrinking</p>

							<Row gap="md" justify="between" wrap={true}>
								<Card variant="subtle" padding="sm" className="flex-1">
									<p class="text-cream text-sm">Row item 1</p>
								</Card>
								<Card variant="subtle" padding="sm" className="flex-1">
									<p class="text-cream text-sm">Row item 2</p>
								</Card>
								<Card variant="subtle" padding="sm" className="flex-1">
									<p class="text-cream text-sm">Row item 3</p>
								</Card>
							</Row>

							<p class="text-sage text-xs">
								Note: Items should wrap on narrow screens, stay in row on wide screens
							</p>
						</Stack>
					</Section>

					<!-- Card Variants Test -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">3. Card Variants</h2>
							<p class="text-sage text-sm">Different card styles and interactive states</p>

							<Stack gap="sm">
								<Card variant="default" padding="md">
									<Stack gap="xs">
										<p class="text-gold font-semibold">Default Card</p>
										<p class="text-sage text-sm">Cyan border, subtle background</p>
									</Stack>
								</Card>

								<Card variant="highlighted" padding="md">
									<Stack gap="xs">
										<p class="text-gold font-semibold">Highlighted Card</p>
										<p class="text-sage text-sm">Gold accent, for important content</p>
									</Stack>
								</Card>

								<Card variant="subtle" padding="md">
									<Stack gap="xs">
										<p class="text-cream font-semibold">Subtle Card</p>
										<p class="text-sage text-sm">Minimal styling, blends in</p>
									</Stack>
								</Card>

								<Card variant="default" padding="md" interactive={true}>
									<Stack gap="xs">
										<p class="text-gold font-semibold">Interactive Card</p>
										<p class="text-sage text-sm">Hover me! Has hover state and cursor pointer</p>
									</Stack>
								</Card>
							</Stack>
						</Stack>
					</Section>

					<!-- Row with Long Text Test (Critical for Browse Page) -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">4. Row with Long Content</h2>
							<p class="text-sage text-sm">
								Tests the critical min-width: 0 behavior that fixes browse page
							</p>

							<Card variant="subtle" padding="md">
								<Row gap="md" justify="between">
									<div class="text-gold font-semibold truncate">
										🎯 This is a very long title that should truncate properly on narrow screens
										without breaking the layout or pushing other elements off screen
									</div>
									<select class="sort-select">
										<option>Sort</option>
										<option>Trending</option>
										<option>Recent</option>
									</select>
								</Row>
							</Card>

							<p class="text-sage text-xs">
								✓ Title should truncate, select should stay visible
							</p>
						</Stack>
					</Section>

					<!-- Width Constraint Test -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">5. Width Constraint Test</h2>
							<p class="text-sage text-sm">
								These should NEVER exceed viewport width at any screen size
							</p>

							<Card variant="default" padding="md">
								<Stack gap="sm">
									<div class="width-test-box">This box is 100% wide</div>
									<div class="width-test-box" style="width: 100%; max-width: 100%;">
										This box explicitly sets width: 100%; max-width: 100%;
									</div>
									<Row gap="sm">
										<div class="width-test-box flex-1">Flex 1</div>
										<div class="width-test-box flex-1">Flex 1</div>
										<div class="width-test-box flex-1">Flex 1</div>
									</Row>
								</Stack>
							</Card>

							<p class="text-sage text-xs">
								✓ No horizontal scroll should appear at any screen size
							</p>
						</Stack>
					</Section>

					<!-- Composition Test -->
					<Section>
						<Stack gap="md">
							<h2 class="text-cyan text-lg font-semibold">6. Composition Test</h2>
							<p class="text-sage text-sm">
								Complex layouts composed from primitives (like real app pages)
							</p>

							<Card variant="default" padding="md" interactive={true}>
								<Stack gap="md">
									<Row gap="md" align="start">
										<div class="card-icon">🌱</div>
										<Stack gap="xs" className="flex-1">
											<h3 class="text-gold font-semibold">Intention Card Example</h3>
											<p class="text-sage text-sm">
												This card uses Stack for vertical layout and Row for the icon + content
												layout. All spacing is consistent and responsive.
											</p>
										</Stack>
									</Row>
									<Row gap="lg" justify="between">
										<Row gap="sm">
											<span class="text-sage text-xs">⏱️</span>
											<span class="text-gold text-xs font-semibold">24h</span>
										</Row>
										<Row gap="sm">
											<span class="text-sage text-xs">👥</span>
											<span class="text-gold text-xs font-semibold">12</span>
										</Row>
										<Row gap="sm">
											<span class="text-sage text-xs">🎯</span>
											<span class="text-gold text-xs font-semibold">High</span>
										</Row>
									</Row>
								</Stack>
							</Card>
						</Stack>
					</Section>

					<!-- Status Report -->
					<Section>
						<Card variant="highlighted" padding="lg">
							<Stack gap="md">
								<h2 class="text-gold text-xl font-bold">✅ Phase 1 Complete</h2>
								<Stack gap="sm">
									<p class="text-sage">
										<strong>5 Layout Primitives Built:</strong>
									</p>
									<ul class="text-sage text-sm" style="list-style: none; padding-left: 0;">
										<li>✓ PageContainer - Max-width and responsive padding</li>
										<li>✓ Stack - Vertical layout with consistent gaps</li>
										<li>✓ Row - Horizontal layout with min-width: 0</li>
										<li>✓ Card - Base card with variants and interactive states</li>
										<li>✓ Section - Semantic sectioning with spacing</li>
									</ul>
								</Stack>
								<p class="text-sage text-sm">
									<strong>Next:</strong> Rebuild core components (IntentionCard, SearchBar, etc.) using
									these primitives
								</p>
							</Stack>
						</Card>
					</Section>
				</Stack>
		</PageContainer>

		<BottomNav />
</div>

<style>
	.test-page {
		min-height: 100vh;
		padding-bottom: 5rem;
		background: theme('colors.bg.deep');
		width: 100%;
		max-width: 100%;
		overflow-x: hidden;
		box-sizing: border-box;
	}

	.card-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.width-test-box {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.border');
		padding: 0.5rem;
		color: theme('colors.cyan.DEFAULT');
		text-align: center;
		font-size: 0.75rem;
		border-radius: 0.25rem;
	}

	.sort-select {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
		font-family: theme('fontFamily.exo');
		flex-shrink: 0;
		cursor: pointer;
	}

	.truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
		min-width: 0;
	}
</style>
