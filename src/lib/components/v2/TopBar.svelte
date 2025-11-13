<script lang="ts">
	// No props needed anymore
</script>

<div class="top-bar">
	<div class="brand">
		<span class="app-title left">Synchronicity</span>
		<img src="/Glowing Eye.png" alt="" class="app-logo" />
		<span class="app-title right">Engine</span>
	</div>
</div>

<style>
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 48px; /* Narrow bar */
		background: #000000;
		border-bottom: 1px solid rgba(212, 175, 55, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 var(--spacing-2); /* 18px φ-based */
		z-index: 1000;
	}

	/* Desktop: account for sidebar */
	@media (min-width: 768px) {
		.top-bar {
			left: 5rem;
		}
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based gap between elements */
	}

	.app-logo {
		height: 24px; /* Smaller on mobile */
		width: auto;
		object-fit: contain;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		animation: pulse-gold var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	/* Desktop: larger logo */
	@media (min-width: 768px) {
		.app-logo {
			height: 32px;
		}
	}

	.app-title {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based - smaller on mobile */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: theme('colors.gold.DEFAULT');
		margin: 0;
		font-family: theme('fontFamily.exo');
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		animation: pulse-gold-text var(--duration-0) ease-in-out infinite; /* 3s φ-based */
		white-space: nowrap;
	}

	/* Desktop: larger text */
	@media (min-width: 768px) {
		.app-title {
			font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
			letter-spacing: 1px;
		}
	}

	@keyframes pulse-gold {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		}
		50% {
			filter: drop-shadow(0 0 16px rgba(212, 175, 55, 1));
		}
	}

	@keyframes pulse-gold-text {
		0%,
		100% {
			text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		}
		50% {
			text-shadow: 0 0 20px rgba(212, 175, 55, 1);
		}
	}

</style>
