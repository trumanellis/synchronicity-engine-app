/**
 * Card Transformers - Utilities to convert various data types to ContentCard format
 * Enables reusability of ContentCard across different content types
 */

import type { Intention, ProofOfService, Token, Offering } from '$types';
import { formatTimeAgo, userTokens } from '$data/mockData';

/**
 * Calculate percentage done for an intention
 * Based on released blessings (tokens created) / total attention received
 */
function calculatePercentDone(intention: Intention): number {
	// Get all tokens created for this intention
	const intentionTokens = userTokens.filter(token => token.intentionId === intention.intentionId);

	// Sum up hours from all tokens (released blessings)
	const releasedHours = intentionTokens.reduce((sum, token) => sum + (token.computed?.hours || 0), 0);

	// Calculate percentage
	const totalHours = intention.stats.totalAttentionHours;
	if (totalHours === 0) return 0;

	return Math.min(100, Math.round((releasedHours / totalHours) * 100));
}

/**
 * Transform Intention to ContentCard format
 */
export function intentionToCard(intention: Intention) {
	const percentDone = calculatePercentDone(intention);

	return {
		imageUrl: intention.media && intention.media.length > 0 ? intention.media[0] : '/IntentionDefault.png',
		imageAlt: intention.title,
		imagePlaceholder: getCategoryEmoji(intention.category),
		title: intention.title,
		subtitle: intention.description.slice(0, 100) + (intention.description.length > 100 ? '...' : ''),
		tags: [intention.category],
		metrics: [
			{
				icon: '👁️',
				value: intention.stats.totalAttentionHours.toLocaleString(),
				label: 'hours'
			},
			{
				icon: '✨',
				value: `${percentDone}%`,
				label: 'manifested'
			}
		],
		date: '', // Intentions don't have a specific date
		actionText: 'View Details',
		actionIcon: '→',
		variant: 'default',
		onClick: undefined // Will be set by parent component
	} as const;
}

/**
 * Transform ProofOfService to ContentCard format
 */
export function proofToCard(proof: ProofOfService) {
	return {
		imageUrl: proof.media && proof.media.length > 0 ? proof.media[0] : null,
		imageAlt: proof.title,
		imagePlaceholder: '📷',
		title: proof.title,
		subtitle: proof.description.slice(0, 100) + (proof.description.length > 100 ? '...' : ''),
		tags: [proof.status, ...(proof.location ? [proof.location.name] : [])],
		metrics: [
			{
				icon: '⏱️',
				value: proof.hoursWorked,
				label: 'hours'
			},
			...(proof.witnessIds && proof.witnessIds.length > 0
				? [
						{
							icon: '👥',
							value: proof.witnessIds.length,
							label: 'witnesses'
						}
					]
				: [])
		],
		date: formatTimeAgo(proof.timestamp),
		actionText: 'View Proof',
		actionIcon: '→',
		variant: proof.status === 'token_created' ? 'featured' : 'default',
		onClick: undefined // Will be set by parent component
	} as const;
}

/**
 * Transform Token to ContentCard format
 */
export function tokenToCard(token: Token) {
	return {
		imageUrl: null,
		imageAlt: token.name,
		imagePlaceholder: '💎',
		title: token.name,
		subtitle: token.description || 'Community token representing verified contribution',
		tags: [token.category, `${token.totalSupply} supply`],
		metrics: [
			{
				icon: '👤',
				value: token.holdersCount || 0,
				label: 'holders'
			},
			{
				icon: '⏱️',
				value: token.baseHoursValue,
				label: 'hours value'
			}
		],
		date: formatTimeAgo(token.creationDate),
		actionText: 'View Token',
		actionIcon: '💎',
		variant: 'default',
		onClick: undefined // Will be set by parent component
	} as const;
}

/**
 * Get emoji for intention category
 */
function getCategoryEmoji(category: string): string {
	const emojiMap: Record<string, string> = {
		'Organic Food & Nutrition': '🌱',
		'Land Stewardship': '🌳',
		'Off-Grid & Sustainable Living': '☀️',
		'Health & Vitality': '💪',
		'Community Abundance': '🤝',
		'Self & Spiritual Development': '🧘',
		'Creative Expression': '🎨'
	};
	return emojiMap[category] || '🎯';
}

/**
 * Batch transform intentions to cards
 */
export function intentionsToCards(intentions: Intention[]) {
	return intentions.map(intentionToCard);
}

/**
 * Batch transform proofs to cards
 */
export function proofsToCards(proofs: ProofOfService[]) {
	return proofs.map(proofToCard);
}

/**
 * Batch transform tokens to cards
 */
export function tokensToCards(tokens: Token[]) {
	return tokens.map(tokenToCard);
}

/**
 * Transform Offering to ContentCard format
 */
export function offeringToCard(offering: Offering) {
	// Determine status icon
	const statusIcon =
		offering.status === 'active' ? '✓' :
		offering.status === 'completed' ? '✕' : '📦';

	return {
		imageUrl: offering.media && offering.media.length > 0 ? offering.media[0] : '/OfferingDefault.png',
		imageAlt: offering.title,
		imagePlaceholder: getCategoryEmoji(offering.category),
		title: offering.title,
		subtitle: offering.description.slice(0, 100) + (offering.description.length > 100 ? '...' : ''),
		tags: [offering.category, offering.location.name],
		metrics: [
			{
				icon: statusIcon,
				value: offering.status.toUpperCase(),
				label: 'status'
			},
			{
				icon: '👥',
				value: offering.stats.totalRecipients,
				label: 'recipients'
			}
		],
		date: formatTimeAgo(offering.createdAt),
		actionText: 'Request Service',
		actionIcon: '💬',
		variant: 'default',
		onClick: undefined // Will be set by parent component
	} as const;
}

/**
 * Batch transform offerings to cards
 */
export function offeringsToCards(offerings: Offering[]) {
	return offerings.map(offeringToCard);
}
