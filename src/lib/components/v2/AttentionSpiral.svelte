<script lang="ts">
	import { onMount } from 'svelte';
	import Avatar from '$components/core/Avatar.svelte';
	import type { IntentionAttentionSummary } from '$types';

	export let attentionSummary: IntentionAttentionSummary;
	export let backgroundImage: string | undefined = undefined;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let users: any[] = [];
	let viewportScale = 1.0;
	let mouseX = -1000;
	let mouseY = -1000;
	let hoveredUser: any = null;
	let tooltipX = 0;
	let tooltipY = 0;

	// Canvas parameters
	const centerX = 250;
	const centerY = 250;
	const scale = 2;
	const pixelsPerSecond = 0.1;
	const velocityConstant = pixelsPerSecond;
	const timeAcceleration = 1; // Real-time (no acceleration)

	function initializeUsers() {
		const now = Date.now();

		if (attentionSummary && attentionSummary.userSummaries.length > 0) {
			attentionSummary.userSummaries.forEach((summary, index) => {
				const hoursElapsed = summary.totalMinutes / 60;
				const msElapsed = hoursElapsed * 3600 * 1000 / timeAcceleration;
				const spawnTime = now - msElapsed;

				const user = {
					id: summary.userId,
					userName: summary.userName,
					userAvatar: summary.userAvatar,
					totalMinutes: summary.totalMinutes,
					spawnTime: spawnTime,
					currentAngle: 0,
					maxRadius: 0,
					targetAngle: 0,
					tipX: 0,
					tipY: 0
				};

				users.push(user);
			});

			// Distribute around circle
			users.forEach((user, index) => {
				user.targetAngle = (index * 2 * Math.PI) / users.length;
			});
		}
	}

	function drawUserSpiral(user: any, isHovered: boolean) {
		const realUserAge = Date.now() - user.spawnTime;
		const simulatedUserAge = realUserAge * timeAcceleration;
		const timeInSeconds = simulatedUserAge / 1000;

		const radius = Math.pow(2.5 * velocityConstant * timeInSeconds, 0.4);
		const currentAngle = radius / scale;

		// Color based on total journey length (hours elapsed)
		const hoursElapsed = simulatedUserAge / (3600 * 1000);
		const userHue = Math.min((hoursElapsed / 24) * 280, 280);

		user.currentAngle = currentAngle;
		user.maxRadius = scale * currentAngle;

		if (currentAngle === 0) return;

		const steps = Math.max(200, Math.floor(currentAngle * 50));
		const angleStep = currentAngle / steps;

		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate(user.targetAngle);

		// Draw spiral with glow if hovered
		if (isHovered) {
			ctx.lineWidth = 2.5 / viewportScale;
			ctx.shadowBlur = 15;
			ctx.shadowColor = `hsl(${userHue}, 100%, 50%)`;
		} else {
			ctx.lineWidth = 1 / viewportScale;
			ctx.shadowBlur = 0;
		}
		ctx.lineCap = 'round';
		ctx.strokeStyle = `hsl(${userHue}, 100%, 50%)`;

		ctx.beginPath();
		for (let i = 0; i <= steps; i++) {
			const theta = i * angleStep;
			const r = scale * theta;
			const x = r * Math.cos(theta);
			const y = r * Math.sin(theta);

			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();

		// Draw tip
		const tipRadius = scale * currentAngle;
		const tipX = tipRadius * Math.cos(currentAngle);
		const tipY = tipRadius * Math.sin(currentAngle);
		const fixedTipSize = isHovered ? 10 / viewportScale : 8 / viewportScale;

		// Store world coordinates for hover detection
		const worldTipX = centerX + Math.cos(user.targetAngle) * tipX - Math.sin(user.targetAngle) * tipY;
		const worldTipY = centerY + Math.sin(user.targetAngle) * tipX + Math.cos(user.targetAngle) * tipY;
		user.tipX = worldTipX * viewportScale;
		user.tipY = worldTipY * viewportScale;

		ctx.beginPath();
		ctx.arc(tipX, tipY, fixedTipSize, 0, Math.PI * 2);
		ctx.fillStyle = `hsl(${userHue}, 100%, 60%)`;
		ctx.fill();

		// Draw user avatar (counter-rotate to keep upright)
		ctx.save();
		ctx.translate(tipX, tipY);
		ctx.rotate(-user.targetAngle);
		const fontSize = fixedTipSize * 3.5;
		ctx.font = `${fontSize}px Arial, sans-serif`;
		ctx.fillStyle = '#000000';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(user.userAvatar, 0, 0);
		ctx.restore();

		ctx.restore();
	}

	function checkHover() {
		if (mouseX < 0 || mouseY < 0) {
			hoveredUser = null;
			return;
		}

		const threshold = 25;
		hoveredUser = null;

		for (const user of users) {
			const dx = mouseX - user.tipX;
			const dy = mouseY - user.tipY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < threshold) {
				hoveredUser = user;
				tooltipX = mouseX;
				tooltipY = mouseY - 60;
				break;
			}
		}
	}

	function animate() {
		// Calculate max radius for viewport
		let maxRadius = 0;
		const currentTime = Date.now();
		users.forEach((user) => {
			const realUserAge = currentTime - user.spawnTime;
			const simulatedUserAge = realUserAge * timeAcceleration;
			const timeInSeconds = simulatedUserAge / 1000;
			const radius = Math.pow(2.5 * velocityConstant * timeInSeconds, 0.4);
			if (radius > maxRadius) maxRadius = radius;
		});

		// Auto-adjust viewport
		const canvasRadius = Math.min(canvas.width, canvas.height) / 2;
		viewportScale = maxRadius > 0 ? (canvasRadius * 0.9) / maxRadius : 1.0;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.scale(viewportScale, viewportScale);
		ctx.translate(-centerX, -centerY);

		// Center point
		ctx.fillStyle = '#00FFD1';
		ctx.beginPath();
		ctx.arc(centerX, centerY, 2 / viewportScale, 0, Math.PI * 2);
		ctx.fill();

		// Draw all users
		users.forEach((user) => {
			const isHovered = hoveredUser && hoveredUser.id === user.id;
			drawUserSpiral(user, isHovered);
		});

		ctx.restore();

		// Check for hover after drawing
		checkHover();

		requestAnimationFrame(animate);
	}

	function handleMouseMove(e: MouseEvent) {
		const rect = canvas.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}

	function handleMouseLeave() {
		mouseX = -1000;
		mouseY = -1000;
		hoveredUser = null;
	}

	function formatDuration(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
		}
		return `${mins}m`;
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		initializeUsers();
		animate();
	});
</script>

<div class="spiral-container" style={backgroundImage ? `--bg-image: url(${backgroundImage})` : ''}>
	{#if backgroundImage}
		<div class="spiral-background"></div>
	{/if}
	<canvas
		bind:this={canvas}
		width="500"
		height="500"
		on:mousemove={handleMouseMove}
		on:mouseleave={handleMouseLeave}
	/>

	{#if hoveredUser}
		<div class="tooltip" style="left: {tooltipX}px; top: {tooltipY}px;">
			<div class="tooltip-header">
				<Avatar avatar={hoveredUser.userAvatar} name={hoveredUser.userName} size="small" />
				<span class="tooltip-name">{hoveredUser.userName}</span>
			</div>
			<div class="tooltip-time">{formatDuration(hoveredUser.totalMinutes)} devoted</div>
		</div>
	{/if}
</div>

<style>
	.spiral-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: var(--spacing-2); /* 18px φ-based */
		overflow: hidden;
		border-radius: var(--spacing-3);
	}

	.spiral-background {
		position: absolute;
		inset: 0;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		filter: blur(8px) brightness(0.3);
		z-index: 0;
	}

	canvas {
		background: transparent;
		cursor: crosshair;
		position: relative;
		z-index: 1;
	}

	.tooltip {
		position: absolute;
		background: rgba(0, 0, 0, 0.9);
		border: 2px solid theme('colors.gold.DEFAULT');
		border-radius: var(--spacing-3); /* 12px φ-based */
		padding: var(--spacing-4); /* 8px φ-based */
		pointer-events: none;
		z-index: 1000;
		box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
		min-width: 150px;
	}

	.tooltip-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-4); /* 8px φ-based */
		margin-bottom: var(--spacing-4); /* 8px φ-based */
	}

	.tooltip-name {
		color: theme('colors.cyan.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		font-family: theme('fontFamily.exo');
	}

	.tooltip-time {
		color: theme('colors.gold.DEFAULT');
		font-size: var(--font-size-2); /* 12.2px Level 2 φ-based */
		font-weight: 600;
		text-align: center;
		text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
	}

	@media (max-width: 768px) {
		canvas {
			width: 400px;
			height: 400px;
		}
	}
</style>
