<script lang="ts">
	export let icon: string;
	export let label: string;
	export let onClick: (() => void) | undefined = undefined;
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button class="circular-btn {variant}" on:click={onClick} aria-label={label}>
	<span class="icon">{icon}</span>
	<span class="label">{label}</span>
</button>

<style>
	.circular-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 2px solid;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.circular-btn::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.circular-btn.primary {
		background: linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(0, 255, 209, 0.05));
		border-color: rgba(0, 255, 209, 0.5);
		box-shadow:
			0 4px 20px rgba(0, 255, 209, 0.3),
			inset 0 0 20px rgba(0, 255, 209, 0.1);
		animation: pulse-glow-cyan 3s ease-in-out infinite;
	}

	.circular-btn.primary::before {
		background: radial-gradient(circle, rgba(0, 255, 209, 0.2), transparent);
	}

	.circular-btn.secondary {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
		border-color: rgba(212, 175, 55, 0.5);
		box-shadow:
			0 4px 20px rgba(212, 175, 55, 0.3),
			inset 0 0 20px rgba(212, 175, 55, 0.1);
		animation: pulse-glow-gold 3s ease-in-out infinite;
	}

	.circular-btn.secondary::before {
		background: radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent);
	}

	@keyframes pulse-glow-cyan {
		0%,
		100% {
			box-shadow:
				0 4px 20px rgba(0, 255, 209, 0.3),
				inset 0 0 20px rgba(0, 255, 209, 0.1);
		}
		50% {
			box-shadow:
				0 6px 30px rgba(0, 255, 209, 0.5),
				inset 0 0 30px rgba(0, 255, 209, 0.2);
		}
	}

	@keyframes pulse-glow-gold {
		0%,
		100% {
			box-shadow:
				0 4px 20px rgba(212, 175, 55, 0.3),
				inset 0 0 20px rgba(212, 175, 55, 0.1);
		}
		50% {
			box-shadow:
				0 6px 30px rgba(212, 175, 55, 0.5),
				inset 0 0 30px rgba(212, 175, 55, 0.2);
		}
	}

	.circular-btn:hover::before {
		opacity: 1;
	}

	.circular-btn:hover {
		transform: translateY(-4px) scale(1.05);
	}

	.circular-btn.primary:hover {
		border-color: rgba(0, 255, 209, 0.8);
		box-shadow:
			0 8px 40px rgba(0, 255, 209, 0.5),
			inset 0 0 30px rgba(0, 255, 209, 0.2);
	}

	.circular-btn.secondary:hover {
		border-color: rgba(212, 175, 55, 0.8);
		box-shadow:
			0 8px 40px rgba(212, 175, 55, 0.5),
			inset 0 0 30px rgba(212, 175, 55, 0.2);
	}

	.circular-btn:active {
		transform: translateY(-2px) scale(1.02);
	}

	.icon {
		font-size: 1.75rem;
		filter: drop-shadow(0 0 8px currentColor);
	}

	.circular-btn.primary .icon {
		color: theme('colors.cyan.DEFAULT');
	}

	.circular-btn.secondary .icon {
		color: theme('colors.gold.DEFAULT');
	}

	.label {
		position: absolute;
		bottom: -1.75rem;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}

	.circular-btn.primary .label {
		color: theme('colors.cyan.DEFAULT');
	}

	.circular-btn.secondary .label {
		color: theme('colors.gold.DEFAULT');
	}
</style>
