<script lang="ts">
	export let icon: string;
	export let title: string;
</script>

<div class="section-title">
	<span>{icon}</span>
	<span>{title}</span>
</div>

<style>
	.section-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
