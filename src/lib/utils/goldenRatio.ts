/**
 * Golden Ratio Utility System
 * Based on φ (phi) = 1.618... for mathematical harmony in design
 *
 * Provides scaling functions for:
 * - Typography (font sizes)
 * - Spacing (padding, margins, gaps)
 * - Animation durations
 * - Layout proportions
 */

// Mathematical Constants
export const PHI = 1.618033988749894; // (1 + √5) / 2
export const PHI_INVERSE = 0.618033988749894; // 1/φ ≈ 61.8%
export const SMALL_RATIO = 0.381966011250105; // 1 - 1/φ ≈ 38.2%

/**
 * Typography Scale: φ^(-n) progression from 32px base
 *
 * @param level - Iteration level (0 = largest, 1-3 = smaller)
 * @returns Font size in pixels, bounded between 8px and 72px
 *
 * Examples:
 * - Level 0: 32.0px (hero titles, primary elements)
 * - Level 1: 19.8px (section headers, card titles)
 * - Level 2: 12.2px (body text, metadata)
 * - Level 3: 8.0px (minimum, small labels)
 */
export function getFontSize(level: number, baseSize: number = 32): number {
	const size = baseSize * Math.pow(PHI_INVERSE, level);
	return Math.max(8, Math.min(72, size));
}

/**
 * Spacing Scale: φ^(-n) progression from 48px base
 *
 * @param level - Spacing level (0 = largest, 4 = smallest)
 * @returns Spacing value in pixels, rounded
 *
 * Examples:
 * - Level 0: 48px (major section gaps)
 * - Level 1: 30px (section spacing)
 * - Level 2: 18px (card gaps)
 * - Level 3: 12px (internal padding)
 * - Level 4: 8px (tight spacing)
 */
export function getSpacing(level: number, baseSpacing: number = 48): number {
	const spacing = baseSpacing * Math.pow(PHI_INVERSE, level);
	return Math.round(spacing);
}

/**
 * Animation Duration Scale: φ^(-n) progression from 3s base
 *
 * @param level - Animation level (0 = longest, 2 = shortest)
 * @returns Duration in seconds
 *
 * Examples:
 * - Level 0: 3.0s (slow, prominent animations)
 * - Level 1: 1.85s (medium speed)
 * - Level 2: 1.15s (fast, subtle animations)
 */
export function getAnimationDuration(level: number, baseDuration: number = 3): number {
	return baseDuration * Math.pow(PHI_INVERSE, level);
}

/**
 * Golden Ratio Layout Split
 *
 * Divides a total dimension into golden ratio proportions
 *
 * @param total - Total height or width to split
 * @returns Object with small (38.2%) and large (61.8%) portions
 */
export function getGoldenSplit(total: number) {
	return {
		small: Math.round(total * SMALL_RATIO), // 38.2%
		large: Math.round(total * PHI_INVERSE) // 61.8%
	};
}

/**
 * Validate Golden Ratio Split
 *
 * Checks if two values approximate golden ratio proportions
 *
 * @param small - Smaller value
 * @param large - Larger value
 * @param tolerance - Acceptable deviation (default 0.01)
 * @returns true if ratio is within tolerance of φ
 */
export function isGoldenRatio(small: number, large: number, tolerance: number = 0.01): boolean {
	const total = small + large;
	const ratio = large / total;
	return Math.abs(ratio - PHI_INVERSE) < tolerance;
}

/**
 * Font Size Presets (Common Use Cases)
 */
export const FontSizes = {
	hero: getFontSize(0), // 32px
	title: getFontSize(1), // 19.8px
	body: getFontSize(2), // 12.2px
	caption: getFontSize(3) // 8px
} as const;

/**
 * Spacing Presets (Common Use Cases)
 */
export const Spacing = {
	section: getSpacing(0), // 48px
	large: getSpacing(1), // 30px
	medium: getSpacing(2), // 18px
	small: getSpacing(3), // 12px
	tiny: getSpacing(4) // 8px
} as const;

/**
 * Animation Duration Presets
 */
export const Durations = {
	slow: getAnimationDuration(0), // 3s
	medium: getAnimationDuration(1), // 1.85s
	fast: getAnimationDuration(2) // 1.15s
} as const;
