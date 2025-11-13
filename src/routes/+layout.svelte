<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	// Initialize app
	onMount(() => {
		console.log('🌱 Synchronicity Engine initialized');
	});
</script>

<div class="app-container">
	<div class="frame-wrapper">
		<slot />
	</div>
</div>
