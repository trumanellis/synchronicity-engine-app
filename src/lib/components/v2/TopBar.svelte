<script lang="ts">
	export let notificationCount: number = 0;

	function handleNotifications() {
		// TODO: Navigate to notifications page
		console.log('Opening notifications...');
	}
</script>

<div class="top-bar">
	<h1 class="app-title">Synchronicity Engine</h1>
	<div class="brand">
		<img src="/Glowing Eye.png" alt="" class="app-logo" />
	</div>
	<button class="notifications-button" on:click={handleNotifications} aria-label="Notifications">
		<span class="notification-icon">🔔</span>
		{#if notificationCount > 0}
			<span class="badge">{notificationCount}</span>
		{/if}
	</button>
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
	}

	.app-logo {
		height: 32px;
		width: auto;
		object-fit: contain;
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
		animation: pulse-gold var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	.app-title {
		position: absolute;
		left: var(--spacing-2); /* 18px φ-based */
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: theme('colors.gold.DEFAULT');
		margin: 0;
		font-family: theme('fontFamily.exo');
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
		animation: pulse-gold-text var(--duration-0) ease-in-out infinite; /* 3s φ-based */
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

	.notifications-button {
		position: absolute;
		right: var(--spacing-2); /* 18px φ-based */
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--spacing-4); /* 8px φ-based */
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.notification-icon {
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based - smaller */
		filter: grayscale(0.5);
		opacity: 0.6;
		transition: all 0.3s ease;
	}

	.notifications-button:hover .notification-icon {
		filter: grayscale(0);
		opacity: 1;
		transform: scale(1.1);
	}

	.badge {
		position: absolute;
		top: 2px;
		right: 2px;
		background: linear-gradient(135deg, #ff4757, #ff6348);
		color: white;
		font-size: 0.5rem; /* Small */
		font-weight: 700;
		padding: 1px 4px;
		border-radius: 8px;
		min-width: 14px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(255, 71, 87, 0.6);
		animation: pulse-badge var(--duration-1) ease-in-out infinite;
	}

	@keyframes pulse-badge {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>
