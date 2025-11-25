/**
 * Circle Packing Algorithm - Hybrid Horizontal-First + Physics
 * Scans left-to-right to prioritize horizontal packing, then uses gravity simulation
 * for natural settling. Combines space efficiency with realistic physics.
 */

export interface Circle {
	id: string;
	x: number;
	y: number;
	radius: number;
}

export interface PackedCircle extends Circle {
	data: any;
}

interface PhysicsCircle extends Circle {
	vx: number;
	vy: number;
}

/**
 * Check if two circles overlap
 */
function circlesOverlap(c1: Circle, c2: Circle, padding: number = 0): boolean {
	const dx = c1.x - c2.x;
	const dy = c1.y - c2.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance < c1.radius + c2.radius + padding;
}

/**
 * Simulate circle falling with gravity and collisions
 */
function simulatePhysics(
	circle: PhysicsCircle,
	placedCircles: Circle[],
	containerWidth: number,
	containerHeight: number,
	padding: number
): { x: number; y: number } {
	const gravity = 0.5;
	const friction = 0.95;
	const maxIterations = 500;
	const stabilityThreshold = 0.1;

	for (let iteration = 0; iteration < maxIterations; iteration++) {
		// Apply gravity
		circle.vy += gravity;

		// Apply friction
		circle.vx *= friction;
		circle.vy *= friction;

		// Update position
		circle.x += circle.vx;
		circle.y += circle.vy;

		// Collide with floor
		if (circle.y + circle.radius > containerHeight - padding) {
			circle.y = containerHeight - padding - circle.radius;
			circle.vy = 0;
			circle.vx *= 0.8;
		}

		// Collide with left wall
		if (circle.x - circle.radius < padding) {
			circle.x = padding + circle.radius;
			circle.vx = Math.abs(circle.vx) * 0.5;
		}

		// Collide with right wall
		if (circle.x + circle.radius > containerWidth - padding) {
			circle.x = containerWidth - padding - circle.radius;
			circle.vx = -Math.abs(circle.vx) * 0.5;
		}

		// Collide with other circles
		for (const other of placedCircles) {
			const dx = circle.x - other.x;
			const dy = circle.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = circle.radius + other.radius + padding;

			if (distance < minDistance && distance > 0) {
				// Push circles apart
				const overlap = minDistance - distance;
				const nx = dx / distance;
				const ny = dy / distance;

				circle.x += nx * overlap;
				circle.y += ny * overlap;

				// Bounce off
				const relativeVx = circle.vx;
				const relativeVy = circle.vy;
				const normalVelocity = relativeVx * nx + relativeVy * ny;

				if (normalVelocity < 0) {
					circle.vx -= nx * normalVelocity * 1.5;
					circle.vy -= ny * normalVelocity * 1.5;
				}
			}
		}

		// Check if stable (velocity near zero and on something solid)
		const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
		const onFloor = circle.y + circle.radius >= containerHeight - padding - 1;
		const onCircle = placedCircles.some((other) => {
			const dx = circle.x - other.x;
			const dy = circle.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			return distance <= circle.radius + other.radius + padding + 1;
		});

		if (speed < stabilityThreshold && (onFloor || onCircle)) {
			break;
		}
	}

	// Final bounds clamping to ensure coins never exceed container
	circle.x = Math.max(padding + circle.radius, Math.min(containerWidth - padding - circle.radius, circle.x));
	circle.y = Math.max(padding + circle.radius, Math.min(containerHeight - padding - circle.radius, circle.y));

	return { x: circle.x, y: circle.y };
}

/**
 * Check if a settled position is valid (within bounds and no overlaps)
 */
function isSettledPositionValid(
	x: number,
	y: number,
	radius: number,
	placedCircles: Circle[],
	containerWidth: number,
	containerHeight: number,
	padding: number
): boolean {
	// Check if within container bounds
	if (x - radius < padding || x + radius > containerWidth - padding) return false;
	if (y - radius < padding || y + radius > containerHeight - padding) return false;

	// Check overlap with existing circles
	for (const circle of placedCircles) {
		const dx = x - circle.x;
		const dy = y - circle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const minDistance = radius + circle.radius + padding;

		if (distance < minDistance) {
			return false;
		}
	}

	return true;
}

/**
 * Find position using horizontal-first scanning with gravity settling
 * Scans left-to-right at multiple Y levels, drops coin and simulates physics for each position
 */
function findPosition(
	radius: number,
	placedCircles: Circle[],
	containerWidth: number,
	containerHeight: number,
	padding: number = 8
): { x: number; y: number } {
	const horizontalStep = Math.max(5, radius / 4); // Small steps for better left-packing
	const verticalStep = Math.max(50, radius * 2); // Try different Y starting positions

	// Try multiple Y starting levels from top to bottom
	for (let startY = radius + padding; startY <= containerHeight - radius - padding; startY += verticalStep) {
		// Try X positions from left to right at this Y level
		for (let startX = radius + padding; startX <= containerWidth - radius - padding; startX += horizontalStep) {
			// Drop coin from this position
			const physicsCircle: PhysicsCircle = {
				id: '',
				x: startX,
				y: startY,
				radius: radius,
				vx: 0,
				vy: 0
			};

			// Simulate physics to let it fall and settle
			const settled = simulatePhysics(physicsCircle, placedCircles, containerWidth, containerHeight, padding);

			// Check if settled position is valid
			if (isSettledPositionValid(settled.x, settled.y, radius, placedCircles, containerWidth, containerHeight, padding)) {
				return settled;
			}
		}
	}

	// Fallback: force place at top-left (should rarely reach here now)
	return { x: radius + padding, y: radius + padding };
}

/**
 * Pack circles using hybrid horizontal-first + physics algorithm
 * Scans left-to-right to find drop positions, then simulates gravity for natural settling
 * Larger circles are placed first for better space efficiency
 */
export function packCircles(
	items: Array<{ id: string; radius: number; data: any }>,
	containerWidth: number,
	containerHeight: number = 2000,
	padding: number = 8
): PackedCircle[] {
	// Sort by radius (largest first) - larger circles float to top
	const sorted = [...items].sort((a, b) => b.radius - a.radius);

	const placed: PackedCircle[] = [];

	for (const item of sorted) {
		const position = findPosition(item.radius, placed, containerWidth, containerHeight, padding);

		placed.push({
			id: item.id,
			x: position.x,
			y: position.y,
			radius: item.radius,
			data: item.data
		});
	}

	// Return coins where gravity settled them (at bottom)
	return placed;
}

/**
 * Calculate the bounding box height for packed circles
 */
export function getPackedHeight(circles: PackedCircle[], padding: number = 8): number {
	if (circles.length === 0) return 0;
	const maxY = Math.max(...circles.map((c) => c.y + c.radius));
	return maxY + padding;
}
