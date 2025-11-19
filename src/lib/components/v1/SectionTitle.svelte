<script lang="ts">
	/**
	 * SectionTitle v1 - Rebuilt to use centralized section-title class
	 * Now consistent with all other section titles (centered, bigger)
	 */
	export let icon: string;
	export let title: string;
</script>

<div class="section-title">
	<span>{icon}</span>
	<span>{title}</span>
</div>

<!-- No local styles needed - uses centralized .section-title from app.css -->
