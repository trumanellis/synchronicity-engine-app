<script lang="ts">
	import type { Intention } from '$types';
	import { goto } from '$app/navigation';

	export let intentions: Intention[];
	export let userRole: Record<string, string> = {};

	function handleIntentionClick(intentionId: string) {
		goto(`/browse/${intentionId}`);
	}

	function formatHours(hours: number): string {
		if (hours >= 1000) {
			return `${(hours / 1000).toFixed(1)}k`;
		}
		return hours.toString();
	}
</script>

<div class="intentions-list">
	{#if intentions.length === 0}
		<div class="empty-state">
			<div class="empty-icon">🎯</div>
			<div class="empty-text">No active intentions yet</div>
		</div>
	{:else}
		<div class="intentions-grid">
			{#each intentions as intention}
				<button
					class="intention-item"
					on:click={() => handleIntentionClick(intention.intentionId)}
				>
					<!-- Header -->
					<div class="intention-header">
						<h3 class="intention-title">{intention.title}</h3>
						<div class="intention-status {intention.status}">
							{intention.status === 'active' ? '✓' : '🏁'}
						</div>
					</div>

					<!-- Description -->
					<p class="intention-description">
						{intention.description.slice(0, 120)}{intention.description.length > 120 ? '...' : ''}
					</p>

					<!-- Category & Location -->
					<div class="intention-meta">
						<div class="meta-item">
							<span class="meta-icon">🏷️</span>
							<span class="meta-text">{intention.category}</span>
						</div>
						<div class="meta-item">
							<span class="meta-icon">📍</span>
							<span class="meta-text">{intention.location.proximity}</span>
						</div>
					</div>

					<!-- Stats -->
					<div class="intention-stats">
						<div class="stat">
							<span class="stat-value">{formatHours(intention.stats.totalAttentionHours)}h</span>
							<span class="stat-label">attention</span>
						</div>
						<div class="stat">
							<span class="stat-value">{intention.stats.participantCount}</span>
							<span class="stat-label">participants</span>
						</div>
						<div class="stat">
							<span class="stat-value">{intention.stats.activeDays}d</span>
							<span class="stat-label">active</span>
						</div>
					</div>

					<!-- User Role (if applicable) -->
					{#if userRole[intention.intentionId]}
						<div class="user-role">
							<span class="role-icon">👤</span>
							<span class="role-text">{userRole[intention.intentionId]}</span>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.intentions-list {
		width: 100%;
	}

	.intentions-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.intention-item {
		background: rgba(0, 255, 209, 0.05);
		border: 2px solid rgba(0, 255, 209, 0.3);
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.intention-item:hover {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 20px theme('colors.cyan.glow');
		transform: translateY(-2px);
	}

	.intention-header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: var(--spacing-4);
	}

	.intention-title {
		color: theme('colors.gold.DEFAULT');
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
		flex: 1;
	}

	.intention-status {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: rgba(0, 255, 209, 0.15);
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.5rem;
		padding: 0.25rem 0.65rem;
		font-size: 0.7rem;
		font-weight: 600;
	}

	.intention-description {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0;
	}

	.intention-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.75rem;
		background: theme('colors.bg.deep');
		border: 1px solid theme('colors.cyan.border');
		border-radius: 1rem;
	}

	.meta-icon {
		font-size: var(--font-size-3);
	}

	.meta-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		font-weight: 500;
		text-transform: capitalize;
	}

	.intention-stats {
		display: flex;
		justify-content: space-around;
		padding: var(--spacing-4);
		background: theme('colors.bg.deep');
		border-radius: var(--spacing-4);
		border: 1px solid theme('colors.cyan.border');
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-1);
		font-weight: 700;
		text-shadow: 0 0 8px rgba(0, 255, 209, 0.4);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3);
		opacity: 0.8;
	}

	.user-role {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--spacing-4);
		background: theme('colors.gold.bg');
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4);
	}

	.role-icon {
		font-size: var(--font-size-1);
	}

	.role-text {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2);
		font-weight: 600;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0);
		background: theme('colors.bg.mid');
		border: 2px dashed theme('colors.gold.border');
		border-radius: var(--spacing-3);
	}

	.empty-icon {
		font-size: 4rem;
		filter: grayscale(0.5);
		opacity: 0.5;
	}

	.empty-text {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-1);
		opacity: 0.7;
	}
</style>
