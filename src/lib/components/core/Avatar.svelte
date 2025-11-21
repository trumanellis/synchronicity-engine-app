<script lang="ts">
	/**
	 * Avatar Component
	 * Displays user avatar with circular frame.
	 * Falls back to initials on black background if image fails to load or is emoji.
	 */
	export let avatar: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';
	export let alt: string = name || 'User avatar';

	let imageError = false;
	let isEmoji = false;

	// Check if avatar is an emoji (single character or emoji pattern)
	$: if (avatar) {
		// Check if it's likely an emoji (1-2 characters, no slash, or contains emoji regex)
		const emojiPattern = /^[\p{Emoji}\u200d]+$/u;
		isEmoji = avatar.length <= 2 || emojiPattern.test(avatar);
	}

	// Generate initials from name
	function getInitials(name: string | undefined): string {
		if (!name) return '?';
		const parts = name.trim().split(' ');
		if (parts.length === 1) {
			return parts[0].substring(0, 2).toUpperCase();
		}
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}

	// Size mappings
	const sizeClasses = {
		small: 'avatar-small',
		medium: 'avatar-medium',
		large: 'avatar-large',
		xlarge: 'avatar-xlarge'
	};

	const fontSizes = {
		small: 'text-xs',
		medium: 'text-sm',
		large: 'text-lg',
		xlarge: 'text-2xl'
	};

	$: shouldShowImage = avatar && !isEmoji && !imageError && avatar.startsWith('/');
	$: shouldShowEmoji = avatar && isEmoji;
	$: shouldShowInitials = !shouldShowImage && !shouldShowEmoji;
</script>

<div class="avatar {sizeClasses[size]}" role="img" aria-label={alt}>
	{#if shouldShowImage}
		<img
			src={avatar}
			{alt}
			class="avatar-image"
			on:error={() => (imageError = true)}
		/>
	{:else if shouldShowEmoji}
		<div class="avatar-emoji">{avatar}</div>
	{:else}
		<div class="avatar-initials {fontSizes[size]}">
			{getInitials(name)}
		</div>
	{/if}
</div>

<style>
	.avatar {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
		background: #000000;
		border: 2px solid rgba(212, 175, 55, 0.3);
		transition: all 0.2s ease;
	}

	.avatar:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
	}

	/* Size variants */
	.avatar-small {
		width: 32px;
		height: 32px;
	}

	.avatar-medium {
		width: 40px;
		height: 40px;
	}

	.avatar-large {
		width: 56px;
		height: 56px;
	}

	.avatar-xlarge {
		width: 80px;
		height: 80px;
	}

	/* Image styling */
	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Emoji styling */
	.avatar-emoji {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 1.5em;
		line-height: 1;
	}

	.avatar-small .avatar-emoji {
		font-size: 1.2em;
	}

	.avatar-large .avatar-emoji {
		font-size: 1.8em;
	}

	.avatar-xlarge .avatar-emoji {
		font-size: 2.5em;
	}

	/* Initials styling */
	.avatar-initials {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #ffffff;
		font-weight: 700;
		font-family: theme('fontFamily.exo');
		user-select: none;
		letter-spacing: 0.05em;
	}

	/* Font size classes */
	.text-xs {
		font-size: 0.65rem;
	}

	.text-sm {
		font-size: 0.75rem;
	}

	.text-lg {
		font-size: 1rem;
	}

	.text-2xl {
		font-size: 1.5rem;
	}
</style>
