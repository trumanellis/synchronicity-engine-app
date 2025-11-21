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
	ProofOfService,
	Offering,
	Achievement,
	AttentionSwitchEvent,
	UserAttentionLog,
	AttentionDuration,
	IntentionAttentionSummary,
	Article,
	ItineraryItem
} from '$types';

// Offerings Data
export const offerings: Offering[] = [
	{
		offeringId: 'offer-001',
		title: 'Irrigation System Design',
		description: 'I design and install gravity-fed water systems for gardens and farms. Expertise in permaculture hydrology, catchment systems, and efficient distribution.',
		category: 'Off-Grid & Sustainable Living',
		createdBy: 'user-truman-001',
		createdAt: '2024-08-20T10:00:00Z',
		status: 'active',
		location: {
			name: 'Água Lila & Regional',
			coords: [40.2033, -8.4103]
		},
		media: ['ipfs://Qm...irrigation-portfolio'],
		stats: {
			totalRecipients: 12,
			timesShared: 8,
			activeDays: 45
		},
		topRecipients: [
			{
				userId: 'user-james-001',
				name: 'James Rodriguez',
				avatar: '💧',
				hours: 6,
				role: 'Garden Coordinator'
			},
			{
				userId: 'user-marcus-001',
				name: 'Marcus Chen',
				avatar: '🔨',
				hours: 4,
				role: 'Builder'
			}
		],
		recentActivity: [
			{
				activityId: 'act-offer-001-01',
				type: 'fulfillment_completed',
				userId: 'user-truman-001',
				userName: 'Dr. Truman Ellis',
				timestamp: '2025-11-02T09:15:00Z',
				text: 'Designed gravity-fed system for Riverside garden',
				icon: '✓',
				meta: '💧 6-hour consultation • 3 gardens connected'
			}
		],
		visibility: 'public'
	},
	{
		offeringId: 'offer-002',
		title: 'Computational Modeling Workshops',
		description: 'Teaching agent-based modeling for ecological and social systems. Perfect for understanding complex dynamics in regenerative communities.',
		category: 'Self & Spiritual Development',
		createdBy: 'user-truman-001',
		createdAt: '2024-09-05T14:30:00Z',
		status: 'active',
		location: {
			name: 'Online & In-Person',
			coords: [40.2033, -8.4103]
		},
		media: [],
		stats: {
			totalRecipients: 24,
			timesShared: 6,
			activeDays: 28
		},
		topRecipients: [
			{
				userId: 'user-aisha-001',
				name: 'Aisha Patel',
				avatar: '🌿',
				hours: 3,
				role: 'Student'
			},
			{
				userId: 'user-sarah-001',
				name: 'Sarah Kim',
				avatar: '🌱',
				hours: 3,
				role: 'Student'
			}
		],
		recentActivity: [
			{
				activityId: 'act-offer-002-01',
				type: 'fulfillment_completed',
				userId: 'user-truman-001',
				userName: 'Dr. Truman Ellis',
				timestamp: '2025-10-18T15:00:00Z',
				text: 'Taught modeling workshop with 8 participants',
				icon: '✓',
				meta: '📊 Agent-based modeling • Ecosystem dynamics'
			}
		],
		visibility: 'public'
	},
	{
		offeringId: 'offer-003',
		title: 'Gift Economy Platform Development',
		description: 'Building decentralized tools for P2P coordination. Experienced with blockchain, distributed systems, and community currencies.',
		category: 'Community Abundance',
		createdBy: 'user-truman-001',
		createdAt: '2024-08-15T16:00:00Z',
		status: 'active',
		location: {
			name: 'Remote / Global',
			coords: [40.2033, -8.4103]
		},
		media: [],
		stats: {
			totalRecipients: 5,
			timesShared: 3,
			activeDays: 67
		},
		topRecipients: [
			{
				userId: 'temple-agua-lila',
				name: 'Agua Lila Community',
				avatar: '🛕',
				hours: 156,
				role: 'Primary Client'
			}
		],
		recentActivity: [
			{
				activityId: 'act-offer-003-01',
				type: 'fulfillment_completed',
				userId: 'user-truman-001',
				userName: 'Dr. Truman Ellis',
				timestamp: '2025-11-09T18:30:00Z',
				text: 'Deployed attention tracking features for temple coordination',
				icon: '✓',
				meta: '💻 Full-stack development • Synchronicity Engine'
			}
		],
		visibility: 'public'
	}
];

// Achievements Data
export const achievements: Achievement[] = [
	{
		achievementId: 'ach-001',
		title: 'Original Steward',
		description: 'Founding member of Templo da Água Lila',
		icon: '🛕',
		earnedDate: '2024-08-15',
		category: 'badge',
		rarity: 'legendary'
	},
	{
		achievementId: 'ach-002',
		title: 'Century Club',
		description: 'Contributed over 100 hours of attention',
		icon: '⏱️',
		earnedDate: '2024-11-01',
		category: 'milestone',
		rarity: 'rare'
	},
	{
		achievementId: 'ach-003',
		title: 'Master Builder',
		description: 'Completed 5 major infrastructure projects',
		icon: '🔨',
		earnedDate: '2024-10-25',
		category: 'contribution',
		rarity: 'rare'
	},
	{
		achievementId: 'ach-004',
		title: 'Knowledge Sharer',
		description: 'Taught 10+ community workshops',
		icon: '📚',
		earnedDate: '2024-11-05',
		category: 'contribution',
		rarity: 'common'
	},
	{
		achievementId: 'ach-005',
		title: 'Token Pioneer',
		description: 'First to submit 5 tokens in a single cycle',
		icon: '💎',
		earnedDate: '2024-09-12',
		category: 'special',
		rarity: 'legendary'
	}
];

// Current User Profile
export const currentUser: User = {
	userId: 'user-truman-001',
	username: 'truman',
	name: 'Dr. Truman Ellis',
	avatar: '/Truman.jpeg',
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
	],
	offerings: offerings,
	achievements: achievements,
	profileVisibility: {
		bio: 'public',
		achievements: 'public',
		offerings: 'public',
		intentions: 'public',
		tokens: 'members',
		connections: 'connections',
		activity: 'public'
	},
	substackUrl: 'https://aeonmyths.substack.com',
	contactInfo: {
		phone: '+351 912 345 678',
		instagram: 'dr.true.man',
		telegram: 'OdinPacifica',
		website: 'aeonmyths.substack.com',
		visibility: {
			phone: 'private',
			instagram: 'public',
			telegram: 'connections',
			website: 'public'
		}
	}
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
			'**Building the foundation for local food sovereignty** through collaborative infrastructure development. We\'re creating raised beds, irrigation systems, and tool sheds that transform vacant lots into thriving food production spaces. Currently focusing on *8 gardens across 3 neighborhoods* that need raised beds, composting systems, and water catchment infrastructure.\n\nOur approach combines **permaculture design principles** with community-led construction. Each garden receives custom infrastructure based on site conditions—from hugelkultur-based raised beds that retain moisture, to gravity-fed irrigation systems that eliminate the need for pumps. We prioritize using *reclaimed and locally-sourced materials* wherever possible, turning construction waste into community assets.\n\nThis isn\'t just about building physical infrastructure—it\'s about **cultivating resilient food systems** and strengthening neighborhood bonds. Every tool shed becomes a community gathering point, every compost bin teaches the cycle of regeneration, and every irrigation line connects people to the water that sustains us all. Join us in building the *practical foundations* of abundance.',
		category: 'Organic Food & Nutrition',
		createdBy: 'user-marcus-001',
		createdAt: '2024-10-28T14:30:00Z',
		status: 'active',
		location: {
			name: 'Multiple sites',
			coords: [40.2050, -8.4120]
		},
		media: ['/CommunityGarden.png'],
		stats: {
			totalAttentionHours: 2847,
			participantCount: 156,
			activeDays: 12,
			percentManifested: 75
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
		],
		attentionSummary: {
			intentionId: 'int-garden-001',
			userSummaries: [
				{
					userId: 'user-marcus-001',
					userName: 'Marcus Chen',
					userAvatar: '🔨',
					totalMinutes: 390
				},
				{
					userId: 'user-aisha-001',
					userName: 'Aisha Patel',
					userAvatar: '🌿',
					totalMinutes: 165
				},
				{
					userId: 'user-james-001',
					userName: 'James Rodriguez',
					userAvatar: '💧',
					totalMinutes: 480
				},
				{
					userId: 'user-sarah-001',
					userName: 'Sarah Kim',
					userAvatar: '🌱',
					totalMinutes: 345
				},
				{
					userId: 'user-truman-001',
					userName: 'Dr. Truman Ellis',
					userAvatar: '/Truman.jpeg',
					totalMinutes: 210
				},
				{
					userId: 'user-miguel-001',
					userName: 'Miguel Santos',
					userAvatar: '🪓',
					totalMinutes: 165
				}
			],
			durations: []
		}
	},
	{
		intentionId: 'int-eucalyptus-001',
		title: 'Eucalyptus Removal Brigade',
		description: '**Healing the land** by removing invasive eucalyptus trees that threaten both water security and fire safety in our sacred valley. These aggressive non-native species drain the water table, create dangerous fire fuel loads, and suppress native vegetation. We\'re systematically clearing *15 acres* to restore the natural oak and cork tree ecosystem that once thrived here.\n\nOur removal process is careful and **resource-conscious**—we\'re not just cutting and burning. Trees are safely felled using proper forestry techniques, then milled into lumber for community construction projects. Branches become mulch for native plantings, and stumps are treated to prevent resprouting. We work in coordination with *ecological assessments* to protect existing native saplings and prepare sites for reforestation.\n\nThis intensive land stewardship work requires **strong backs and sharp minds**. Whether you\'re experienced with chainsaw operation or new to forest restoration, there\'s a role for you. We\'re not just removing trees—we\'re participating in *ecological healing* that will benefit generations. The valley is calling us to help restore its natural balance.',
		category: 'Land Stewardship',
		createdBy: 'temple-agua-lila',
		createdAt: '2024-09-15T10:00:00Z',
		status: 'active',
		location: {
			name: 'Água Lila Valley',
			coords: [40.2033, -8.4103]
		},
		media: ['/EucalyptusRemoval.png'],
		stats: {
			totalAttentionHours: 3892,
			participantCount: 89,
			activeDays: 56,
			percentManifested: 62
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
		recentActivity: [
			{
				activityId: 'act-euc-001',
				type: 'proof_posted',
				userId: 'user-miguel-001',
				userName: 'Miguel Santos',
				timestamp: '2025-11-09T16:30:00Z',
				text: 'Safely felled and milled 47 eucalyptus trees from eastern slope',
				icon: '✓',
				tokenEarned: {
					tokenId: 'tok-euc-001',
					hours: 20
				},
				meta: '🏆 Earned 20h Token • 2 acres cleared'
			},
			{
				activityId: 'act-euc-002',
				type: 'proof_posted',
				userId: 'user-elena-001',
				userName: 'Elena Torres',
				timestamp: '2025-11-08T14:00:00Z',
				text: 'Completed ecological assessment and marked native seedlings for protection',
				icon: '✓',
				meta: '🌱 47 oak saplings protected • Survey complete'
			},
			{
				activityId: 'act-euc-003',
				type: 'intention_joined',
				userId: 'user-james-001',
				userName: 'James Rodriguez',
				timestamp: '2025-11-08T10:15:00Z',
				text: 'Joined to help with water management after tree removal',
				icon: '🌟',
				meta: '💧 Irrigation specialist • 3,892h community attention'
			},
			{
				activityId: 'act-euc-004',
				type: 'proof_posted',
				userId: 'user-miguel-001',
				userName: 'Miguel Santos',
				timestamp: '2025-11-07T11:00:00Z',
				text: 'Chipped eucalyptus branches into mulch for native plantings',
				icon: '✓',
				meta: '♻️ 3 cubic meters mulch created'
			}
		]
	},
	{
		intentionId: 'int-mushroom-001',
		title: 'Mushroom Cultivation Network',
		description: '**Cultivating food sovereignty** through the ancient practice of mushroom growing, adapted for modern community needs. We\'re building a regional network of growers who share *techniques, spores, and growing spaces* to make nutritious protein accessible to everyone. Our focus includes oyster and shiitake mushrooms for food, plus medicinal varieties like reishi and lion\'s mane.\n\nThe heart of our network is a **community spore library** and hands-on education program. We teach workshops on log inoculation, substrate preparation, and fruiting chamber construction using recycled materials. Whether you have a shady backyard, a basement corner, or access to fresh hardwood logs, we\'ll help you start producing mushrooms. Our collective knowledge grows with *every successful harvest*.\n\nMushrooms teach us about **mycelial wisdom**—the power of networks, decomposition as transformation, and thriving in the shadows. This isn\'t just agriculture; it\'s participating in nature\'s most elegant recycling system. Join us in spreading *fungal abundance* through the community, one inoculated log at a time.',
		category: 'Organic Food & Nutrition',
		createdBy: 'user-fungal-001',
		createdAt: '2024-10-05T16:45:00Z',
		status: 'active',
		location: {
			name: 'Regional network',
			coords: [40.2100, -8.4050]
		},
		media: ['/MushroomCultivation.png'],
		stats: {
			totalAttentionHours: 2134,
			participantCount: 56,
			activeDays: 35,
			percentManifested: 88
		},
		topContributors: [
			{
				userId: 'user-aisha-001',
				name: 'Aisha Patel',
				avatar: '🌿',
				hours: 287,
				role: 'Cultivation Expert'
			}
		],
		recentActivity: [
			{
				activityId: 'act-mush-001',
				type: 'proof_posted',
				userId: 'user-aisha-001',
				userName: 'Aisha Patel',
				timestamp: '2025-11-09T13:15:00Z',
				text: 'Taught mushroom cultivation workshop with 18 participants',
				icon: '✓',
				tokenEarned: {
					tokenId: 'tok-mush-001',
					hours: 6
				},
				meta: '🏆 Earned 6h Token • 45 logs inoculated'
			},
			{
				activityId: 'act-mush-002',
				type: 'proof_posted',
				userId: 'user-sarah-001',
				userName: 'Sarah Kim',
				timestamp: '2025-11-08T09:30:00Z',
				text: 'Built humidity-controlled fruiting chamber from recycled materials',
				icon: '✓',
				meta: '🍄 12 kg oyster mushrooms harvested last cycle'
			},
			{
				activityId: 'act-mush-003',
				type: 'intention_joined',
				userId: 'user-truman-001',
				userName: 'Dr. Truman Ellis',
				timestamp: '2025-11-07T15:00:00Z',
				text: 'Joined to contribute computational modeling for yield optimization',
				icon: '🌟',
				meta: '📊 Data scientist • 2,134h community attention'
			}
		]
	},
	{
		intentionId: 'int-solar-001',
		title: 'Solar Dehydrator Workshop',
		description: '**Harnessing the sun\'s power** for food preservation without electricity or fossil fuels. We\'re teaching community members to construct passive solar dehydrators using *recycled glass, reclaimed wood, and simple materials*. These elegant systems dry herbs, fruits, vegetables, and medicinal plants using nothing but solar heat and natural convection.\n\nOur workshops are **hands-on building experiences** where participants construct their own dehydrator to take home. We cover design principles, optimal angle calculations for your latitude, material selection, and food preservation techniques. By the end, you\'ll understand the physics of solar drying and have *practical skills* for off-grid food storage. No previous carpentry experience required—just curiosity and commitment.\n\nThis is appropriate technology at its finest: **simple, effective, and empowering**. A well-built solar dehydrator can preserve hundreds of pounds of produce annually, capturing summer\'s abundance for winter\'s scarcity. Join us in building *resilient food systems* that don\'t depend on the grid. Your harvest—and your community—will thank you.',
		category: 'Off-Grid & Sustainable Living',
		createdBy: 'user-solar-001',
		createdAt: '2024-11-01T09:00:00Z',
		status: 'active',
		location: {
			name: 'Workshop Barn',
			coords: [40.2040, -8.4095]
		},
		media: ['/SolarDehydrator.png'],
		stats: {
			totalAttentionHours: 2145,
			participantCount: 43,
			activeDays: 8,
			percentManifested: 45
		},
		topContributors: [
			{
				userId: 'user-truman-001',
				name: 'Dr. Truman Ellis',
				avatar: '/Truman.jpeg',
				hours: 189,
				role: 'Workshop Lead'
			},
			{
				userId: 'user-sarah-001',
				name: 'Sarah Kim',
				avatar: '🌱',
				hours: 124,
				role: 'Materials Coordinator'
			}
		],
		recentActivity: [
			{
				activityId: 'act-solar-001',
				type: 'proof_posted',
				userId: 'user-truman-001',
				userName: 'Dr. Truman Ellis',
				timestamp: '2025-11-09T10:00:00Z',
				text: 'Taught solar dehydrator workshop with 12 participants building their own units',
				icon: '✓',
				tokenEarned: {
					tokenId: 'tok-solar-001',
					hours: 5
				},
				meta: '🏆 Earned 5h Token • 12 dehydrators built'
			},
			{
				activityId: 'act-solar-002',
				type: 'proof_posted',
				userId: 'user-sarah-001',
				userName: 'Sarah Kim',
				timestamp: '2025-11-08T14:30:00Z',
				text: 'Collected and organized recycled materials for 8 new dehydrator builds',
				icon: '✓',
				meta: '♻️ Glass panels and cedar frames sourced'
			},
			{
				activityId: 'act-solar-003',
				type: 'intention_joined',
				userId: 'user-marcus-001',
				userName: 'Marcus Chen',
				timestamp: '2025-11-07T09:15:00Z',
				text: 'Joined to help with carpentry and design improvements',
				icon: '🌟',
				meta: '🔨 Builder • 2,145h community attention'
			},
			{
				activityId: 'act-solar-004',
				type: 'proof_posted',
				userId: 'user-sarah-001',
				userName: 'Sarah Kim',
				timestamp: '2025-11-06T16:00:00Z',
				text: 'Successfully dried 15kg of tomatoes and herbs using completed dehydrators',
				icon: '✓',
				meta: '☀️ Food preservation results shared • Zero electricity used'
			}
		]
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
		userAvatar: '/Truman.jpeg',
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
		userAvatar: '/Truman.jpeg',
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
		userAvatar: '/Truman.jpeg',
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

// Helper Functions for Public Profile
export function getUserByUsername(username: string): User | undefined {
	// In real app, this would query the database
	if (username === currentUser.username) {
		return currentUser;
	}
	return undefined;
}

export function getUserVisibleSections(userId: string, viewerRole: 'public' | 'members' | 'connections' | 'friends'): Record<string, boolean> {
	if (userId === currentUser.userId) {
		// Viewing own profile - show everything
		return {
			bio: true,
			achievements: true,
			offerings: true,
			intentions: true,
			tokens: true,
			connections: true,
			activity: true
		};
	}

	// Check visibility settings
	const visibility = currentUser.profileVisibility;
	const canView = (setting: string): boolean => {
		const level = visibility[setting];
		if (level === 'public') return true;
		if (level === 'members' && ['members', 'connections', 'friends'].includes(viewerRole)) return true;
		if (level === 'connections' && ['connections', 'friends'].includes(viewerRole)) return true;
		if (level === 'friends' && viewerRole === 'friends') return true;
		return false;
	};

	return {
		bio: canView('bio'),
		achievements: canView('achievements'),
		offerings: canView('offerings'),
		intentions: canView('intentions'),
		tokens: canView('tokens'),
		connections: canView('connections'),
		activity: canView('activity')
	};
}

// Attention Switch Events - Mock data for all users
export const userAttentionLogs: UserAttentionLog[] = [
	{
		userId: 'user-truman-001',
		userName: 'Dr. Truman Ellis',
		userAvatar: '/Truman.jpeg',
		events: [
			{
				eventId: 'evt-truman-001',
				userId: 'user-truman-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T08:15:00Z'
			},
			{
				eventId: 'evt-truman-002',
				userId: 'user-truman-001',
				intentionId: 'int-solar-001',
				intentionTitle: 'Solar Dehydrator Workshop',
				timestamp: '2025-11-18T10:30:00Z'
			},
			{
				eventId: 'evt-truman-003',
				userId: 'user-truman-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T11:45:00Z'
			},
			{
				eventId: 'evt-truman-004',
				userId: 'user-truman-001',
				intentionId: 'int-mushroom-001',
				intentionTitle: 'Mushroom Cultivation Network',
				timestamp: '2025-11-18T14:20:00Z'
			}
		]
	},
	{
		userId: 'user-marcus-001',
		userName: 'Marcus Chen',
		userAvatar: '🔨',
		events: [
			{
				eventId: 'evt-marcus-001',
				userId: 'user-marcus-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T07:00:00Z'
			},
			{
				eventId: 'evt-marcus-002',
				userId: 'user-marcus-001',
				intentionId: 'int-eucalyptus-001',
				intentionTitle: 'Eucalyptus Removal Brigade',
				timestamp: '2025-11-18T09:30:00Z'
			},
			{
				eventId: 'evt-marcus-003',
				userId: 'user-marcus-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T12:00:00Z'
			},
			{
				eventId: 'evt-marcus-004',
				userId: 'user-marcus-001',
				intentionId: 'int-solar-001',
				intentionTitle: 'Solar Dehydrator Workshop',
				timestamp: '2025-11-18T15:30:00Z'
			}
		]
	},
	{
		userId: 'user-aisha-001',
		userName: 'Aisha Patel',
		userAvatar: '🌿',
		events: [
			{
				eventId: 'evt-aisha-001',
				userId: 'user-aisha-001',
				intentionId: 'int-mushroom-001',
				intentionTitle: 'Mushroom Cultivation Network',
				timestamp: '2025-11-18T06:30:00Z'
			},
			{
				eventId: 'evt-aisha-002',
				userId: 'user-aisha-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T08:45:00Z'
			},
			{
				eventId: 'evt-aisha-003',
				userId: 'user-aisha-001',
				intentionId: 'int-mushroom-001',
				intentionTitle: 'Mushroom Cultivation Network',
				timestamp: '2025-11-18T11:15:00Z'
			},
			{
				eventId: 'evt-aisha-004',
				userId: 'user-aisha-001',
				intentionId: 'int-eucalyptus-001',
				intentionTitle: 'Eucalyptus Removal Brigade',
				timestamp: '2025-11-18T13:00:00Z'
			},
			{
				eventId: 'evt-aisha-005',
				userId: 'user-aisha-001',
				intentionId: 'int-mushroom-001',
				intentionTitle: 'Mushroom Cultivation Network',
				timestamp: '2025-11-18T15:00:00Z'
			}
		]
	},
	{
		userId: 'user-sarah-001',
		userName: 'Sarah Kim',
		userAvatar: '🌱',
		events: [
			{
				eventId: 'evt-sarah-001',
				userId: 'user-sarah-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T07:30:00Z'
			},
			{
				eventId: 'evt-sarah-002',
				userId: 'user-sarah-001',
				intentionId: 'int-solar-001',
				intentionTitle: 'Solar Dehydrator Workshop',
				timestamp: '2025-11-18T10:00:00Z'
			},
			{
				eventId: 'evt-sarah-003',
				userId: 'user-sarah-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T13:30:00Z'
			}
		]
	},
	{
		userId: 'user-james-001',
		userName: 'James Rodriguez',
		userAvatar: '💧',
		events: [
			{
				eventId: 'evt-james-001',
				userId: 'user-james-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T08:00:00Z'
			},
			{
				eventId: 'evt-james-002',
				userId: 'user-james-001',
				intentionId: 'int-eucalyptus-001',
				intentionTitle: 'Eucalyptus Removal Brigade',
				timestamp: '2025-11-18T11:00:00Z'
			},
			{
				eventId: 'evt-james-003',
				userId: 'user-james-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T14:00:00Z'
			}
		]
	},
	{
		userId: 'user-miguel-001',
		userName: 'Miguel Santos',
		userAvatar: '🪓',
		events: [
			{
				eventId: 'evt-miguel-001',
				userId: 'user-miguel-001',
				intentionId: 'int-eucalyptus-001',
				intentionTitle: 'Eucalyptus Removal Brigade',
				timestamp: '2025-11-18T06:00:00Z'
			},
			{
				eventId: 'evt-miguel-002',
				userId: 'user-miguel-001',
				intentionId: 'int-solar-001',
				intentionTitle: 'Solar Dehydrator Workshop',
				timestamp: '2025-11-18T09:00:00Z'
			},
			{
				eventId: 'evt-miguel-003',
				userId: 'user-miguel-001',
				intentionId: 'int-eucalyptus-001',
				intentionTitle: 'Eucalyptus Removal Brigade',
				timestamp: '2025-11-18T10:30:00Z'
			},
			{
				eventId: 'evt-miguel-004',
				userId: 'user-miguel-001',
				intentionId: 'int-garden-001',
				intentionTitle: 'Community Garden Infrastructure',
				timestamp: '2025-11-18T13:45:00Z'
			}
		]
	}
];

// Helper function to get attention log for a user
export function getUserAttentionLog(userId: string): UserAttentionLog | undefined {
	return userAttentionLogs.find((log) => log.userId === userId);
}

// Helper function to get all attention logs (for community view)
export function getAllUserAttentionLogs(): UserAttentionLog[] {
	return userAttentionLogs;
}

// Calculate attention durations from switch events for a specific intention
export function getIntentionAttentionSummary(intentionId: string): IntentionAttentionSummary {
	const durations: AttentionDuration[] = [];
	const userTotals: Map<string, { userName: string; userAvatar: string; totalMinutes: number }> = new Map();

	// Process each user's attention log
	for (const userLog of userAttentionLogs) {
		const events = userLog.events;

		// Find all sessions where user focused on this intention
		for (let i = 0; i < events.length; i++) {
			const currentEvent = events[i];

			// If this event is for our target intention
			if (currentEvent.intentionId === intentionId) {
				const startTime = new Date(currentEvent.timestamp);
				let endTime: Date;
				let durationMinutes: number;

				// Find the next event (when they switched away)
				if (i + 1 < events.length) {
					// They switched to another intention
					endTime = new Date(events[i + 1].timestamp);
				} else {
					// This is their last event - assume they're still working on it (1 hour default)
					endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
				}

				// Calculate duration in minutes
				durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

				// Create duration record
				durations.push({
					userId: userLog.userId,
					userName: userLog.userName,
					userAvatar: userLog.userAvatar,
					intentionId: intentionId,
					startTime: currentEvent.timestamp,
					endTime: endTime.toISOString(),
					durationMinutes: durationMinutes
				});

				// Update user totals
				if (!userTotals.has(userLog.userId)) {
					userTotals.set(userLog.userId, {
						userName: userLog.userName,
						userAvatar: userLog.userAvatar,
						totalMinutes: 0
					});
				}
				const userTotal = userTotals.get(userLog.userId)!;
				userTotal.totalMinutes += durationMinutes;
			}
		}
	}

	// Convert user totals to array and sort by total time
	const userSummaries = Array.from(userTotals.entries())
		.map(([userId, data]) => ({
			userId,
			userName: data.userName,
			userAvatar: data.userAvatar,
			totalMinutes: data.totalMinutes
		}))
		.sort((a, b) => b.totalMinutes - a.totalMinutes);

	// Sort durations chronologically
	durations.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

	return {
		intentionId,
		userSummaries,
		durations
	};
}

// Mock Substack Articles Data
export const mockArticles: Article[] = [
	{
		id: 'article-001',
		title: 'The Sacred Geometry of Gift Economies',
		subtitle: 'Exploring how #AguaLila principles mirror natural flow patterns',
		preview:
			'In observing water systems at Agua Lila, we noticed something profound: the way water moves through our landscape follows patterns remarkably similar to gift economies. Water doesn\'t accumulate in one place indefinitely—it flows, nourishes, and continues its journey. This natural wisdom offers insights for building regenerative community systems.',
		substackUrl: 'https://aeonmyths.substack.com/p/sacred-geometry-gift-economies',
		imageUrl: '/AguaLila.png',
		hashtags: ['AguaLila', 'Philosophy', 'GiftEconomy'],
		publishedDate: '2024-11-01T10:00:00Z',
		rawContent:
			'Full article content with HTML formatting would go here. This is a placeholder for the complete article text extracted from Substack.',
		readingTime: 8
	},
	{
		id: 'article-002',
		title: 'Building Regenerative Community Infrastructure',
		subtitle: 'From chicken coops to composting systems—the #Infrastructure of abundance',
		preview:
			'Real community resilience isn\'t built on ideology alone. It requires practical infrastructure that supports regenerative living. At Agua Lila, we\'ve learned that every physical system we build—from water catchment to animal shelters—teaches us about designing for abundance rather than scarcity.',
		substackUrl: 'https://aeonmyths.substack.com/p/regenerative-infrastructure',
		imageUrl: '/CommunityGarden.png',
		hashtags: ['Infrastructure', 'Community', 'Permaculture'],
		publishedDate: '2024-10-25T14:30:00Z',
		rawContent: 'Full article content with HTML formatting would go here.',
		readingTime: 10
	},
	{
		id: 'article-003',
		title: 'Computational Mysticism: Code as Sacred Practice',
		subtitle: 'How #Technology can serve spiritual evolution',
		preview:
			'We often think of technology and spirituality as opposites. But what if code could be a form of prayer? What if algorithms could encode our deepest values? At the intersection of computational thinking and mystical practice, we discover tools for building systems that reflect our highest aspirations.',
		substackUrl: 'https://aeonmyths.substack.com/p/computational-mysticism',
		imageUrl: undefined,
		hashtags: ['Technology', 'Philosophy', 'Mysticism'],
		publishedDate: '2024-10-15T09:00:00Z',
		rawContent: 'Full article content with HTML formatting would go here.',
		readingTime: 12
	},
	{
		id: 'article-004',
		title: 'The Attention Economy of the Sacred',
		subtitle: 'Reimagining value in #AguaLila communities',
		preview:
			'What if attention—our most precious resource—became the basis of a new economy? Not the extractive attention economy of social media, but a sacred attention economy where focus and presence create real value. This is the foundation of our time-based community currency experiments.',
		substackUrl: 'https://aeonmyths.substack.com/p/attention-economy-sacred',
		imageUrl: undefined,
		hashtags: ['AguaLila', 'Economics', 'Community'],
		publishedDate: '2024-10-05T16:45:00Z',
		rawContent: 'Full article content with HTML formatting would go here.',
		readingTime: 7
	},
	{
		id: 'article-005',
		title: 'Mycorrhizal Networks and Decentralized Systems',
		subtitle: 'What #Mushrooms teach us about P2P coordination',
		preview:
			'Beneath the forest floor, mushrooms form vast networks that share resources across entire ecosystems. These mycorrhizal networks operate without central control, yet coordinate complex exchanges. They\'re nature\'s peer-to-peer systems—and they offer profound lessons for building decentralized communities.',
		substackUrl: 'https://aeonmyths.substack.com/p/mycorrhizal-networks',
		imageUrl: '/MushroomCultivation.png',
		hashtags: ['Mushrooms', 'Permaculture', 'Technology'],
		publishedDate: '2024-09-28T11:20:00Z',
		rawContent: 'Full article content with HTML formatting would go here.',
		readingTime: 9
	}
];

// Helper function to get articles by hashtag
export function getArticlesByHashtag(hashtag: string): Article[] {
	if (hashtag === 'all') return mockArticles;
	return mockArticles.filter((article) => article.hashtags.includes(hashtag));
}

// Helper function to search articles
export function searchArticles(query: string): Article[] {
	const lowerQuery = query.toLowerCase();
	return mockArticles.filter(
		(article) =>
			article.title.toLowerCase().includes(lowerQuery) ||
			article.subtitle.toLowerCase().includes(lowerQuery) ||
			article.preview.toLowerCase().includes(lowerQuery) ||
			article.hashtags.some((tag) => tag.toLowerCase().includes(lowerQuery))
	);
}

// Helper function to get unique hashtags from all articles
export function getAllArticleHashtags(): string[] {
	const hashtagSet = new Set<string>();
	mockArticles.forEach((article) => {
		article.hashtags.forEach((tag) => hashtagSet.add(tag));
	});
	return Array.from(hashtagSet).sort();
}

// Itinerary Data
export const itineraryItems: ItineraryItem[] = [
	{
		id: 'itin-001',
		type: 'trip',
		title: 'Água Lila Residency',
		location: 'Água Lila, Portugal',
		locationIcon: '🌱',
		description: 'In residence building regenerative systems and facilitating community workshops. Available for consultations on gift economies and P2P coordination.',
		startDate: '2025-11-15T00:00:00Z',
		endDate: '2025-12-20T00:00:00Z',
		visibility: 'public'
	},
	{
		id: 'itin-002',
		type: 'event',
		title: 'New Moon Gathering',
		location: 'Oak Temple, Colorado',
		locationIcon: '🌙',
		description: 'Monthly ceremony and community coordination meeting. Open to all temple members.',
		startDate: '2026-01-17T00:00:00Z',
		time: '7:00 PM',
		visibility: 'public'
	},
	{
		id: 'itin-003',
		type: 'trip',
		title: 'Traveling through Bali',
		location: 'Bali, Indonesia',
		locationIcon: '🌍',
		description: 'Exploring regenerative communities and teaching computational modeling workshops. Limited availability for remote consulting.',
		startDate: '2026-01-01T00:00:00Z',
		endDate: '2026-01-31T00:00:00Z',
		visibility: 'public'
	},
	{
		id: 'itin-004',
		type: 'event',
		title: 'Gift Economy Workshop',
		location: 'Online / Virtual',
		locationIcon: '💻',
		description: 'Teaching the foundations of time-based currencies and attention economies. Interactive session with Q&A.',
		startDate: '2025-12-10T00:00:00Z',
		time: '3:00 PM UTC',
		visibility: 'public'
	}
];

// Helper function to get visible itinerary items
export function getVisibleItineraryItems(viewerRole: 'public' | 'members' | 'connections' | 'friends' = 'public'): ItineraryItem[] {
	return itineraryItems.filter((item) => {
		if (item.visibility === 'public') return true;
		if (item.visibility === 'members' && ['members', 'connections', 'friends'].includes(viewerRole)) return true;
		if (item.visibility === 'connections' && ['connections', 'friends'].includes(viewerRole)) return true;
		if (item.visibility === 'friends' && viewerRole === 'friends') return true;
		return false;
	});
}

// Helper function to get upcoming itinerary items (sorted by date)
export function getUpcomingItinerary(): ItineraryItem[] {
	const now = new Date();
	return itineraryItems
		.filter((item) => new Date(item.endDate || item.startDate) >= now)
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}
