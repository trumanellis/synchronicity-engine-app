<script lang="ts">
	/**
	 * SectionTitle v1 - Rebuilt using layout primitives
	 * Uses Row for icon + text with proper text truncation
	 */
	import Row from '$lib/components/layout/Row.svelte';

	export let icon: string;
	export let title: string;
</script>

<Row gap="sm" align="center" className="section-title-wrapper">
	<span class="icon">{icon}</span>
	<h2 class="title">{title}</h2>
</Row>

<style>
	/* Icon */
	.icon {
		font-size: 1rem;
		line-height: 1;
		flex-shrink: 0;
	}

	/* Title */
	.title {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* Global class for container spacing */
	:global(.section-title-wrapper) {
		margin-bottom: 1rem;
	}
</style>
