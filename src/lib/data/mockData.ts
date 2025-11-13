// Synchronicity Engine - Mock Data Service
// Based on NAVIGATION_PLAN.md specifications

import type {
	User,
	Temple,
	Intention,
	Token,
	Distribution,
	Activity,
	Connection,
	GroupChat,
	ProofOfService
} from '$types';

// Current User Profile
export const currentUser: User = {
	userId: 'user-truman-001',
	name: 'Dr. Truman Ellis',
	avatar: '👨‍🔬',
	bio: 'Computational scientist exploring P2P gift economies',
	joinDate: '2024-08-15',
	temple: {
		templeId: 'temple-agua-lila',
		templeName: 'Templo da Água Lila',
		templeIcon: '🛕',
		location: 'Montanhas Mágicas, Portugal',
		memberCount: 247,
		monthlyContribution: 25,
		role: 'Original Steward'
	},
	stats: {
		tokensHeld: 5,
		totalHoursEarned: 156,
		activeIntentions: 12,
		connections: 34,
		fulfillmentsCompleted: 18,
		distributionsReceived: 3
	},
	paymentMethods: [
		{
			id: 'pm-001',
			type: 'bank_transfer',
			lastFour: '4829',
			isPrimary: true
		}
	]
};

// User's active intention (most recent joined)
export const activeIntentionId = 'int-garden-001';

// User's potential attention hours per intention
export const potentialAttention: Record<string, number> = {
	'int-garden-001': 187,
	'int-eucalyptus-001': 124,
	'int-mushroom-001': 89,
	'int-solar-001': 45
};

// Notification count
export const notificationCount = 3;

// Temple Data
export const temple: Temple = {
	templeId: 'temple-agua-lila',
	name: 'Templo da Água Lila',
	icon: '🛕',
	description: 'First demonstration site for Synchronicity Engine principles',
	location: {
		name: 'Montanhas Mágicas',
		region: 'Portugal',
		coords: [40.2033, -8.4103]
	},
	founded: '2024-06-01',
	memberCount: 247,
	stats: {
		activeIntentions: 87,
		totalTokensCirculating: 12450,
		monthlyPoolCurrent: 47250,
		nextDistribution: '2025-11-12',
		daysUntilDistribution: 3
	},
	categories: [
		'Off-Grid & Sustainable Living',
		'Health & Vitality',
		'Organic Food & Nutrition',
		'Community Abundance',
		'Self & Spiritual Development',
		'Land Stewardship',
		'Creative Expression'
	],
	values: [
		'Ecological regeneration',
		'Spiritual evolution',
		'Gift economy',
		'Sovereign technology'
	]
};

// Intentions Data
export const intentions: Intention[] = [
	{
		intentionId: 'int-garden-001',
		title: 'Community Garden Infrastructure',
		description:
			'Building raised beds, irrigation systems, and tool sheds for shared food production spaces. Current focus: 8 gardens across 3 neighborhoods need raised beds, composting systems, and water catchment infrastructure.',
		category: 'Organic Food & Nutrition',
		createdBy: 'user-marcus-001',
		createdAt: '2024-10-28T14:30:00Z',
		status: 'active',
		location: {
			name: 'Multiple sites',
			proximity: 'local'
		},
		media: ['ipfs://Qm...garden1', 'ipfs://Qm...garden2'],
		stats: {
			totalAttentionHours: 2847,
			participantCount: 156,
			activeDays: 12,
			impactLevel: 'high'
		},
		topContributors: [
			{
				userId: 'user-marcus-001',
				name: 'Marcus Chen',
				avatar: '🔨',
				hours: 487,
				role: 'Construction Lead'
			},
			{
				userId: 'user-aisha-001',
				name: 'Aisha Patel',
				avatar: '🌿',
				hours: 392,
				role: 'Permaculture Designer'
			},
			{
				userId: 'user-james-001',
				name: 'James Rodriguez',
				avatar: '💧',
				hours: 276,
				role: 'Irrigation Specialist'
			}
		],
		recentActivity: [
			{
				activityId: 'act-001',
				type: 'proof_posted',
				userId: 'user-marcus-001',
				userName: 'Marcus Chen',
				timestamp: '2025-11-09T14:30:00Z',
				text: 'Completed construction of 6 raised beds at Maple Grove Garden',
				icon: '✓',
				tokenEarned: {
					tokenId: 'tok-001',
					hours: 12
				},
				meta: '🏆 Earned 12h Token • Proof submitted'
			},
			{
				activityId: 'act-002',
				type: 'token_released',
				userId: 'user-sarah-001',
				userName: 'Sarah Kim',
				timestamp: '2025-11-09T12:15:00Z',
				text: 'Released 8h Token to James Rodriguez for irrigation system installation',
				icon: '🔄',
				meta: '💧 Pipeline for 3 gardens now operational'
			}
		]
	},
	{
		intentionId: 'int-eucalyptus-001',
		title: 'Eucalyptus Removal Brigade',
		description: 'Clear invasive fire-trees from sacred valley restoration site',
		category: 'Land Stewardship',
		createdBy: 'temple-agua-lila',
		createdAt: '2024-09-15T10:00:00Z',
		status: 'active',
		location: {
			name: 'Água Lila Valley',
			proximity: 'on-site'
		},
		stats: {
			totalAttentionHours: 3892,
			participantCount: 89,
			activeDays: 56,
			impactLevel: 'high'
		},
		topContributors: [
			{
				userId: 'user-miguel-001',
				name: 'Miguel Santos',
				avatar: '🪓',
				hours: 634,
				role: 'Forestry Expert'
			},
			{
				userId: 'user-elena-001',
				name: 'Elena Torres',
				avatar: '🌱',
				hours: 512,
				role: 'Ecologist'
			}
		],
		recentActivity: []
	},
	{
		intentionId: 'int-mushroom-001',
		title: 'Mushroom Cultivation Network',
		description: 'Share techniques, spores, and growing spaces for food sovereignty',
		category: 'Organic Food & Nutrition',
		createdBy: 'user-fungal-001',
		createdAt: '2024-10-05T16:45:00Z',
		status: 'active',
		location: {
			name: 'Regional network',
			proximity: 'nearby'
		},
		stats: {
			totalAttentionHours: 2134,
			participantCount: 56,
			activeDays: 35,
			impactLevel: 'medium'
		},
		topContributors: [],
		recentActivity: []
	},
	{
		intentionId: 'int-solar-001',
		title: 'Solar Dehydrator Workshop',
		description: 'Build and share solar food dehydrators for off-grid food preservation',
		category: 'Off-Grid & Sustainable Living',
		createdBy: 'user-solar-001',
		createdAt: '2024-11-01T09:00:00Z',
		status: 'active',
		location: {
			name: 'Workshop Barn',
			proximity: 'on-site'
		},
		stats: {
			totalAttentionHours: 2145,
			participantCount: 43,
			activeDays: 8,
			impactLevel: 'medium'
		},
		topContributors: [],
		recentActivity: []
	}
];

// User's Tokens
export const userTokens: Token[] = [
	{
		tokenId: 'tok-timber-001',
		intentionId: 'int-garden-001',
		submittedBy: 'user-truman-001',
		steward: 'user-truman-001',
		parent: null,
		title: 'Timber Framing Token',
		description: 'Built tool shed at Oak Street Garden using reclaimed cedar',
		media: ['ipfs://Qm...shed1', 'ipfs://Qm...shed2'],
		timestamp: '2024-10-25T11:30:00Z',
		location: {
			name: 'Oak Street Garden',
			coords: [40.2045, -8.4115]
		},
		blessings: [
			{
				giverId: 'user-marcus-001',
				attentionIndex: 42,
				polarity: 1,
				durationMs: 7200000
			},
			{
				giverId: 'user-sarah-001',
				attentionIndex: 18,
				polarity: 1,
				durationMs: 10800000
			}
		],
		computed: {
			totalDurationMs: 57600000,
			totalValueMs: 57600000,
			supporters: 8,
			challengers: 0,
			hours: 16
		},
		status: 'available',
		category: 'Infrastructure',
		tags: ['construction', 'woodworking', 'community-spaces']
	},
	{
		tokenId: 'tok-irrigation-001',
		intentionId: 'int-garden-001',
		submittedBy: 'user-truman-001',
		steward: 'user-truman-001',
		parent: null,
		title: 'Irrigation Consultation Token',
		description: 'Designed gravity-fed water system for Riverside community garden',
		timestamp: '2024-11-02T09:15:00Z',
		computed: {
			totalDurationMs: 21600000,
			totalValueMs: 21600000,
			supporters: 5,
			challengers: 0,
			hours: 6
		},
		status: 'available'
	},
	{
		tokenId: 'tok-planting-001',
		intentionId: 'int-garden-001',
		submittedBy: 'user-marcus-001',
		steward: 'user-marcus-001',
		parent: null,
		title: 'Seed Planting Token',
		description: 'Planted heirloom vegetables across 12 raised beds',
		timestamp: '2024-11-05T08:00:00Z',
		computed: {
			totalDurationMs: 28800000,
			totalValueMs: 28800000,
			supporters: 6,
			challengers: 0,
			hours: 8
		},
		status: 'available'
	},
	{
		tokenId: 'tok-compost-001',
		intentionId: 'int-garden-001',
		submittedBy: 'user-aisha-001',
		steward: 'user-aisha-001',
		parent: null,
		title: 'Composting System Token',
		description: 'Built three-bin composting system with worm castings',
		timestamp: '2024-11-03T10:30:00Z',
		computed: {
			totalDurationMs: 43200000,
			totalValueMs: 43200000,
			supporters: 9,
			challengers: 0,
			hours: 12
		},
		status: 'available'
	},
	{
		tokenId: 'tok-fence-001',
		intentionId: 'int-garden-001',
		submittedBy: 'user-james-001',
		steward: 'user-james-001',
		parent: null,
		title: 'Garden Fencing Token',
		description: 'Installed deer fencing around perimeter with natural materials',
		timestamp: '2024-11-01T07:00:00Z',
		computed: {
			totalDurationMs: 14400000,
			totalValueMs: 14400000,
			supporters: 4,
			challengers: 0,
			hours: 4
		},
		status: 'available'
	}
];

// Distribution Data
export const distribution: Distribution = {
	distributionId: 'dist-2025-11',
	cycle: 'November 2025 New Moon',
	newMoonDate: '2025-11-12',
	biddingPeriod: {
		start: '2025-11-09T00:00:00Z',
		end: '2025-11-12T23:59:59Z',
		daysRemaining: 3
	},
	pool: {
		totalUSD: 47250,
		source: 'Monthly community donations',
		contributors: 247
	},
	stats: {
		membersBidding: 127,
		totalHoursBid: 8200,
		averageBidHours: 64.5,
		estimatedShareMultiplier: 5.76
	},
	userBid: {
		status: 'not_submitted',
		tokensSelected: [],
		totalHours: 0,
		estimatedShare: 0
	}
};

// Recent Activity Feed
export const recentActivity: Activity[] = [
	{
		activityId: 'act-feed-001',
		type: 'proof_posted',
		timestamp: '2025-11-09T14:30:00Z',
		userId: 'user-marcus-001',
		userName: 'Marcus Chen',
		text: 'Completed raised bed construction at Maple Grove Garden',
		meta: '🏆 Earned 12h Token • Garden Infrastructure',
		icon: '✓'
	},
	{
		activityId: 'act-feed-002',
		type: 'token_released',
		timestamp: '2025-11-09T11:15:00Z',
		userId: 'user-sarah-001',
		userName: 'Sarah Kim',
		text: 'Released 8h Token to James for irrigation system',
		meta: '💧 Pipeline now operational • 3 gardens connected',
		icon: '🎁'
	},
	{
		activityId: 'act-feed-003',
		type: 'intention_joined',
		timestamp: '2025-11-09T08:45:00Z',
		userId: 'user-truman-001',
		userName: 'You',
		text: 'Joined "Solar Dehydrator Workshop" intention',
		meta: '☀️ Off-Grid Living • 2,145h community attention',
		icon: '🌟'
	}
];

// User Connections
export const connections: Connection[] = [
	{
		userId: 'user-marcus-001',
		name: 'Marcus Chen',
		avatar: '🔨',
		connectionDate: '2024-09-12',
		stats: {
			exchangesCompleted: 7,
			trustLevel: 'high',
			lastInteraction: '2025-11-09T14:30:00Z'
		},
		sharedIntentions: ['int-garden-001', 'int-tools-001'],
		bio: 'Builder and permaculture enthusiast'
	},
	{
		userId: 'user-sarah-001',
		name: 'Sarah Kim',
		avatar: '🌱',
		connectionDate: '2024-08-20',
		stats: {
			exchangesCompleted: 12,
			trustLevel: 'high',
			lastInteraction: '2025-11-09T11:15:00Z'
		},
		sharedIntentions: ['int-garden-001', 'int-eucalyptus-001'],
		bio: 'Community organizer and garden coordinator'
	}
];

// Group Chat
export const groupChats: GroupChat[] = [
	{
		chatId: 'chat-int-garden-001',
		intentionId: 'int-garden-001',
		intentionTitle: 'Community Garden Infrastructure',
		participantCount: 156,
		messages: [
			{
				messageId: 'msg-001',
				userId: 'user-marcus-001',
				userName: 'Marcus Chen',
				avatar: '🔨',
				text: 'Just finished the raised beds at Maple Grove! Used reclaimed cedar from the old fence donation.',
				timestamp: '2025-11-09T13:30:00Z',
				reactions: []
			},
			{
				messageId: 'msg-002',
				userId: 'user-aisha-001',
				userName: 'Aisha Patel',
				avatar: '🌿',
				text: 'Beautiful work! The hugelkultur base will give those beds amazing water retention. 🎉',
				timestamp: '2025-11-09T13:45:00Z',
				reactions: ['❤️', '🙌']
			}
		],
		unreadCount: 3
	}
];

// Helper Functions
export function getIntentionById(id: string): Intention | undefined {
	return intentions.find((i) => i.intentionId === id);
}

export function getTokenById(id: string): Token | undefined {
	return userTokens.find((t) => t.tokenId === id);
}

export function getUserTokens(): Token[] {
	return userTokens.filter((t) => t.steward === currentUser.userId);
}

export function getAvailableTokens(): Token[] {
	return userTokens.filter((t) => t.status === 'available');
}

export function calculateEstimatedShare(hours: number): number {
	return hours * distribution.stats.estimatedShareMultiplier;
}

export function formatTimeAgo(timestamp: string): string {
	const now = new Date();
	const past = new Date(timestamp);
	const diffMs = now.getTime() - past.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffHours / 24);

	if (diffHours < 1) return 'just now';
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays === 1) return 'Yesterday';
	if (diffDays < 7) return `${diffDays}d ago`;
	return `${Math.floor(diffDays / 7)}w ago`;
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

// Get recommended intentions for user
export function getRecommendedIntentions(): Array<
	Intention & { recommendationReason: string }
> {
	return [
		{
			...intentions.find((i) => i.intentionId === 'int-mushroom-001')!,
			recommendationReason: '3 connections already joined'
		},
		{
			...intentions.find((i) => i.intentionId === 'int-eucalyptus-001')!,
			recommendationReason: '🔥 TRENDING'
		}
	];
}

// Get recent intentions sorted by potential attention
export function getRecentIntentionsByPotential(): Array<{
	intention: Intention;
	potentialHours: number;
}> {
	return Object.entries(potentialAttention)
		.map(([intentionId, hours]) => ({
			intention: intentions.find((i) => i.intentionId === intentionId)!,
			potentialHours: hours
		}))
		.filter((item) => item.intention)
		.sort((a, b) => b.potentialHours - a.potentialHours);
}

// Proof of Service Data
export const proofsOfService: ProofOfService[] = [
	{
		proofId: 'proof-001',
		intentionId: 'int-garden-001',
		userId: 'user-marcus-001',
		userName: 'Marcus Chen',
		userAvatar: '🔨',
		title: 'Completed 6 Raised Beds at Maple Grove',
		description:
			'Built 6 raised beds using reclaimed cedar lumber. Each bed is 4x8 feet with hugelkultur base layers for water retention. Installed drip irrigation lines and filled with compost-rich soil mix.',
		hoursWorked: 12,
		media: ['ipfs://Qm...raised-bed-1', 'ipfs://Qm...raised-bed-2', 'ipfs://Qm...raised-bed-3'],
		timestamp: '2025-11-09T14:30:00Z',
		status: 'token_created',
		tokenId: 'tok-raised-beds-001',
		location: {
			name: 'Maple Grove Garden',
			coords: [40.2055, -8.4125]
		}
	},
	{
		proofId: 'proof-002',
		intentionId: 'int-garden-001',
		userId: 'user-truman-001',
		userName: 'Dr. Truman Ellis',
		userAvatar: '👨‍🔬',
		title: 'Irrigation System Design & Installation',
		description:
			'Designed and installed gravity-fed irrigation system for Riverside Garden. Calculated optimal pipe sizing, installed 200ft of mainline, and set up 8 zone valves with pressure regulators.',
		hoursWorked: 8,
		media: ['ipfs://Qm...irrigation-plan', 'ipfs://Qm...irrigation-installed'],
		timestamp: '2025-11-08T16:00:00Z',
		status: 'approved',
		witnessIds: ['user-marcus-001', 'user-james-001'],
		location: {
			name: 'Riverside Garden'
		}
	},
	{
		proofId: 'proof-003',
		intentionId: 'int-garden-001',
		userId: 'user-aisha-001',
		userName: 'Aisha Patel',
		userAvatar: '🌿',
		title: 'Three-Bin Composting System',
		description:
			'Built professional-grade three-bin composting system with worm casting integration. Designed for optimal airflow and easy turning. Includes chicken wire sides and removable front panels.',
		hoursWorked: 10,
		media: ['ipfs://Qm...compost-1', 'ipfs://Qm...compost-2'],
		timestamp: '2025-11-07T11:20:00Z',
		status: 'token_created',
		tokenId: 'tok-compost-001'
	},
	{
		proofId: 'proof-004',
		intentionId: 'int-eucalyptus-001',
		userId: 'user-miguel-001',
		userName: 'Miguel Santos',
		userAvatar: '🪓',
		title: 'Cleared 2 Acres of Eucalyptus',
		description:
			'Safely felled and processed 47 eucalyptus trees from valley restoration zone. Used chainsaw milling to create lumber for community projects. Chipped branches for mulch.',
		hoursWorked: 20,
		media: [
			'ipfs://Qm...eucalyptus-before',
			'ipfs://Qm...eucalyptus-during',
			'ipfs://Qm...eucalyptus-after'
		],
		timestamp: '2025-11-06T09:00:00Z',
		status: 'approved',
		witnessIds: ['user-elena-001', 'user-truman-001']
	},
	{
		proofId: 'proof-005',
		intentionId: 'int-garden-001',
		userId: 'user-truman-001',
		userName: 'Dr. Truman Ellis',
		userAvatar: '👨‍🔬',
		title: 'Tool Shed Construction',
		description:
			'Built 8x10 tool shed at Oak Street Garden using reclaimed cedar. Includes shelving, tool racks, and weatherproof door. Foundation on concrete blocks.',
		hoursWorked: 16,
		media: ['ipfs://Qm...shed-frame', 'ipfs://Qm...shed-complete'],
		timestamp: '2024-10-25T11:30:00Z',
		status: 'token_created',
		tokenId: 'tok-timber-001',
		location: {
			name: 'Oak Street Garden',
			coords: [40.2045, -8.4115]
		}
	},
	{
		proofId: 'proof-006',
		intentionId: 'int-solar-001',
		userId: 'user-truman-001',
		userName: 'Dr. Truman Ellis',
		userAvatar: '👨‍🔬',
		title: 'Taught Solar Dehydrator Workshop',
		description:
			'Led 3-hour workshop on building solar food dehydrators. 12 participants built their own units. Covered design principles, material selection, and food preservation techniques.',
		hoursWorked: 5,
		timestamp: '2025-11-05T14:00:00Z',
		status: 'pending',
		location: {
			name: 'Workshop Barn'
		}
	}
];

// Helper Functions for Proof of Service
export function getProofsByIntention(intentionId: string): ProofOfService[] {
	return proofsOfService.filter((proof) => proof.intentionId === intentionId);
}

export function getProofsByUser(userId: string): ProofOfService[] {
	return proofsOfService.filter((proof) => proof.userId === userId);
}

export function getProofById(proofId: string): ProofOfService | undefined {
	return proofsOfService.find((proof) => proof.proofId === proofId);
}

export function submitProofOfService(proof: Omit<ProofOfService, 'proofId' | 'timestamp' | 'status'>): ProofOfService {
	const newProof: ProofOfService = {
		...proof,
		proofId: `proof-${Date.now()}`,
		timestamp: new Date().toISOString(),
		status: 'pending'
	};
	proofsOfService.push(newProof);
	return newProof;
}
