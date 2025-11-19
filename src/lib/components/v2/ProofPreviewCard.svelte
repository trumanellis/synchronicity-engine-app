<script lang="ts">
	import type { ProofOfService } from '$types';
	import { formatTimeAgo } from '$data/mockData';

	export let proof: ProofOfService;
	export let onClick: (() => void) | undefined = undefined;
	export let showActions = false;

	function getStatusColor(status: ProofOfService['status']): string {
		const colors = {
			pending: 'gold',
			approved: 'cyan',
			token_created: 'sage'
		};
		return colors[status];
	}

	function getStatusLabel(status: ProofOfService['status']): string {
		const labels = {
			pending: 'Pending Review',
			approved: 'Approved',
			token_created: 'Token Created'
		};
		return labels[status];
	}

	function getStatusIcon(status: ProofOfService['status']): string {
		const icons = {
			pending: '⏳',
			approved: '✓',
			token_created: '🏆'
		};
		return icons[status];
	}
</script>

<button class="proof-card card-golden-ratio" on:click={onClick} disabled={!onClick}>
	<!-- Media Section - φ proportion (larger) -->
	{#if proof.media && proof.media.length > 0}
		<div class="golden-ratio-image">
			<div class="media-gallery-full">
				{#each proof.media.slice(0, 3) as mediaUrl, i}
					<div class="media-thumbnail">
						<div class="media-placeholder">
							<span class="media-icon">📷</span>
							<span class="media-number">{i + 1}</span>
						</div>
					</div>
				{/each}
				{#if proof.media.length > 3}
					<div class="media-more">+{proof.media.length - 3}</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Text Section - 1 proportion (smaller) -->
	<div class="{proof.media && proof.media.length > 0 ? 'golden-ratio-text' : 'golden-ratio-text-primary'}">
		<div class="proof-header">
			<div class="user-info">
				<div class="user-avatar">{proof.userAvatar}</div>
				<div class="user-details">
					<div class="user-name">{proof.userName}</div>
					<div class="proof-timestamp">{formatTimeAgo(proof.timestamp)}</div>
				</div>
			</div>
			<div class="status-badge {getStatusColor(proof.status)}">
				<span class="status-icon">{getStatusIcon(proof.status)}</span>
				<span class="status-label">{getStatusLabel(proof.status)}</span>
			</div>
		</div>

		<div class="proof-content">
			<h3 class="proof-title">{proof.title}</h3>
			<p class="proof-description">{proof.description}</p>

			<div class="proof-meta">
				<div class="meta-item hours">
					<span class="meta-icon">⏱️</span>
					<span class="meta-value">{proof.hoursWorked}h</span>
				</div>
				{#if proof.location}
					<div class="meta-item location">
						<span class="meta-icon">📍</span>
						<span class="meta-value">{proof.location.name}</span>
					</div>
				{/if}
				{#if proof.witnessIds && proof.witnessIds.length > 0}
					<div class="meta-item witnesses">
						<span class="meta-icon">👥</span>
						<span class="meta-value">{proof.witnessIds.length} witnesses</span>
					</div>
				{/if}
			</div>

			{#if proof.tokenId}
				<div class="token-link">
					<span class="token-icon">💎</span>
					<span class="token-text">Token: {proof.tokenId}</span>
				</div>
			{/if}
		</div>

		{#if showActions}
			<div class="proof-actions">
				<button class="action-button secondary" on:click|stopPropagation={() => alert('Edit proof')}>
					Edit
				</button>
				<button class="action-button danger" on:click|stopPropagation={() => alert('Delete proof')}>
					Delete
				</button>
			</div>
		{/if}
	</div>
</button>

<style>
	.proof-card {
		background: linear-gradient(135deg, theme('colors.moss.bg'), rgba(0, 0, 0, 0.3));
		border: 2px solid theme('colors.moss.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 0 10px rgba(107, 207, 126, 0.1);
		overflow: hidden;
		position: relative;
	}

	.proof-card:hover:not(:disabled) {
		border-color: theme('colors.moss.DEFAULT');
		background: linear-gradient(135deg, rgba(107, 207, 126, 0.12), rgba(0, 0, 0, 0.3));
		box-shadow: 0 0 25px theme('colors.moss.glow');
		transform: translateY(-2px);
	}

	.proof-card:disabled {
		cursor: default;
	}

	.proof-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-3); /* 12px φ-based */
		padding-bottom: 0;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.user-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.user-name {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
	}

	.proof-timestamp {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.7;
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px var(--spacing-4); /* 4px 8px φ-based */
		border-radius: var(--spacing-4); /* 8px φ-based */
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.status-badge.gold {
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
		color: theme('colors.gold.DEFAULT');
	}

	.status-badge.cyan {
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
	}

	.status-badge.sage {
		background: rgba(132, 169, 140, 0.1);
		border: 1px solid rgba(132, 169, 140, 0.2);
		color: theme('colors.sage.DEFAULT');
	}

	.proof-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		flex: 1;
		overflow: hidden;
		padding: var(--spacing-3); /* 12px φ-based */
	}

	/* Add padding to text section container */
	.proof-card > .golden-ratio-text,
	.proof-card > .golden-ratio-text-primary {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.proof-card > .golden-ratio-image {
		background: rgba(0, 0, 0, 0.2);
		border-bottom: 1px solid theme('colors.moss.border');
	}

	.proof-title {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
	}

	.proof-description {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		margin: 0;
		opacity: 0.9;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.proof-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-top: var(--spacing-4);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
	}

	.meta-item.hours {
		color: theme('colors.gold.DEFAULT');
		font-weight: 700;
	}

	.meta-item.location,
	.meta-item.witnesses {
		color: theme('colors.sage.DEFAULT');
	}

	.meta-value {
		opacity: 0.9;
	}

	.media-gallery-full {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		height: 100%;
		align-content: center;
	}

	.media-thumbnail {
		width: 100%;
		aspect-ratio: 1;
		flex-shrink: 0;
	}

	.media-placeholder {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}

	.media-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
	}

	.media-number {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
	}

	.media-more {
		width: 100%;
		aspect-ratio: 1;
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		display: flex;
		align-items: center;
		justify-content: center;
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
	}

	.token-link {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		margin-top: var(--spacing-4);
	}

	.token-icon {
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.token-text {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
	}

	.proof-actions {
		display: flex;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: auto;
		padding: var(--spacing-3); /* 12px φ-based */
		padding-top: var(--spacing-3);
		border-top: 1px solid theme('colors.cyan.border');
	}

	.action-button {
		flex: 1;
		padding: var(--spacing-4); /* 8px φ-based */
		border-radius: var(--spacing-4); /* 8px φ-based */
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-button.secondary {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.border');
		color: theme('colors.cyan.DEFAULT');
	}

	.action-button.secondary:hover {
		background: rgba(0, 255, 209, 0.2);
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.action-button.danger {
		background: rgba(255, 0, 0, 0.1);
		border: 1px solid rgba(255, 0, 0, 0.3);
		color: #ff6b6b;
	}

	.action-button.danger:hover {
		background: rgba(255, 0, 0, 0.2);
		box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
	}
</style>
