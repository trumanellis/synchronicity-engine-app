<script lang="ts">
	import type { ItineraryItem, VisibilityLevel } from '$types';
	import VisibilitySelector from './VisibilitySelector.svelte';

	export let items: ItineraryItem[];
	export let canEdit: boolean = false;

	function handleItemVisibilityChange(itemId: string, newVisibility: VisibilityLevel) {
		console.log(`Changing visibility for item ${itemId} to ${newVisibility}`);
		// TODO: Implement API call to update item visibility
		alert(`Visibility changed to ${newVisibility} (API integration coming soon)`);
	}

	// Format date for display (e.g., "Nov 15")
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${monthNames[date.getMonth()]} ${date.getDate()}`;
	}

	// Format day of week for events (e.g., "FRI")
	function formatDayOfWeek(dateString: string): string {
		const date = new Date(dateString);
		const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
		return days[date.getDay()];
	}

	// Get date number for events (e.g., "17")
	function getDateNumber(dateString: string): string {
		const date = new Date(dateString);
		return date.getDate().toString();
	}
</script>

<div class="itinerary">
	<!-- Header -->
	<div class="itinerary-header">
		<div class="itinerary-title">
			<span class="icon">📍</span>
			<span>Where I'll Be</span>
		</div>
	</div>

	<!-- Items List -->
	{#if items && items.length > 0}
		<div class="itinerary-list">
			{#each items as item (item.id)}
				<div
					class="itinerary-card"
					class:itinerary-location={item.type === 'trip'}
					class:itinerary-event={item.type === 'event'}
				>
					<div class="date-badge">
						{#if item.type === 'trip'}
							<!-- Date range for locations/trips -->
							<span class="date-text">{formatDate(item.startDate)}</span>
							<span class="date-separator">→</span>
							<span class="date-text" class:open-ended={!item.endDate}>
								{item.endDate ? formatDate(item.endDate) : '?'}
							</span>
						{:else}
							<!-- Single day for events -->
							<span class="day-text">{formatDayOfWeek(item.startDate)}</span>
							<span class="date-number">{getDateNumber(item.startDate)}</span>
						{/if}
					</div>

					<div class="item-content">
						<div class="item-header">
							<h4 class="item-title">
								{#if item.locationIcon}
									<span class="title-icon">{item.locationIcon}</span>
								{/if}
								{item.title || item.location}
							</h4>
							{#if canEdit}
								<VisibilitySelector
									visibility={item.visibility}
									onChange={(newVisibility) => handleItemVisibilityChange(item.id, newVisibility)}
									compact={true}
								/>
							{/if}
						</div>
						{#if item.title && item.location}
							<p class="item-location">{item.location}</p>
						{/if}
						{#if item.description}
							<p class="item-description">{item.description}</p>
						{/if}
						{#if item.time}
							<p class="item-time">🕐 {item.time}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="itinerary-empty">
			<div class="empty-icon">📍</div>
			<p class="empty-text">Where will you be?</p>
			{#if canEdit}
				<button class="add-button" on:click={() => alert('Add itinerary item feature coming soon')}>
					Add Location or Event
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.itinerary {
		width: 100%;
		font-family: 'Exo', sans-serif;
	}

	/* Header */
	.itinerary-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.itinerary-title {
		color: #00FFD1;
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.icon {
		font-size: 1rem;
	}

	/* List */
	.itinerary-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Cards */
	.itinerary-card {
		background: rgba(0, 0, 0, 0.3);
		border-left: 4px solid #00FFD1;
		border-radius: 0.75rem;
		padding: 1rem;
		display: flex;
		gap: 1rem;
		transition: all 0.3s ease;
	}

	.itinerary-card:hover {
		background: rgba(0, 255, 209, 0.05);
		transform: translateX(4px);
	}

	/* Location/trip entries get gold styling */
	.itinerary-card.itinerary-location {
		border-left-color: #D4AF37;
	}

	.itinerary-card.itinerary-location:hover {
		background: rgba(212, 175, 55, 0.05);
	}

	/* Date Badge */
	.date-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 70px;
		background: rgba(0, 255, 209, 0.15);
		border: 2px solid rgba(0, 255, 209, 0.4);
		border-radius: 0.75rem;
		padding: 0.5rem;
		flex-shrink: 0;
	}

	/* Location badges get gold styling */
	.itinerary-location .date-badge {
		background: rgba(212, 175, 55, 0.15);
		border-color: rgba(212, 175, 55, 0.4);
	}

	.date-text {
		color: #00FFD1;
		font-size: 0.75rem;
		font-weight: 700;
		text-align: center;
		line-height: 1.2;
	}

	.itinerary-location .date-text {
		color: #D4AF37;
		font-size: 0.7rem;
	}

	.date-separator {
		color: #84A98C;
		font-size: 0.9rem;
		margin: 0.25rem 0;
	}

	.date-text.open-ended {
		color: #84A98C;
		font-size: 1.5rem;
		line-height: 1;
	}

	/* Event date styling */
	.day-text {
		color: #00FFD1;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.date-number {
		color: #D4AF37;
		font-size: 1.1rem;
		font-weight: 700;
		margin-top: 0.25rem;
	}

	/* Content */
	.item-content {
		flex: 1;
		min-width: 0;
	}

	.item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.item-title {
		color: #F7F3E9;
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
	}

	.title-icon {
		font-size: 1.2rem;
	}

	.item-location {
		color: #00FFD1;
		font-size: 0.85rem;
		margin: 0 0 0.35rem 0;
	}

	.item-description {
		color: #84A98C;
		font-size: 0.8rem;
		line-height: 1.4;
		margin: 0;
	}

	.item-time {
		color: #D4AF37;
		font-size: 0.75rem;
		margin: 0.35rem 0 0 0;
		font-weight: 600;
	}

	/* Empty State */
	.itinerary-empty {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: 1rem;
		padding: 2rem 1rem;
		text-align: center;
	}

	.empty-icon {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		opacity: 0.5;
	}

	.empty-text {
		color: #84A98C;
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
	}

	.add-button {
		background: rgba(0, 255, 209, 0.9);
		color: #0a0e0f;
		border: none;
		border-radius: 0.75rem;
		padding: 0.75rem 1.5rem;
		font-family: 'Exo', sans-serif;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.4);
	}

	.add-button:hover {
		background: #00FFD1;
		box-shadow: 0 0 30px rgba(0, 255, 209, 0.6);
		transform: translateY(-2px);
	}

	.add-button:active {
		transform: translateY(0);
	}

	/* Responsive */
	@media (max-width: 480px) {
		.date-badge {
			min-width: 60px;
			padding: 0.4rem;
		}

		.date-text {
			font-size: 0.65rem;
		}

		.item-title {
			font-size: 0.95rem;
		}
	}
</style>
