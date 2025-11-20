// Synchronicity Engine - TypeScript Type Definitions

export interface User {
	userId: string;
	username: string; // URL slug for public profile
	name: string;
	avatar: string;
	bio: string;
	joinDate: string;
	temple: UserTemple;
	stats: UserStats;
	paymentMethods: PaymentMethod[];
	offerings: Offering[];
	achievements: Achievement[];
	profileVisibility: Record<string, VisibilityLevel>;
	substackUrl?: string; // Optional Substack publication URL
}

export interface UserTemple {
	templeId: string;
	templeName: string;
	templeIcon: string;
	location: string;
	memberCount: number;
	monthlyContribution: number;
	role: string;
}

export interface UserStats {
	tokensHeld: number;
	totalHoursEarned: number;
	activeIntentions: number;
	connections: number;
	fulfillmentsCompleted: number;
	distributionsReceived: number;
}

export interface PaymentMethod {
	id: string;
	type: 'bank_transfer' | 'paypal' | 'venmo' | 'crypto';
	lastFour: string;
	isPrimary: boolean;
}

export interface Temple {
	templeId: string;
	name: string;
	icon: string;
	description: string;
	location: Location;
	founded: string;
	memberCount: number;
	stats: TempleStats;
	categories: string[];
	values: string[];
}

export interface Location {
	name: string;
	region: string;
	coords?: [number, number];
}

export interface TempleStats {
	activeIntentions: number;
	totalTokensCirculating: number;
	monthlyPoolCurrent: number;
	nextDistribution: string;
	daysUntilDistribution: number;
}

export interface Intention {
	intentionId: string;
	title: string;
	description: string;
	category: string;
	createdBy: string;
	createdAt: string;
	status: 'active' | 'fulfilled' | 'archived';
	location: {
		name: string;
		proximity: 'local' | 'nearby' | 'regional' | 'on-site';
	};
	media?: string[];
	stats: IntentionStats;
	topContributors: Contributor[];
	recentActivity: Activity[];
	visibility?: VisibilityLevel; // Optional visibility setting for profile display
}

export interface IntentionStats {
	totalAttentionHours: number;
	participantCount: number;
	activeDays: number;
	impactLevel: 'low' | 'medium' | 'high';
}

export interface Contributor {
	userId: string;
	name: string;
	avatar: string;
	hours: number;
	role: string;
}

export interface Activity {
	activityId: string;
	type:
		| 'proof_posted'
		| 'token_released'
		| 'intention_joined'
		| 'milestone_reached'
		| 'fulfillment_completed';
	userId?: string;
	userName?: string;
	timestamp: string;
	text: string;
	meta?: string;
	icon: string;
	tokenEarned?: {
		tokenId: string;
		hours: number;
	};
}

export interface Token {
	tokenId: string;
	intentionId: string;
	submittedBy: string;
	steward: string;
	parent: string | null;
	title: string;
	description: string;
	media?: string[];
	timestamp: string;
	location?: {
		name: string;
		coords?: [number, number];
	};
	blessings?: Blessing[];
	computed: TokenComputed;
	status: 'available' | 'bid' | 'released' | 'historical';
	category?: string;
	tags?: string[];
}

export interface Blessing {
	giverId: string;
	attentionIndex: number;
	polarity: 1 | -1;
	durationMs: number;
}

export interface TokenComputed {
	totalDurationMs: number;
	totalValueMs: number;
	supporters: number;
	challengers: number;
	hours: number;
}

export interface Distribution {
	distributionId: string;
	cycle: string;
	newMoonDate: string;
	biddingPeriod: {
		start: string;
		end: string;
		daysRemaining: number;
	};
	pool: {
		totalUSD: number;
		source: string;
		contributors: number;
	};
	stats: DistributionStats;
	userBid: UserBid;
}

export interface DistributionStats {
	membersBidding: number;
	totalHoursBid: number;
	averageBidHours: number;
	estimatedShareMultiplier: number;
}

export interface UserBid {
	status: 'not_submitted' | 'submitted' | 'finalized';
	tokensSelected: string[];
	totalHours: number;
	estimatedShare: number;
}

export interface Connection {
	userId: string;
	name: string;
	avatar: string;
	connectionDate: string;
	stats: ConnectionStats;
	sharedIntentions: string[];
	bio: string;
}

export interface ConnectionStats {
	exchangesCompleted: number;
	trustLevel: 'low' | 'medium' | 'high';
	lastInteraction: string;
}

export interface ChatMessage {
	messageId: string;
	userId: string;
	userName: string;
	avatar: string;
	text: string;
	timestamp: string;
	reactions?: string[];
}

export interface GroupChat {
	chatId: string;
	intentionId: string;
	intentionTitle: string;
	participantCount: number;
	messages: ChatMessage[];
	unreadCount: number;
}

export interface ProofOfService {
	proofId: string;
	intentionId: string;
	userId: string;
	userName: string;
	userAvatar: string;
	title: string;
	description: string;
	hoursWorked: number;
	media?: string[];
	timestamp: string;
	status: 'pending' | 'approved' | 'token_created';
	witnessIds?: string[];
	tokenId?: string;
	location?: {
		name: string;
		coords?: [number, number];
	};
}

// UI State Types
export type NavTab = 'home' | 'browse' | 'create' | 'tokens' | 'profile';

export type ViewMode = 'discovery' | 'details' | 'activity' | 'participation';

export type FilterCategory =
	| 'All'
	| 'Off-Grid & Sustainable Living'
	| 'Health & Vitality'
	| 'Organic Food & Nutrition'
	| 'Community Abundance'
	| 'Self & Spiritual Development'
	| 'Land Stewardship'
	| 'Creative Expression';

export type SortOption = 'trending' | 'recent' | 'high-impact' | 'nearby';

export type TokenFilter = 'available' | 'bid' | 'historical' | 'all';

export type ProfileTab = 'tokens' | 'fulfillments' | 'connections' | 'settings';

// Bio Card & Public Profile Types
export type VisibilityLevel = 'public' | 'members' | 'connections' | 'friends' | 'groups' | 'private';

export interface Offering {
	offeringId: string;
	title: string;
	description: string;
	category: string;
	media?: string[];
	availability: 'available' | 'limited' | 'unavailable';
	tags?: string[];
	visibility?: VisibilityLevel; // Optional visibility setting for profile display
}

export interface Achievement {
	achievementId: string;
	title: string;
	description: string;
	icon: string;
	earnedDate: string;
	category: 'contribution' | 'milestone' | 'badge' | 'special';
	rarity: 'common' | 'rare' | 'legendary';
}

export interface ProfileSection {
	sectionId: string;
	title: string;
	icon: string;
	visibility: VisibilityLevel;
	content: any;
}

export interface PublicProfile extends User {
	visibleSections: ProfileSection[];
	canEdit: boolean;
}

// Attention Switch Event - Logs when users focus on intentions
export interface AttentionSwitchEvent {
	eventId: string;
	userId: string;
	intentionId: string;
	intentionTitle: string;
	timestamp: string; // When they switched their attention to this intention
}

export interface UserAttentionLog {
	userId: string;
	userName: string;
	userAvatar: string;
	events: AttentionSwitchEvent[];
}

// Attention Duration - Calculated from consecutive switch events
export interface AttentionDuration {
	userId: string;
	userName: string;
	userAvatar: string;
	intentionId: string;
	startTime: string;
	endTime: string;
	durationMinutes: number;
}

export interface IntentionAttentionSummary {
	intentionId: string;
	userSummaries: Array<{
		userId: string;
		userName: string;
		userAvatar: string;
		totalMinutes: number;
	}>;
	durations: AttentionDuration[];
}

// Substack Article Types
export interface Article {
	id: string; // Unique ID generated from URL
	title: string;
	subtitle: string; // First paragraph or excerpt
	preview: string; // First 2 paragraphs for preview
	substackUrl: string; // Link to full article on Substack
	imageUrl?: string; // Featured image URL
	hashtags: string[]; // Extracted hashtags (e.g., ["AguaLila", "Philosophy"])
	publishedDate: string; // ISO 8601 format
	rawContent: string; // Full article HTML content
	readingTime: number; // Estimated reading time in minutes
}

export interface ArticleFilters {
	selectedHashtag: string; // 'all' or specific hashtag
	searchTerm: string; // Search query
}

// Itinerary Types
export interface ItineraryItem {
	id: string;
	type: 'trip' | 'event';
	title: string;
	location: string;
	locationIcon: string; // Emoji icon for location
	description: string;
	startDate: string; // ISO 8601 format
	endDate?: string; // Optional for events (single day)
	time?: string; // For events (e.g., "7:00 PM")
	visibility: VisibilityLevel;
}
