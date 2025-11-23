/**
 * Time Formatting Utilities
 * Converts hours/minutes/seconds into human-readable format
 */

export interface TimeBreakdown {
	years: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

/**
 * Convert total hours to a breakdown of years, days, hours, minutes, seconds
 * @param totalHours - Total time in hours (can be fractional)
 * @returns TimeBreakdown object
 */
export function breakdownTime(totalHours: number): TimeBreakdown {
	// Convert hours to seconds for precise calculation
	let remainingSeconds = Math.floor(totalHours * 3600);

	// Calculate years (365 days)
	const years = Math.floor(remainingSeconds / (365 * 24 * 3600));
	remainingSeconds -= years * 365 * 24 * 3600;

	// Calculate days
	const days = Math.floor(remainingSeconds / (24 * 3600));
	remainingSeconds -= days * 24 * 3600;

	// Calculate hours
	const hours = Math.floor(remainingSeconds / 3600);
	remainingSeconds -= hours * 3600;

	// Calculate minutes
	const minutes = Math.floor(remainingSeconds / 60);
	remainingSeconds -= minutes * 60;

	// Remaining seconds
	const seconds = remainingSeconds;

	return { years, days, hours, minutes, seconds };
}

/**
 * Format time breakdown into compact human-readable string
 * Examples: "2y 145d 14h 32m 18s", "5d 3h 20m", "45m 12s"
 * @param totalHours - Total time in hours
 * @returns Formatted string
 */
export function formatTimeCompact(totalHours: number): string {
	const { years, days, hours, minutes, seconds } = breakdownTime(totalHours);

	const parts: string[] = [];

	if (years > 0) parts.push(`${years}y`);
	if (days > 0) parts.push(`${days}d`);
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (seconds > 0) parts.push(`${seconds}s`);

	// If nothing, return "0s"
	return parts.length > 0 ? parts.join(' ') : '0s';
}

/**
 * Format time breakdown showing only the most significant units (limit to 3)
 * Examples: "2y 145d 14h", "5d 3h 20m", "45m 12s"
 * @param totalHours - Total time in hours
 * @param maxUnits - Maximum number of units to display (default: 3)
 * @returns Formatted string
 */
export function formatTimeSignificant(totalHours: number, maxUnits: number = 3): string {
	const { years, days, hours, minutes, seconds } = breakdownTime(totalHours);

	const parts: string[] = [];

	if (years > 0) parts.push(`${years}y`);
	if (days > 0) parts.push(`${days}d`);
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (seconds > 0) parts.push(`${seconds}s`);

	// If nothing, return "0s"
	if (parts.length === 0) return '0s';

	// Return only the most significant units
	return parts.slice(0, maxUnits).join(' ');
}
