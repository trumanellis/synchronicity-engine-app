<script lang="ts">
	import type { Token } from '$types';
	import { formatTimeAgo } from '$data/mockData';

	export let token: Token;
	export let onClick: (() => void) | undefined = undefined;
	export let isSelected = false;

	$: icon = getCategoryIcon(token.category || 'General');
	$: statusColor = getStatusColor(token.status);
	$: statusLabel = getStatusLabel(token.status);

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			Infrastructure: '🏗️',
			Agriculture: '🌾',
			Education: '📚',
			Health: '🏥',
			Technology: '💻',
			Art: '🎨',
			General: '✨'
		};
		return icons[category] || '✨';
	}

	function getStatusColor(status: string): string {
		const colors: Record<string, string> = {
			available: 'gold',
			bid: 'cyan',
			historical: 'sage'
		};
		return colors[status] || 'sage';
	}

	function getStatusLabel(status: string): string {
		const labels: Record<string, string> = {
			available: 'Available',
			bid: 'In Bid',
			historical: 'Distributed'
		};
		return labels[status] || status;
	}
</script>

<button class="token-card" class:selected={isSelected} on:click={onClick}>
	<div class="token-icon">{icon}</div>
	<div class="token-content">
		<div class="token-header">
			<h3 class="token-title">{token.title}</h3>
			<div class="token-hours">{token.computed.hours}h</div>
		</div>
		<p class="token-description">{token.description || ''}</p>
		<div class="token-footer">
			<span class="token-status {statusColor}">{statusLabel}</span>
			<span class="token-date">{formatTimeAgo(token.timestamp)}</span>
		</div>
	</div>
</button>

<style>
	.token-card {
		display: flex;
		gap: 1rem;
		background: rgba(0, 0, 0, 0.3);
		border: 2px solid theme('colors.cyan.border');
		border-radius: 1rem;
		padding: 1rem;
		text-align: left;
		width: 100%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.token-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
		transform: translateY(-2px);
	}

	.token-card.selected {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 25px theme('colors.cyan.glow');
	}

	.token-icon {
		width: 48px;
		height: 48px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.token-content {
		flex: 1;
		min-width: 0;
	}

	.token-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.token-title {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.3;
		flex: 1;
	}

	.token-hours {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.1rem;
		font-weight: 700;
		white-space: nowrap;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.token-description {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.4;
		margin-bottom: 0.75rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.token-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	.token-status {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
	}

	.token-status.gold {
		color: theme('colors.gold.DEFAULT');
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
	}

	.token-status.cyan {
		color: theme('colors.cyan.DEFAULT');
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.border');
	}

	.token-status.sage {
		color: theme('colors.sage.DEFAULT');
		background: rgba(132, 169, 140, 0.1);
		border: 1px solid rgba(132, 169, 140, 0.2);
	}

	.token-date {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
	}
</style>
