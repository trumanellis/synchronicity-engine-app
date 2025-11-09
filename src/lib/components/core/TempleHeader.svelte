<script lang="ts">
	import { currentTemple } from '$stores/templeStore';
</script>

<div class="temple-header">
	<div class="temple-icon">{$currentTemple.icon}</div>
	<div class="temple-info">
		<div class="temple-name">{$currentTemple.name}</div>
		<div class="temple-meta">
			{$currentTemple.location.name}, {$currentTemple.location.region} • {$currentTemple.memberCount}
			members
		</div>
	</div>
</div>

<style>
	.temple-header {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: 1rem;
		padding: 1rem;
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.temple-icon {
		width: 50px;
		height: 50px;
		background: rgba(212, 175, 55, 0.2);
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.temple-info {
		flex: 1;
	}

	.temple-name {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 1.1rem;
		margin-bottom: 0.25rem;
	}

	.temple-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
	}
</style>
