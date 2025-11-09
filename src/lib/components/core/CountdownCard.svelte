<script lang="ts">
	import { currentDistribution } from '$stores/distributionStore';
	import { formatCurrency } from '$data/mockData';
	import { userStats } from '$stores/userStore';

	$: poolAmount = formatCurrency($currentDistribution.pool.totalUSD);
	$: userHours = $userStats.totalHoursEarned;
	$: estimatedShare = formatCurrency(
		userHours * $currentDistribution.stats.estimatedShareMultiplier
	);
</script>

<div class="countdown-card">
	<div class="countdown-header">
		<div class="countdown-title">
			<span>🌑</span>
			<span>Next Distribution</span>
			<div class="countdown-pulse" />
		</div>
	</div>

	<div class="countdown-time">
		<div class="countdown-number">{$currentDistribution.biddingPeriod.daysRemaining}</div>
		<div class="countdown-label">Days Until New Moon</div>
	</div>

	<div class="countdown-info">
		<div class="countdown-info-item">
			<div class="countdown-info-label">Pool</div>
			<div class="countdown-info-value">{poolAmount}</div>
		</div>
		<div class="countdown-info-item">
			<div class="countdown-info-label">Your Tokens</div>
			<div class="countdown-info-value">{userHours}h</div>
		</div>
		<div class="countdown-info-item">
			<div class="countdown-info-label">Est. Share</div>
			<div class="countdown-info-value">{estimatedShare}</div>
		</div>
	</div>
</div>

<style>
	.countdown-card {
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 1rem;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
		box-shadow: theme('boxShadow.glow-cyan');
	}

	.countdown-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.countdown-title {
		color: theme('colors.cyan.DEFAULT');
		font-weight: 600;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.countdown-pulse {
		width: 8px;
		height: 8px;
		background: theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			box-shadow: 0 0 10px rgba(0, 255, 209, 0.8);
		}
		50% {
			opacity: 0.5;
			box-shadow: 0 0 5px rgba(0, 255, 209, 0.4);
		}
	}

	.countdown-time {
		text-align: center;
		margin-bottom: 1rem;
	}

	.countdown-number {
		color: theme('colors.gold.DEFAULT');
		font-size: 2.5rem;
		font-weight: 700;
		text-shadow: theme('boxShadow.glow-gold');
	}

	.countdown-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.countdown-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 0.75rem;
	}

	.countdown-info-item {
		text-align: center;
		flex: 1;
	}

	.countdown-info-label {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
		margin-bottom: 0.25rem;
	}

	.countdown-info-value {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: 0.95rem;
	}
</style>
