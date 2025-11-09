<script lang="ts">
	export let icon: string;
	export let value: string | number;
	export let label: string;
	export let onClick: (() => void) | undefined = undefined;
</script>

<div class="stat-card" role="button" tabindex="0" on:click={onClick} on:keypress={onClick}>
	<div class="stat-icon">{icon}</div>
	<div class="stat-value">{value}</div>
	<div class="stat-label">{label}</div>
</div>

<style>
	.stat-icon {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
