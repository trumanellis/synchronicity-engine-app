<script lang="ts">
	import { formatTimeAgo } from '$data/mockData';
	import type { Activity } from '$types';

	export let activity: Activity;
	export let onClick: (() => void) | undefined = undefined;

	$: timeAgo = formatTimeAgo(activity.timestamp);
</script>

<div class="activity-item" role="button" tabindex="0" on:click={onClick} on:keypress={onClick}>
	<div class="activity-header">
		<span class="activity-icon">{activity.icon}</span>
		<span class="activity-user">{activity.userName || 'Community'}</span>
		<span class="activity-time">{timeAgo}</span>
	</div>
	<div class="activity-text">{activity.text}</div>
	{#if activity.meta}
		<div class="activity-meta">{activity.meta}</div>
	{/if}
</div>

<style>
	.activity-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.activity-icon {
		color: theme('colors.cyan.DEFAULT');
		font-size: 1rem;
	}

	.activity-user {
		color: theme('colors.cream.DEFAULT');
		font-weight: 500;
		font-size: 0.85rem;
	}

	.activity-time {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
		margin-left: auto;
	}

	.activity-text {
		color: theme('colors.cream.DEFAULT');
		font-size: 0.8rem;
		line-height: 1.5;
	}

	.activity-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: 0.7rem;
		margin-top: 0.5rem;
	}
</style>
