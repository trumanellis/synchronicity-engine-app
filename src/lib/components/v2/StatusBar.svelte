<script lang="ts">
	import { goto } from '$app/navigation';

	export let notificationCount: number = 0;
	export let templeIcon: string = '🛕';

	function handleNotifications() {
		// TODO: Navigate to notifications page when built
		console.log('Opening notifications...');
	}

	function handleSettings() {
		goto('/profile');
	}
</script>

<div class="status-bar">
	<button class="notification-btn" on:click={handleNotifications} aria-label="Notifications">
		<span class="icon">🔔</span>
		{#if notificationCount > 0}
			<span class="badge">{notificationCount}</span>
		{/if}
	</button>

	<div class="temple-icon">{templeIcon}</div>

	<button class="settings-btn" on:click={handleSettings} aria-label="Settings">
		<span class="icon">⚙️</span>
	</button>
</div>

<style>
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		gap: 1rem;
	}

	.notification-btn,
	.settings-btn {
		position: relative;
		background: rgba(0, 255, 209, 0.05);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: 12px;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1.25rem;
	}

	.notification-btn:hover,
	.settings-btn:hover {
		background: rgba(0, 255, 209, 0.1);
		border-color: rgba(0, 255, 209, 0.4);
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.3);
		transform: translateY(-2px);
	}

	.notification-btn {
		position: relative;
	}

	.badge {
		position: absolute;
		top: -4px;
		right: -4px;
		background: linear-gradient(135deg, #ff4757, #ff6348);
		color: white;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 2px 6px;
		border-radius: 10px;
		min-width: 18px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(255, 71, 87, 0.6);
		animation: pulse-badge 2s ease-in-out infinite;
	}

	@keyframes pulse-badge {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 2px 8px rgba(255, 71, 87, 0.6);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 4px 12px rgba(255, 71, 87, 0.9);
		}
	}

	.temple-icon {
		font-size: 2rem;
		filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.icon {
		display: block;
	}
</style>
