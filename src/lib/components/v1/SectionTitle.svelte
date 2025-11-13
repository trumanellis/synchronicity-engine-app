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
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1;
		flex-shrink: 0;
	}

	/* Title */
	.title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
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
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}
</style>
