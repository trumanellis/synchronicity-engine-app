import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getUserByUsername } from '$lib/data/mockData';

export const load: PageLoad = async ({ params }) => {
	const user = getUserByUsername(params.username);

	if (!user) {
		throw error(404, {
			message: 'User not found'
		});
	}

	return {
		user,
		isPublicView: true
	};
};
