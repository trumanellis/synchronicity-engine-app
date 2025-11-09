<script lang="ts">
	import type { Connection } from '$types';
	import { formatTimeAgo } from '$data/mockData';

	export let connection: Connection;
	export let onClick: (() => void) | undefined = undefined;

	$: trustColor = getTrustColor(connection.stats.trustLevel);

	function getTrustColor(level: string): string {
		const colors: Record<string, string> = {
			high: 'gold',
			medium: 'cyan',
			low: 'sage'
		};
		return colors[level] || 'sage';
	}
</script>

<button class="connection-card" on:click={onClick}>
	<div class="connection-avatar">{connection.avatar}</div>
	<div class="connection-content">
		<div class="connection-header">
			<h3 class="connection-name">{connection.name}</h3>
			<div class="trust-badge {trustColor}">
				{connection.stats.trustLevel}
			</div>
		</div>
		<p class="connection-bio">{connection.bio}</p>
		<div class="connection-footer">
			<span class="connection-stat">{connection.stats.exchangesCompleted} exchanges</span>
			<span class="connection-date">{formatTimeAgo(connection.stats.lastInteraction)}</span>
		</div>
	</div>
</button>

<style>
	.connection-card {
		display: flex;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.75rem;
		padding: 1rem;
		text-align: left;
		width: 100%;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.connection-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
		transform: translateY(-2px);
	}

	.connection-avatar {
		width: 48px;
		height: 48px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.connection-content {
		flex: 1;
		min-width: 0;
	}

	.connection-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.connection-name {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.trust-badge {
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		white-space: nowrap;
	}

	.trust-badge.gold {
		color: theme('colors.gold.DEFAULT');
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
	}

	.trust-badge.cyan {
		color: theme('colors.cyan.DEFAULT');
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.border');
	}

	.trust-badge.sage {
		color: theme('colors.sage.DEFAULT');
		background: rgba(132, 169, 140, 0.1);
		border: 1px solid rgba(132, 169, 140, 0.2);
	}

	.connection-bio {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.connection-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	.connection-stat {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.75rem;
		font-weight: 500;
	}

	.connection-date {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
	}
</style>
