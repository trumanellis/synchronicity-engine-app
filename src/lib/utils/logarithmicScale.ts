/**
 * Logarithmic Scaling Utilities
 * Calculate size based on logarithmic scale to prevent extreme variations
 *
 * Like adaptive mesh refinement in CFD - size scales logarithmically
 * to maintain perceptual uniformity across orders of magnitude
 */

/**
 * Calculate coin/card size based on attention hours using logarithmic scale
 *
 * Formula: size = baseSize + (scaleFactor × log₁₀(hours + 1))
 *
 * This creates a perceptually uniform scale similar to:
 * - Richter scale (earthquakes)
 * - Decibels (sound intensity)
 * - Stellar magnitude (brightness)
 *
 * @param attentionHours - Total attention in hours
 * @param baseSize - Minimum size in pixels (default: 80)
 * @param scaleFactor - How much each order of magnitude adds (default: 20)
 * @returns Size in pixels
 */
export function calculateCoinSize(
	attentionHours: number,
	baseSize: number = 60,
	scaleFactor: number = 20
): number {
	// Add 1 to prevent log(0) issues
	// log₁₀(1) = 0, so 0 hours gives baseSize
	const logScale = Math.log10(attentionHours + 1);
	const size = baseSize + scaleFactor * logScale;

	// Round to nearest pixel
	return Math.round(size);
}

/**
 * Get size category based on attention hours
 * Useful for applying different styles or behaviors
 *
 * @param attentionHours - Total attention in hours
 * @returns Category: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
 */
export function getSizeCategory(attentionHours: number): 'tiny' | 'small' | 'medium' | 'large' | 'huge' {
	if (attentionHours < 1) return 'tiny';
	if (attentionHours < 10) return 'small';
	if (attentionHours < 100) return 'medium';
	if (attentionHours < 1000) return 'large';
	return 'huge';
}

/**
 * Calculate scale examples for documentation/debugging
 * @returns Array of example scale points
 */
export function getScaleExamples(): Array<{ hours: number; size: number }> {
	const examples = [0.1, 1, 10, 50, 100, 500, 1000, 5000, 10000];
	return examples.map((hours) => ({
		hours,
		size: calculateCoinSize(hours)
	}));
}
