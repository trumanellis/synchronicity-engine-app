<script lang="ts">
	import type { ProofOfService } from '$types';
	import ProofPreviewCard from './ProofPreviewCard.svelte';

	export let proofs: ProofOfService[];
	export let filterUserId: string | null = null;
	export let onProofClick: ((proof: ProofOfService) => void) | undefined = undefined;

	type StatusFilter = 'all' | 'pending' | 'approved' | 'token_created';
	let activeFilter: StatusFilter = 'all';

	$: filteredProofs = proofs
		.filter((proof) => {
			if (filterUserId && proof.userId !== filterUserId) return false;
			if (activeFilter === 'all') return true;
			return proof.status === activeFilter;
		})
		.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

	function handleFilterChange(filter: StatusFilter) {
		activeFilter = filter;
	}

	function getFilterCount(filter: StatusFilter): number {
		return proofs.filter((proof) => {
			if (filterUserId && proof.userId !== filterUserId) return false;
			if (filter === 'all') return true;
			return proof.status === filter;
		}).length;
	}
</script>

<div class="proof-gallery">
	<!-- Filter Tabs -->
	<div class="filter-tabs">
		<button
			class="filter-tab"
			class:active={activeFilter === 'all'}
			on:click={() => handleFilterChange('all')}
		>
			All
			<span class="filter-count">{getFilterCount('all')}</span>
		</button>
		<button
			class="filter-tab"
			class:active={activeFilter === 'pending'}
			on:click={() => handleFilterChange('pending')}
		>
			Pending
			<span class="filter-count">{getFilterCount('pending')}</span>
		</button>
		<button
			class="filter-tab"
			class:active={activeFilter === 'approved'}
			on:click={() => handleFilterChange('approved')}
		>
			Approved
			<span class="filter-count">{getFilterCount('approved')}</span>
		</button>
		<button
			class="filter-tab"
			class:active={activeFilter === 'token_created'}
			on:click={() => handleFilterChange('token_created')}
		>
			Tokens
			<span class="filter-count">{getFilterCount('token_created')}</span>
		</button>
	</div>

	<!-- Proofs Grid -->
	{#if filteredProofs.length > 0}
		<div class="grid-3-cols">
			{#each filteredProofs as proof (proof.proofId)}
				<ProofPreviewCard
					{proof}
					onClick={onProofClick ? () => onProofClick(proof) : undefined}
				/>
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<div class="empty-icon">📋</div>
			<div class="empty-text">No proofs found</div>
			<div class="empty-hint">
				{#if activeFilter !== 'all'}
					Try selecting a different filter
				{:else}
					Submit your first proof of service to get started
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.proof-gallery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2); /* 18px φ-based */
	}

	.filter-tabs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
	}

	.filter-tab {
		background: transparent;
		border: 1px solid theme('colors.cyan.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}

	.filter-tab:hover {
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.filter-tab.active {
		background: theme('colors.cyan.bg');
		border-color: theme('colors.cyan.DEFAULT');
		color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 15px theme('colors.cyan.glow');
	}

	.filter-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		padding: 0 4px;
		background: rgba(0, 255, 209, 0.2);
		border-radius: 10px;
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 700;
	}

	.filter-tab.active .filter-count {
		background: theme('colors.cyan.DEFAULT');
		color: #000000;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-0); /* 48px φ-based */
		text-align: center;
	}

	.empty-icon {
		font-size: 4rem;
		opacity: 0.3;
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.empty-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.empty-hint {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		.filter-tabs {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
