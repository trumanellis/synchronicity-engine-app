<script lang="ts">
	/**
	 * Browse Detail Page - V2 Design
	 * Layout (TopBar, ActiveIntentionHero, BottomNav) provided by (app)/+layout.svelte
	 */
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		getIntentionById,
		getProofsByIntention,
		currentUser,
		getIntentionAttentionSummary
	} from '$data/mockData';
	import type { Intention, ViewMode, ProofOfService, IntentionAttentionSummary } from '$types';

	// Components
	import SectionTitle from '$components/core/SectionTitle.svelte';
	import ActionButton from '$components/core/ActionButton.svelte';
	import ActivityItem from '$components/core/ActivityItem.svelte';
	import ProofGallery from '$lib/components/v2/ProofGallery.svelte';
	import AttentionSpiral from '$lib/components/v2/AttentionSpiral.svelte';

	let currentView: ViewMode = 'discovery';
	let intention: Intention | undefined;
	let allProofs: ProofOfService[] = [];
	let userProofs: ProofOfService[] = [];
	let attentionSummary: IntentionAttentionSummary | undefined;
	let activeActionTab: 'chat' | 'artifacts' | 'assistant' = 'chat';
	let aiInput = '';
	let aiMessages: Array<{ role: 'user' | 'assistant'; text: string }> = [];
	let showRadialMenu = false;

	onMount(() => {
		const intentionId = $page.params.id;
		if (intentionId) {
			intention = getIntentionById(intentionId);
			if (intention) {
				allProofs = getProofsByIntention(intentionId);
				userProofs = allProofs.filter((p) => p.userId === currentUser.userId);
				attentionSummary = getIntentionAttentionSummary(intentionId);
			}
		}
	});

	function formatDuration(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
		}
		return `${mins}m`;
	}

	function formatTimestamp(timestamp: string): string {
		const date = new Date(timestamp);
		return date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	}

	function switchView(view: ViewMode) {
		currentView = view;
	}

	function handleSubmitProof() {
		if (intention) {
			goto(`/browse/${intention.intentionId}/submit-proof`);
		}
	}

	function switchActionTab(tab: 'chat' | 'artifacts' | 'assistant') {
		activeActionTab = tab;
	}

	function sendAiMessage() {
		if (aiInput.trim()) {
			aiMessages = [...aiMessages, { role: 'user', text: aiInput }];
			const userQuestion = aiInput;
			aiInput = '';

			// Simulate AI response
			setTimeout(() => {
				aiMessages = [
					...aiMessages,
					{
						role: 'assistant',
						text: `I can help you with "${userQuestion}". This intention focuses on ${intention?.title}. Would you like me to suggest ways to contribute or provide more information about the community's progress?`
					}
				];
			}, 500);
		}
	}

	function toggleRadialMenu() {
		showRadialMenu = !showRadialMenu;
	}

	function handleRadialOption(option: string) {
		showRadialMenu = false;
		switch (option) {
			case 'proof':
				handleSubmitProof();
				break;
			case 'artifact':
				alert('Upload artifact coming soon!');
				break;
			case 'voice':
				alert('Voice memo recording coming soon!');
				break;
			case 'media':
				alert('Media upload coming soon!');
				break;
			case 'blessing':
				alert('Send blessing coming soon!');
				break;
		}
	}

	// Mock chat messages
	const mockChatMessages = [
		{
			userId: 'user-1',
			userName: 'Marcus',
			avatar: '👨🏾‍🌾',
			text: "Just finished clearing the eastern section. The new growth is looking good!",
			timestamp: new Date(Date.now() - 3600000).toISOString()
		},
		{
			userId: 'user-2',
			userName: 'Sarah',
			avatar: '🧑🏻‍🌾',
			text: "Amazing work! I'll be out there tomorrow with tools for the western ridge.",
			timestamp: new Date(Date.now() - 3000000).toISOString()
		},
		{
			userId: 'user-3',
			userName: 'Aisha',
			avatar: '👩🏾‍🌾',
			text: "Who's coordinating the burn schedule? Want to make sure we're all aligned.",
			timestamp: new Date(Date.now() - 1800000).toISOString()
		},
		{
			userId: 'user-4',
			userName: 'James',
			avatar: '👨🏽‍🌾',
			text: "I have the permits. Planning for next Tuesday if weather holds.",
			timestamp: new Date(Date.now() - 1200000).toISOString()
		}
	];

	// Mock artifacts
	const mockArtifacts = [
		{
			id: 'doc-1',
			title: 'Site Assessment Report',
			type: 'PDF',
			size: '2.4 MB',
			uploadedBy: 'Marcus',
			uploadedAt: 'Nov 15, 2024',
			icon: '📄'
		},
		{
			id: 'doc-2',
			title: 'Native Species Guide',
			type: 'PDF',
			size: '1.8 MB',
			uploadedBy: 'Aisha',
			uploadedAt: 'Nov 12, 2024',
			icon: '📗'
		},
		{
			id: 'doc-3',
			title: 'Burn Schedule & Safety',
			type: 'DOC',
			size: '456 KB',
			uploadedBy: 'James',
			uploadedAt: 'Nov 10, 2024',
			icon: '📋'
		},
		{
			id: 'doc-4',
			title: 'Progress Photos - Week 8',
			type: 'ZIP',
			size: '12.3 MB',
			uploadedBy: 'Sarah',
			uploadedAt: 'Nov 8, 2024',
			icon: '📸'
		},
		{
			id: 'doc-5',
			title: 'Equipment Checklist',
			type: 'XLS',
			size: '128 KB',
			uploadedBy: 'Miguel',
			uploadedAt: 'Nov 5, 2024',
			icon: '📊'
		}
	];
</script>

<svelte:head>
	<title>{intention?.title || 'Intention'} - Synchronicity Engine</title>
</svelte:head>

{#if intention}
	{#if currentView === 'discovery'}
		<!-- Discovery View -->
		<h1 class="intention-title">{intention.title}</h1>
		<p class="intention-subtitle">{intention.description}</p>

		<!-- Collective Attention Spiral -->
		{#if attentionSummary && attentionSummary.userSummaries.length > 0}
			<AttentionSpiral {attentionSummary} />
		{/if}

		<SectionTitle icon="📋" title="Overview" />

		<div class="content-box mb-4">
			<p class="content-text">{intention.description}</p>
		</div>

		<!-- Action Tabs -->
		<div class="action-tabs-container">
			<div class="action-tabs-nav">
				<button
					class="action-tab-button"
					class:active={activeActionTab === 'chat'}
					on:click={() => switchActionTab('chat')}
				>
					<span>💬</span>
					<span>Chat</span>
				</button>
				<button
					class="action-tab-button"
					class:active={activeActionTab === 'artifacts'}
					on:click={() => switchActionTab('artifacts')}
				>
					<span>📁</span>
					<span>Artifacts</span>
				</button>
				<button
					class="action-tab-button"
					class:active={activeActionTab === 'assistant'}
					on:click={() => switchActionTab('assistant')}
				>
					<span>🤖</span>
					<span>AI Assistant</span>
				</button>
			</div>

			<div class="action-tab-content">
				{#if activeActionTab === 'chat'}
					<!-- Chat Tab -->
					<div class="chat-container">
						<div class="chat-messages">
							{#each mockChatMessages as message}
								<div class="chat-message">
									<div class="chat-avatar">{message.avatar}</div>
									<div class="chat-message-content">
										<div class="chat-message-header">
											<span class="chat-user-name">{message.userName}</span>
											<span class="chat-timestamp">{formatTimestamp(message.timestamp)}</span>
										</div>
										<div class="chat-message-text">{message.text}</div>
									</div>
								</div>
							{/each}
						</div>
						<div class="chat-input-container">
							<input
								type="text"
								class="chat-input"
								placeholder="Type a message..."
								on:click={() => alert('Chat functionality coming soon!')}
							/>
							<div class="chat-radial-menu-wrapper">
								<button
									class="chat-proof-button"
									class:active={showRadialMenu}
									on:click={toggleRadialMenu}
									title="Add content"
								>
									+
								</button>
								{#if showRadialMenu}
									<div class="radial-menu">
										<button
											class="radial-menu-item"
											style="--angle: 60deg"
											on:click={() => handleRadialOption('proof')}
											title="Submit Proof of Service"
										>
											<span class="radial-icon">✓</span>
											<span class="radial-label">Proof</span>
										</button>
										<button
											class="radial-menu-item"
											style="--angle: 120deg"
											on:click={() => handleRadialOption('artifact')}
											title="Upload Artifact"
										>
											<span class="radial-icon">📄</span>
											<span class="radial-label">Artifact</span>
										</button>
										<button
											class="radial-menu-item"
											style="--angle: 180deg"
											on:click={() => handleRadialOption('voice')}
											title="Record Voice Memo"
										>
											<span class="radial-icon">🎤</span>
											<span class="radial-label">Voice</span>
										</button>
										<button
											class="radial-menu-item"
											style="--angle: 240deg"
											on:click={() => handleRadialOption('media')}
											title="Upload Media"
										>
											<span class="radial-icon">📷</span>
											<span class="radial-label">Media</span>
										</button>
										<button
											class="radial-menu-item"
											style="--angle: 300deg"
											on:click={() => handleRadialOption('blessing')}
											title="Send Blessing"
										>
											<span class="radial-icon">✨</span>
											<span class="radial-label">Blessing</span>
										</button>
									</div>
								{/if}
							</div>
							<button class="chat-send-button">Send</button>
						</div>
					</div>
				{:else if activeActionTab === 'artifacts'}
					<!-- Artifacts Tab -->
					<div class="artifacts-container">
						<div class="artifacts-header">
							<span class="artifacts-count">{mockArtifacts.length} documents</span>
							<button class="artifacts-upload-button" on:click={() => alert('Upload coming soon!')}>
								<span>⬆️</span>
								<span>Upload</span>
							</button>
						</div>
						<div class="artifacts-list">
							{#each mockArtifacts as artifact}
								<div class="artifact-card" on:click={() => alert(`Opening ${artifact.title}...`)}>
									<div class="artifact-icon">{artifact.icon}</div>
									<div class="artifact-info">
										<div class="artifact-title">{artifact.title}</div>
										<div class="artifact-meta">
											<span>{artifact.type}</span>
											<span>•</span>
											<span>{artifact.size}</span>
											<span>•</span>
											<span>{artifact.uploadedBy}</span>
										</div>
									</div>
									<div class="artifact-date">{artifact.uploadedAt}</div>
								</div>
							{/each}
						</div>
					</div>
				{:else if activeActionTab === 'assistant'}
					<!-- AI Assistant Tab -->
					<div class="assistant-container">
						<div class="assistant-messages">
							{#if aiMessages.length === 0}
								<div class="assistant-welcome">
									<div class="assistant-welcome-icon">🤖</div>
									<div class="assistant-welcome-text">
										Hi! I'm your AI assistant for this intention. Ask me anything about the project,
										how to contribute, or what's happening in the community.
									</div>
									<div class="assistant-suggestions">
										<button
											class="suggestion-chip"
											on:click={() => {
												aiInput = 'How can I help with this intention?';
												sendAiMessage();
											}}
										>
											How can I help?
										</button>
										<button
											class="suggestion-chip"
											on:click={() => {
												aiInput = "What's the current progress?";
												sendAiMessage();
											}}
										>
											Current progress?
										</button>
										<button
											class="suggestion-chip"
											on:click={() => {
												aiInput = 'What skills are needed?';
												sendAiMessage();
											}}
										>
											Skills needed?
										</button>
									</div>
								</div>
							{:else}
								{#each aiMessages as message}
									<div class="ai-message" class:user={message.role === 'user'}>
										<div class="ai-message-avatar">
											{message.role === 'user' ? currentUser.avatar : '🤖'}
										</div>
										<div class="ai-message-text">{message.text}</div>
									</div>
								{/each}
							{/if}
						</div>
						<div class="assistant-input-container">
							<input
								type="text"
								class="assistant-input"
								placeholder="Ask me anything..."
								bind:value={aiInput}
								on:keydown={(e) => e.key === 'Enter' && sendAiMessage()}
							/>
							<button class="assistant-send-button" on:click={sendAiMessage}>Send</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{:else if currentView === 'details'}
		<!-- Details View - Top Contributors -->
		<h2 class="page-title">Top Contributors</h2>
		<div class="participants-list">
			{#each intention.topContributors as contributor}
				<div class="participant-card">
					<div class="participant-avatar">{contributor.avatar}</div>
					<div class="participant-info">
						<div class="participant-name">{contributor.name}</div>
						<div class="participant-meta">{contributor.hours}h • {contributor.role}</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Attention Summary -->
		{#if attentionSummary && attentionSummary.userSummaries.length > 0}
			<SectionTitle icon="⚡" title="Attention Devoted" />

			<!-- User Summaries -->
			<div class="attention-users-list">
				{#each attentionSummary.userSummaries as userSummary}
					<div class="attention-user-card">
						<span class="attention-avatar">{userSummary.userAvatar}</span>
						<span class="attention-user-name">{userSummary.userName}</span>
						<span class="attention-duration">{formatDuration(userSummary.totalMinutes)}</span>
					</div>
				{/each}
			</div>

			<!-- Attention Log -->
			<SectionTitle icon="📋" title="Attention Log" />
			<div class="attention-log">
				{#each attentionSummary.durations as duration}
					<div class="attention-log-item">
						<div class="log-avatar">{duration.userAvatar}</div>
						<div class="log-content">
							<div class="log-user">{duration.userName}</div>
							<div class="log-time">{formatTimestamp(duration.startTime)}</div>
						</div>
						<div class="log-duration">{formatDuration(duration.durationMinutes)}</div>
					</div>
				{/each}
			</div>
		{/if}
	{:else if currentView === 'activity'}
		<!-- Activity View -->
		<SectionTitle icon="📊" title="Recent Activity" />
		<div class="activity-feed">
			{#each intention.recentActivity as activity}
				<ActivityItem {activity} />
			{/each}
		</div>

		<!-- All Proofs for this Intention -->
		{#if allProofs.length > 0}
			<SectionTitle icon="✓" title="Community Proofs" />
			<ProofGallery proofs={allProofs} />
		{/if}
	{:else if currentView === 'participation'}
		<!-- Your Impact View -->
		<h2 class="page-title">Your Journey</h2>

		{#if userProofs.length > 0}
			<p class="page-subtitle">
				You've submitted {userProofs.length} proof{userProofs.length !== 1 ? 's' : ''} of service for
				this intention.
			</p>

			<SectionTitle icon="✓" title="Your Proofs" />
			<ProofGallery proofs={userProofs} />

			<div class="action-buttons mt-6">
				<ActionButton variant="primary" fullWidth={true} onClick={handleSubmitProof}
					>Submit Another Proof</ActionButton
				>
			</div>
		{:else}
			<p class="page-subtitle">You haven't participated in this intention yet.</p>
			<ActionButton variant="primary" fullWidth={true} onClick={handleSubmitProof}
				>Submit Proof of Service</ActionButton
			>
		{/if}
	{/if}

	<!-- View Tabs -->
	<div class="view-tabs">
		<button
			class="tab-button"
			class:active={currentView === 'discovery'}
			on:click={() => switchView('discovery')}
		>
			Discovery
		</button>
		<button
			class="tab-button"
			class:active={currentView === 'details'}
			on:click={() => switchView('details')}
		>
			Details
		</button>
		<button
			class="tab-button"
			class:active={currentView === 'activity'}
			on:click={() => switchView('activity')}
		>
			Activity
		</button>
		<button
			class="tab-button"
			class:active={currentView === 'participation'}
			on:click={() => switchView('participation')}
		>
			Your Impact
		</button>
	</div>
{:else}
	<h1 class="page-title">Intention Not Found</h1>
	<ActionButton variant="primary" onClick={() => goto('/browse')}>Back to Browse</ActionButton>
{/if}

<style>
	.intention-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		margin-bottom: var(--spacing-3); /* 12px φ-based */
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		box-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.intention-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 700;
		margin-bottom: var(--spacing-4); /* 8px φ-based */
		text-shadow: 0 0 15px theme('colors.gold.glow');
		line-height: 1.3;
	}

	.intention-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		opacity: 0.9;
	}

	.page-title {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		margin-bottom: var(--spacing-3); /* 12px φ-based */
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	.page-subtitle {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		opacity: 0.85;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.stat-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		text-align: center;
		transition: all 0.2s ease;
	}

	.stat-box:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
	}

	.stat-label {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
		opacity: 0.8;
	}

	.stat-value {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		font-weight: 700;
		text-shadow: 0 0 10px theme('colors.gold.glow');
	}

	.content-box {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
	}

	.content-text {
		color: theme('colors.cream.DEFAULT');
		line-height: 1.7;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		opacity: 0.9;
	}

	.info-box {
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
	}

	.info-box-title {
		color: theme('colors.gold.DEFAULT');
		font-weight: 600;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		margin-bottom: var(--spacing-4); /* 8px φ-based */
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.info-box-content {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		line-height: 1.7;
		opacity: 0.9;
	}

	.info-box-content strong {
		color: theme('colors.gold.DEFAULT');
		font-weight: 700;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: var(--spacing-2); /* 18px φ-based */
	}

	.participants-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.participant-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		transition: all 0.2s ease;
	}

	.participant-card:hover {
		border-color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
	}

	.participant-avatar {
		width: 40px;
		height: 40px;
		background: theme('colors.gold.bg');
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
		filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
	}

	.participant-info {
		flex: 1;
	}

	.participant-name {
		color: theme('colors.cream.DEFAULT');
		font-weight: 500;
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
	}

	.participant-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	.activity-feed {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.view-tabs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-4); /* 8px φ-based */
		margin-top: var(--spacing-1); /* 30px φ-based */
		padding-top: var(--spacing-3); /* 12px φ-based */
		border-top: 1px solid theme('colors.gold.border');
	}

	.tab-button {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid theme('colors.gold.border');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		border-color: theme('colors.gold.DEFAULT');
		color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
	}

	.tab-button.active {
		background: theme('colors.gold.bg');
		border-color: theme('colors.gold.DEFAULT');
		color: theme('colors.gold.DEFAULT');
		box-shadow: 0 0 15px theme('colors.gold.glow');
	}

	.mb-4 {
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.mt-6 {
		margin-top: var(--spacing-2); /* 18px φ-based */
	}

	/* Attention Summary Styles */
	.attention-users-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.attention-user-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		transition: all 0.2s ease;
	}

	.attention-user-card:hover {
		border-color: rgba(0, 255, 209, 0.4);
		background: rgba(0, 0, 0, 0.4);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.attention-avatar {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.attention-user-name {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 500;
		flex: 1;
	}

	.attention-duration {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		background: rgba(212, 175, 55, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: 0.25rem 0.5rem;
		white-space: nowrap;
		text-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
	}

	/* Attention Log Styles */
	.attention-log {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.attention-log-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-left: 3px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		transition: all 0.2s ease;
	}

	.attention-log-item:hover {
		border-color: rgba(0, 255, 209, 0.4);
		background: rgba(0, 0, 0, 0.4);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.log-avatar {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.log-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.log-user {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
	}

	.log-time {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.8;
	}

	.log-duration {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 700;
		background: rgba(212, 175, 55, 0.1);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: 0.35rem 0.75rem;
		white-space: nowrap;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
		flex-shrink: 0;
	}

	/* Action Tabs Styles - Matching Profile TabSwitcher */
	.action-tabs-container {
		margin-top: var(--spacing-2); /* 18px φ-based */
		margin-bottom: var(--spacing-2); /* 18px φ-based */
	}

	.action-tabs-nav {
		display: flex;
		gap: var(--spacing-4);
		border-bottom: 2px solid rgba(0, 255, 209, 0.2);
		margin-bottom: var(--spacing-2);
	}

	.action-tab-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-4) var(--spacing-3);
		background: transparent;
		border: none;
		border-bottom: 3px solid transparent;
		color: theme('colors.sage.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		bottom: -2px;
	}

	.action-tab-button:hover {
		color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.05);
	}

	.action-tab-button.active {
		color: theme('colors.cyan.DEFAULT');
		border-bottom-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 255, 209, 0.1);
	}

	.action-tab-content {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-2); /* 18px φ-based */
		min-height: 400px;
	}

	/* Chat Styles */
	.chat-container {
		display: flex;
		flex-direction: column;
		height: 400px;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.chat-message {
		display: flex;
		gap: var(--spacing-3); /* 12px φ-based */
		align-items: flex-start;
	}

	.chat-avatar {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.chat-message-content {
		flex: 1;
	}

	.chat-message-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.chat-user-name {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		font-family: theme('fontFamily.exo');
	}

	.chat-timestamp {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		opacity: 0.7;
	}

	.chat-message-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.5;
	}

	.chat-input-container {
		display: flex;
		gap: var(--spacing-4); /* 8px φ-based */
		border-top: 1px solid rgba(0, 255, 209, 0.2);
		padding-top: var(--spacing-3); /* 12px φ-based */
	}

	.chat-input {
		flex: 1;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		outline: none;
	}

	.chat-input:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.3);
	}

	.chat-radial-menu-wrapper {
		position: relative;
		flex-shrink: 0;
	}

	.chat-proof-button {
		width: 36px;
		height: 36px;
		background: rgba(0, 255, 209, 0.1);
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		font-weight: 300;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		flex-shrink: 0;
		z-index: 10;
		position: relative;
	}

	.chat-proof-button:hover {
		background: rgba(0, 255, 209, 0.2);
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.6);
		transform: rotate(90deg);
	}

	.chat-proof-button.active {
		background: rgba(0, 255, 209, 0.2);
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.6);
		transform: rotate(45deg);
	}

	.radial-menu {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200px;
		height: 200px;
		pointer-events: none;
	}

	.radial-menu-item {
		position: absolute;
		width: 50px;
		height: 50px;
		background: rgba(0, 0, 0, 0.9);
		border: 2px solid theme('colors.cyan.DEFAULT');
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		cursor: pointer;
		transition: all 0.3s ease;
		pointer-events: all;
		top: 50%;
		left: 50%;
		transform-origin: center center;
		transform: translate(-50%, -50%)
			translate(
				calc(cos(var(--angle)) * 55px),
				calc(sin(var(--angle)) * -55px)
			);
		animation: radialFadeIn 0.3s ease forwards;
		opacity: 0;
	}

	@keyframes radialFadeIn {
		from {
			opacity: 0;
			transform: translate(-50%, -50%)
				translate(
					calc(cos(var(--angle)) * 30px),
					calc(sin(var(--angle)) * -30px)
				)
				scale(0.5);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%)
				translate(
					calc(cos(var(--angle)) * 55px),
					calc(sin(var(--angle)) * -55px)
				)
				scale(1);
		}
	}

	.radial-menu-item:hover {
		background: rgba(0, 255, 209, 0.2);
		box-shadow: 0 0 20px rgba(0, 255, 209, 0.6);
		transform: translate(-50%, -50%)
			translate(
				calc(cos(var(--angle)) * 58px),
				calc(sin(var(--angle)) * -58px)
			)
			scale(1.05);
	}

	.radial-icon {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
	}

	.radial-label {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-family: theme('fontFamily.exo');
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.chat-send-button {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-2); /* 8px 18px φ-based */
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.chat-send-button:hover {
		box-shadow: 0 0 15px rgba(0, 255, 209, 0.5);
		background: rgba(0, 255, 209, 0.2);
	}

	/* Artifacts Styles */
	.artifacts-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3); /* 12px φ-based */
	}

	.artifacts-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: var(--spacing-3); /* 12px φ-based */
		border-bottom: 1px solid rgba(0, 255, 209, 0.2);
	}

	.artifacts-count {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-family: theme('fontFamily.exo');
	}

	.artifacts-upload-button {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.artifacts-upload-button:hover {
		box-shadow: 0 0 15px rgba(0, 255, 209, 0.5);
		background: rgba(0, 255, 209, 0.2);
	}

	.artifacts-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4); /* 8px φ-based */
		max-height: 340px;
		overflow-y: auto;
	}

	.artifact-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-3); /* 12px φ-based */
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.artifact-card:hover {
		border-color: theme('colors.cyan.DEFAULT');
		background: rgba(0, 0, 0, 0.4);
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.2);
	}

	.artifact-icon {
		font-size: var(--font-size-0); /* 32px Level 0 φ-based */
		flex-shrink: 0;
	}

	.artifact-info {
		flex: 1;
	}

	.artifact-title {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		font-family: theme('fontFamily.exo');
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.artifact-meta {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		display: flex;
		gap: var(--spacing-4); /* 8px φ-based */
	}

	.artifact-date {
		color: theme('colors.sage.DEFAULT');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		flex-shrink: 0;
	}

	/* AI Assistant Styles */
	.assistant-container {
		display: flex;
		flex-direction: column;
		height: 400px;
	}

	.assistant-messages {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3); /* 12px φ-based */
		margin-bottom: var(--spacing-3); /* 12px φ-based */
	}

	.assistant-welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-1); /* 30px φ-based */
		gap: var(--spacing-3); /* 12px φ-based */
	}

	.assistant-welcome-icon {
		font-size: 48px;
	}

	.assistant-welcome-text {
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.6;
		max-width: 400px;
	}

	.assistant-suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4); /* 8px φ-based */
		justify-content: center;
	}

	.suggestion-chip {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-3); /* 8px Level 3 φ-based */
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.suggestion-chip:hover {
		box-shadow: 0 0 15px rgba(0, 255, 209, 0.5);
		background: rgba(0, 255, 209, 0.2);
	}

	.ai-message {
		display: flex;
		gap: var(--spacing-3); /* 12px φ-based */
		align-items: flex-start;
	}

	.ai-message.user {
		flex-direction: row-reverse;
	}

	.ai-message-avatar {
		font-size: var(--font-size-1); /* 19.8px Level 1 φ-based */
		flex-shrink: 0;
	}

	.ai-message-text {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 255, 209, 0.3);
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-3); /* 12px φ-based */
		color: theme('colors.cream.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		line-height: 1.5;
		max-width: 70%;
	}

	.ai-message.user .ai-message-text {
		background: rgba(0, 255, 209, 0.1);
		border-color: theme('colors.cyan.DEFAULT');
	}

	.assistant-input-container {
		display: flex;
		gap: var(--spacing-4); /* 8px φ-based */
		border-top: 1px solid rgba(0, 255, 209, 0.2);
		padding-top: var(--spacing-3); /* 12px φ-based */
	}

	.assistant-input {
		flex: 1;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 255, 209, 0.2);
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-3); /* 8px 12px φ-based */
		color: theme('colors.cream.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		outline: none;
	}

	.assistant-input:focus {
		border-color: theme('colors.cyan.DEFAULT');
		box-shadow: 0 0 10px rgba(0, 255, 209, 0.3);
	}

	.assistant-send-button {
		background: rgba(0, 255, 209, 0.1);
		border: 1px solid theme('colors.cyan.DEFAULT');
		border-radius: var(--spacing-4); /* 8px φ-based */
		padding: var(--spacing-4) var(--spacing-2); /* 8px 18px φ-based */
		color: theme('colors.cyan.DEFAULT');
		font-family: theme('fontFamily.exo');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.assistant-send-button:hover {
		box-shadow: 0 0 15px rgba(0, 255, 209, 0.5);
		background: rgba(0, 255, 209, 0.2);
	}

	@media (max-width: 768px) {
		.action-buttons {
			grid-template-columns: 1fr;
		}

		.view-tabs {
			grid-template-columns: repeat(2, 1fr);
		}

		.attention-users-list {
			grid-template-columns: 1fr;
		}

		.log-content {
			min-width: 0; /* Allow text to wrap on mobile */
		}

		.action-tabs-nav {
			grid-template-columns: 1fr;
		}

		.ai-message-text {
			max-width: 85%;
		}
	}
</style>
