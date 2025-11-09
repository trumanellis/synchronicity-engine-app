<script lang="ts">
	import { distribution } from '$data/mockData';
	import { totalAvailableHours } from '$stores/tokensStore';
	import ActionButton from './ActionButton.svelte';

	export let selectedTokensCount = 0;
	export let selectedHours = 0;
	export let onPrepareClick: (() => void) | undefined = undefined;

	$: estimatedShare = selectedHours * distribution.stats.estimatedShareMultiplier;
	$: hasTokensSelected = selectedTokensCount > 0;
</script>

<div class="distribution-prep">
	<div class="prep-header">
		<div class="prep-icon">🌙</div>
		<div class="prep-info">
			<h3 class="prep-title">Distribution Preparation</h3>
			<p class="prep-subtitle">
				New Moon: {new Date(distribution.newMoonDate).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric'
				})} • {distribution.biddingPeriod.daysRemaining} days remaining
			</p>
		</div>
	</div>

	<div class="prep-stats">
		<div class="prep-stat">
			<div class="stat-label">Available Hours</div>
			<div class="stat-value">{$totalAvailableHours}h</div>
		</div>
		<div class="prep-stat">
			<div class="stat-label">Pool Amount</div>
			<div class="stat-value">${distribution.pool.totalUSD.toLocaleString()}</div>
		</div>
		<div class="prep-stat">
			<div class="stat-label">Share Multiplier</div>
			<div class="stat-value">{distribution.stats.estimatedShareMultiplier.toFixed(2)}x</div>
		</div>
	</div>

	{#if hasTokensSelected}
		<div class="selection-summary">
			<div class="summary-row">
				<span class="summary-label">Selected Tokens:</span>
				<span class="summary-value">{selectedTokensCount}</span>
			</div>
			<div class="summary-row">
				<span class="summary-label">Total Hours:</span>
				<span class="summary-value">{selectedHours}h</span>
			</div>
			<div class="summary-row highlight">
				<span class="summary-label">Estimated Share:</span>
				<span class="summary-value">${estimatedShare.toFixed(0)}</span>
			</div>
		</div>
	{/if}

	<div class="prep-info-box">
		<div class="info-box-title">
			<span>💡</span>
			<span>How Distribution Works</span>
		</div>
		<div class="info-box-content">
			<p>
				Submit your tokens during the bidding period. The monthly pool is divided proportionally
				based on hours contributed. Higher attention hours = higher gratitude value.
			</p>
		</div>
	</div>

	<ActionButton
		variant={hasTokensSelected ? 'primary' : 'secondary'}
		fullWidth={true}
		onClick={onPrepareClick}
		disabled={!hasTokensSelected}
	>
		{hasTokensSelected ? `Submit ${selectedTokensCount} Tokens` : 'Select Tokens to Begin'}
	</ActionButton>
</div>

<style>
	.distribution-prep {
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid theme('colors.gold.border');
		border-radius: 1rem;
		padding: 1.25rem;
		margin-top: 1.5rem;
	}

	.prep-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.prep-icon {
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

	.prep-info {
		flex: 1;
	}

	.prep-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.prep-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.75rem;
	}

	.prep-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.prep-stat {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
		padding: 0.75rem;
		text-align: center;
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 1rem;
		font-weight: 700;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.selection-summary {
		background: theme('colors.cyan.bg');
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.75rem;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	.summary-row:not(:last-child) {
		border-bottom: 1px solid theme('colors.cyan.border');
	}

	.summary-row.highlight {
		padding-top: 0.75rem;
	}

	.summary-label {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		font-weight: 500;
	}

	.summary-value {
		color: theme('colors.gold.DEFAULT');
		font-size: 1rem;
		font-weight: 700;
	}

	.summary-row.highlight .summary-value {
		font-size: 1.25rem;
		text-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.prep-info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: 0.75rem;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.6;
	}

	.info-box-content p {
		margin: 0;
	}

	@media (max-width: 768px) {
		.prep-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
