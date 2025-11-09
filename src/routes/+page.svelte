<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Redirect to home (will be dashboard once built)
		goto('/home', { replaceState: true });
	});
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="text-center animate-fade-in">
		<h1 class="text-6xl mb-4">⚡</h1>
		<h2 class="text-3xl text-gold font-bold mb-2" style="text-shadow: 0 0 20px rgba(212, 175, 55, 0.6);">
			Synchronicity Engine
		</h2>
		<p class="text-sage text-lg">Loading...</p>
	</div>
</div>
