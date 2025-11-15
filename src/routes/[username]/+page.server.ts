import { error } from '@sveltejs/kit';
import { getUserByUsername, getUserVisibleSections, intentions, currentUser } from '$data/mockData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { username } = params;

	// Find user by username
	const user = getUserByUsername(username);

	if (!user) {
		throw error(404, {
			message: 'User not found'
		});
	}

	// Determine viewer role (in real app, check authentication and relationship)
	// For now, assume public viewer
	const viewerRole = 'public';

	// Get visible sections based on privacy settings
	const visibleSections = getUserVisibleSections(user.userId, viewerRole);

	// Filter user's active intentions
	const userIntentions = intentions.filter((i) => i.status === 'active');

	// Check if viewer is the profile owner
	const canEdit = user.userId === currentUser.userId;

	return {
		user,
		visibleSections,
		userIntentions,
		canEdit
	};
};
