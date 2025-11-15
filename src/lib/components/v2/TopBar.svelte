<script lang="ts">
	// No props needed
</script>

<div class="top-bar">
	<img src="/Synchronicity Engine.png" alt="Synchronicity Engine" class="logo-image" />
</div>

<style>
	.top-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 60px; /* Responsive: smaller on mobile */
		background: theme('colors.bg.deep');
		border-bottom: none;
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
			height: 80px; /* Responsive: matches layout padding */
		}
	}

	.logo-image {
		height: 48px; /* Smaller on mobile */
		width: auto;
		object-fit: contain;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		animation: pulse-glow var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	/* Desktop: larger logo */
	@media (min-width: 768px) {
		.logo-image {
			height: 64px;
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		}
		50% {
			filter: drop-shadow(0 0 16px rgba(212, 175, 55, 1));
		}
	}
</style>
