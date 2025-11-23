/**
 * Circle Packing Algorithm - Physics-Based
 * Simulates gravity and collisions to pack circles naturally like billiard balls
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

	return { x: circle.x, y: circle.y };
}

/**
 * Find position by dropping circle from top with physics simulation
 */
function findPosition(
	radius: number,
	placedCircles: Circle[],
	containerWidth: number,
	containerHeight: number,
	padding: number = 8
): { x: number; y: number } {
	// Drop from left side, slightly randomized to avoid perfect stacking
	const dropX = radius + padding + (placedCircles.length * 5) % (containerWidth * 0.2);
	const physicsCircle: PhysicsCircle = {
		id: '',
		x: Math.min(dropX, containerWidth - radius - padding),
		y: radius + padding,
		radius: radius,
		vx: 0,
		vy: 0
	};

	// All circles go through physics simulation (even the first one falls to floor)
	return simulatePhysics(physicsCircle, placedCircles, containerWidth, containerHeight, padding);
}

/**
 * Pack circles using a greedy algorithm
 * Larger circles are placed first and naturally float to the top
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

	// Normalize Y positions to remove empty space above
	const minY = Math.min(...placed.map((c) => c.y - c.radius));
	const offsetY = minY - padding;

	return placed.map((circle) => ({
		...circle,
		y: circle.y - offsetY
	}));
}

/**
 * Calculate the bounding box height for packed circles
 */
export function getPackedHeight(circles: PackedCircle[], padding: number = 8): number {
	if (circles.length === 0) return 0;
	const maxY = Math.max(...circles.map((c) => c.y + c.radius));
	return maxY + padding;
}
