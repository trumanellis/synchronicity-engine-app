<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Intention, ChatMessage, Token } from '$types';
	import { groupChats, userTokens } from '$data/mockData';

	export let intention: Intention | null = null;
	export let onClick: (() => void) | undefined = undefined;

	let elapsedSeconds = 0;
	let intervalId: number | null = null;

	$: formattedTime = formatTime(elapsedSeconds);
	$: recentMessage = getRecentMessage(intention?.intentionId);
	$: intentionTokens = getIntentionTokens(intention?.intentionId).sort(
		(a, b) => b.computed.hours - a.computed.hours
	);
	$: totalTokenHours = intentionTokens.reduce((sum, token) => sum + token.computed.hours, 0);

	function getCategoryEmoji(category: string): string {
		const map: Record<string, string> = {
			'Organic Food & Nutrition': '🌱',
			'Land Stewardship': '🌳',
			'Off-Grid & Sustainable Living': '☀️',
			'Health & Vitality': '💪',
			'Community Abundance': '🤝',
			'Self & Spiritual Development': '🧘',
			'Creative Expression': '🎨'
		};
		return map[category] || '✨';
	}

	function formatTime(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	function getRecentMessage(intentionId: string | undefined): ChatMessage | null {
		if (!intentionId) return null;
		const chat = groupChats.find((c) => c.intentionId === intentionId);
		if (!chat || chat.messages.length === 0) return null;
		return chat.messages[chat.messages.length - 1];
	}

	function getIntentionTokens(intentionId: string | undefined): Token[] {
		if (!intentionId) return [];
		return userTokens.filter((t) => t.intentionId === intentionId);
	}

	function getTokenEmoji(token: Token): string {
		// Return emoji based on service type from title/description
		const title = token.title.toLowerCase();
		if (title.includes('timber') || title.includes('shed') || title.includes('build')) return '🔨';
		if (title.includes('irrigation') || title.includes('water')) return '💧';
		if (title.includes('plant') || title.includes('seed')) return '🌱';
		if (title.includes('compost')) return '🪴';
		if (title.includes('fence') || title.includes('fencing')) return '🪵';
		if (title.includes('harvest')) return '🌾';
		if (title.includes('design') || title.includes('plan')) return '📐';
		if (title.includes('teach') || title.includes('workshop')) return '📚';
		return '✨'; // fallback
	}

	function getTokenSize(hours: number): string {
		// Linear scale from 8px (min) to 32px (max)
		const minSize = 8;
		const maxSize = 32;
		const maxHours = 20; // Cap at 20 hours for scaling

		const clampedHours = Math.min(hours, maxHours);
		const size = minSize + (clampedHours / maxHours) * (maxSize - minSize);

		return `${Math.round(size)}px`;
	}

	onMount(() => {
		// Start the timer
		intervalId = window.setInterval(() => {
			elapsedSeconds++;
		}, 1000);
	});

	onDestroy(() => {
		// Clean up the interval
		if (intervalId !== null) {
			clearInterval(intervalId);
		}
	});
</script>

{#if intention}
	<button class="hero-card" on:click={onClick}>
		<div class="hero-header">
			<div class="title-section">
				<span class="category-emoji">{getCategoryEmoji(intention.category)}</span>
				<span class="title">{intention.title}</span>
			</div>
			<div class="top-right-info">
				<span class="active-label">Active Intention</span>
				<span class="timer">{formattedTime}</span>
			</div>
		</div>

		<p class="description">
			{intention.description}
		</p>

		<div class="bottom-section">
			<div class="chat-preview">
				{#if recentMessage}
					<div class="chat-header">
						<span class="chat-avatar">{recentMessage.avatar}</span>
						<span class="chat-user">{recentMessage.userName}</span>
					</div>
					<p class="chat-text">{recentMessage.text}</p>
				{:else}
					<p class="chat-empty">No messages yet</p>
				{/if}
			</div>

			<div class="tokens-field">
				<span class="tokens-label">Tokens: {totalTokenHours}h</span>
				<div class="tokens-container">
					{#each intentionTokens as token}
						<span
							class="token-emoji"
							style="font-size: {getTokenSize(token.computed.hours)}"
							title="{token.title} ({token.computed.hours}h)"
						>
							{getTokenEmoji(token)}
						</span>
					{/each}
					{#if intentionTokens.length === 0}
						<span class="tokens-empty">None</span>
					{/if}
				</div>
			</div>
		</div>
	</button>
{:else}
	<div class="hero-card empty">
		<div class="empty-state">
			<span class="empty-icon">🌟</span>
			<p class="empty-text">No active intention yet</p>
			<p class="empty-hint">Join an intention to get started</p>
		</div>
	</div>
{/if}

<style>
	.hero-card {
		width: 100%;
		background: #000000; /* Solid black background */
		border: 2px solid rgba(212, 175, 55, 0.6); /* Gold border */
		border-radius: 24px;
		padding: var(--spacing-2); /* 18px φ-based */
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		position: relative;
		overflow: hidden;
		animation: glow-pulse var(--duration-0) ease-in-out infinite; /* 3s φ-based */
	}

	.hero-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(
			circle,
			rgba(212, 175, 55, 0.15) 0%,
			transparent 70%
		);
		animation: rotate-gradient 8s linear infinite;
		pointer-events: none;
	}

	@keyframes glow-pulse {
		0%,
		100% {
			box-shadow:
				inset 0 0 30px rgba(212, 175, 55, 0.3),
				inset 0 0 60px rgba(212, 175, 55, 0.15);
		}
		50% {
			box-shadow:
				inset 0 0 40px rgba(212, 175, 55, 0.5),
				inset 0 0 80px rgba(212, 175, 55, 0.25);
		}
	}

	@keyframes rotate-gradient {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.hero-card:hover {
		border-color: rgba(212, 175, 55, 0.9);
		transform: translateY(-4px);
		box-shadow:
			inset 0 0 50px rgba(212, 175, 55, 0.6),
			inset 0 0 100px rgba(212, 175, 55, 0.3);
	}

	.hero-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3);
		position: relative;
		z-index: 1;
	}

	.title-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-3); /* 12px φ-based */
		flex: 1;
		min-width: 0; /* Allow text truncation */
	}

	.top-right-info {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 2px;
		flex-shrink: 0;
	}

	.active-label {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: theme('colors.gold.DEFAULT');
		opacity: 0.7;
	}

	.category-emoji {
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
	}

	.title {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 600;
		color: theme('colors.cyan.DEFAULT');
		flex: 1;
		line-height: 1.3;
	}

	.timer {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-family: monospace;
		letter-spacing: 0.5px;
		opacity: 0.8;
	}

	.description {
		color: theme('colors.cream.DEFAULT');
		opacity: 0.85;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.4;
		margin-bottom: var(--spacing-3); /* 12px φ-based */
		position: relative;
		z-index: 1;
		/* 3-line clamp for description */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.bottom-section {
		display: flex;
		gap: var(--spacing-3); /* 12px φ-based */
		position: relative;
		z-index: 1;
	}

	.chat-preview {
		flex: 1;
		min-width: 0;
	}

	.chat-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: 4px;
	}

	.chat-avatar {
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.chat-user {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		color: theme('colors.cyan.DEFAULT');
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.chat-text {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		color: theme('colors.cream.DEFAULT');
		opacity: 0.7;
		line-height: 1.3;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chat-empty {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		color: theme('colors.cream.DEFAULT');
		opacity: 0.5;
		font-style: italic;
		margin: 0;
	}

	.tokens-field {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
		flex-shrink: 0;
	}

	.tokens-label {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: theme('colors.gold.DEFAULT');
		opacity: 0.7;
	}

	.tokens-container {
		display: flex;
		gap: 4px;
		align-items: center;
		flex-wrap: wrap;
		justify-content: flex-end;
		max-width: 120px;
	}

	.token-emoji {
		filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.6));
		transition: transform 0.2s ease;
	}

	.token-emoji:hover {
		transform: scale(1.2);
	}

	.tokens-empty {
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		color: theme('colors.cream.DEFAULT');
		opacity: 0.5;
		font-style: italic;
	}

	.hero-card.empty {
		background: rgba(0, 0, 0, 0.2);
		border: 2px dashed rgba(0, 255, 209, 0.2);
		cursor: default;
		animation: none;
	}

	.hero-card.empty::before {
		display: none;
	}

	.empty-state {
		text-align: center;
		padding: 2rem 1rem;
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 0.75rem;
		opacity: 0.3;
	}

	.empty-text {
		color: theme('colors.cyan.DEFAULT');
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.empty-hint {
		color: theme('colors.cream.DEFAULT');
		opacity: 0.5;
		font-size: 0.85rem;
	}
</style>
