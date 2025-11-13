<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher();

	function handleCreate() {
		dispatch('create');
	}

	function handlePostProof() {
		dispatch('postProof');
	}

	function handleClose() {
		dispatch('close');
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<button class="backdrop" on:click={handleClose} aria-label="Close menu"></button>

	<!-- Action Menu -->
	<div class="action-menu">
		<button class="action-item primary" on:click={handleCreate}>
			<span class="action-icon">🙏</span>
			<span class="action-label">Create Intention</span>
		</button>

		<button class="action-item secondary" on:click={handlePostProof}>
			<span class="action-icon">📸</span>
			<span class="action-label">Post Proof</span>
		</button>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(var(--spacing-4)); /* 8px φ-based blur */
		z-index: 998;
		cursor: pointer;
		border: none;
		animation: fade-in 0.2s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.action-menu {
		position: fixed;
		bottom: calc(100vh * var(--small-ratio)); /* Position above the 38.2% section */
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2); /* 18px φ-based */
		z-index: 999;
		animation: slide-up 0.3s ease;
		margin-bottom: var(--spacing-3); /* 12px gap above hero section */
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(var(--spacing-1)); /* 30px φ-based */
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.action-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-2); /* 18px φ-based */
		padding: var(--spacing-2) var(--spacing-1); /* 18px vertical, 30px horizontal φ-based */
		border-radius: 20px;
		border: 2px solid;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		white-space: nowrap;
		min-width: 240px;
	}

	.action-item.primary {
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.15), rgba(0, 255, 209, 0.05));
		border-color: rgba(0, 255, 209, 0.6);
		box-shadow:
			0 4px 20px rgba(0, 255, 209, 0.4),
			inset 0 0 20px rgba(0, 255, 209, 0.1);
	}

	.action-item.primary:hover {
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.25), rgba(0, 255, 209, 0.15));
		border-color: rgba(0, 255, 209, 0.8);
		box-shadow:
			0 6px 30px rgba(0, 255, 209, 0.6),
			inset 0 0 30px rgba(0, 255, 209, 0.2);
		transform: translateY(-2px);
	}

	.action-item.secondary {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
		border-color: rgba(212, 175, 55, 0.6);
		box-shadow:
			0 4px 20px rgba(212, 175, 55, 0.4),
			inset 0 0 20px rgba(212, 175, 55, 0.1);
	}

	.action-item.secondary:hover {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.15));
		border-color: rgba(212, 175, 55, 0.8);
		box-shadow:
			0 6px 30px rgba(212, 175, 55, 0.6),
			inset 0 0 30px rgba(212, 175, 55, 0.2);
		transform: translateY(-2px);
	}

	.action-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		filter: drop-shadow(0 0 var(--spacing-4) currentColor); /* 8px φ-based */
	}

	.action-item.primary .action-icon {
		color: theme('colors.cyan.DEFAULT');
	}

	.action-item.secondary .action-icon {
		color: theme('colors.gold.DEFAULT');
	}

	.action-label {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
	}

	.action-item.primary .action-label {
		color: theme('colors.cyan.DEFAULT');
	}

	.action-item.secondary .action-label {
		color: theme('colors.gold.DEFAULT');
	}
</style>
