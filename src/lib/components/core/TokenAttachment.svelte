<script lang="ts">
	import { tokens } from '$stores/tokensStore';

	export let selectedTokenId: string | null = null;
	export let onSelect: ((tokenId: string | null) => void) | undefined = undefined;

	$: availableTokens = $tokens.filter((t) => t.status === 'available');

	function handleSelect(tokenId: string | null) {
		selectedTokenId = tokenId;
		if (onSelect) onSelect(tokenId);
	}

	function handleToggle() {
		if (selectedTokenId) {
			handleSelect(null);
		}
	}
</script>

<div class="token-attachment">
	<div class="attachment-header">
		<label class="attachment-label">Attach Token (Optional)</label>
		{#if selectedTokenId}
			<button type="button" class="clear-button" on:click={handleToggle}>Clear</button>
		{/if}
	</div>

	<p class="attachment-hint">
		Attach an existing token to add more context or connect related work
	</p>

	{#if !selectedTokenId}
		<div class="token-list">
			{#if availableTokens.length > 0}
				{#each availableTokens as token}
					<button
						type="button"
						class="token-option"
						on:click={() => handleSelect(token.tokenId)}
					>
						<div class="token-info">
							<div class="token-title">{token.title}</div>
							<div class="token-meta">{token.computed.hours}h • Available</div>
						</div>
						<div class="select-icon">+</div>
					</button>
				{/each}
			{:else}
				<div class="no-tokens">
					<span class="no-tokens-icon">💎</span>
					<span class="no-tokens-text">No available tokens to attach</span>
				</div>
			{/if}
		</div>
	{:else}
		{@const selectedToken = $tokens.find((t) => t.tokenId === selectedTokenId)}
		{#if selectedToken}
			<div class="selected-token">
				<div class="selected-icon">✓</div>
				<div class="selected-info">
					<div class="selected-title">{selectedToken.title}</div>
					<div class="selected-meta">{selectedToken.computed.hours}h • Attached</div>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.token-attachment {
		margin-bottom: 1.25rem;
	}

	.attachment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.attachment-label {
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.clear-button {
		background: none;
		border: none;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
		text-decoration: underline;
		transition: color 0.2s ease;
	}

	.clear-button:hover {
		color: theme('colors.cyan.DEFAULT');
	}

	.attachment-hint {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.5;
		margin-bottom: 0.75rem;
	}

	.token-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 200px;
		overflow-y: auto;
	}

	.token-option {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
		padding: 0.75rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.token-option:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.token-info {
		flex: 1;
	}

	.token-title {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.85rem;
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.token-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
	}

	.select-icon {
		color: theme('colors.cyan.DEFAULT');
		font-size: 1.5rem;
		line-height: 1;
	}

	.no-tokens {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 2rem 1rem;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid theme('colors.cyan.border');
		border-radius: 0.5rem;
	}

	.no-tokens-icon {
		font-size: 2rem;
		opacity: 0.5;
	}

	.no-tokens-text {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.8rem;
	}

	.selected-token {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: theme('colors.cyan.bg');
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 0.75rem;
		padding: 1rem;
		box-shadow: 0 0 20px theme('colors.cyan.glow');
	}

	.selected-icon {
		width: 40px;
		height: 40px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.selected-info {
		flex: 1;
	}

	.selected-title {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.9rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.selected-meta {
		color: theme('colors.cyan.DEFAULT');
		font-size: 0.75rem;
		font-weight: 500;
	}
</style>
