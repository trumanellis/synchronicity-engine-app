import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Parser from 'rss-parser';
import type { Article } from '$lib/types';

const parser = new Parser({
	customFields: {
		item: [
			['content:encoded', 'contentEncoded'],
			['media:content', 'mediaContent']
		]
	}
});

// Extract hashtags from content
function extractHashtags(content: string): string[] {
	// Decode HTML entities first (e.g., &#198; → Æ)
	const decodedContent = decodeHtmlEntities(content);

	// Match hashtags that start with a letter (including Unicode like Æ, é, ñ),
	// followed by letters, numbers, or underscores
	// Minimum length of 2 characters to avoid single-letter tags
	const hashtagRegex = /#([\p{L}][\p{L}\p{N}_]*)/gu;
	const matches = decodedContent.matchAll(hashtagRegex);
	const hashtags = Array.from(matches, (match) => match[1])
		.filter(tag => tag.length >= 2) // Filter out single-letter tags
		.filter(tag => !/^\d+$/.test(tag)); // Filter out pure number tags

	return [...new Set(hashtags)]; // Remove duplicates
}

// Calculate reading time (words per minute: 200)
function calculateReadingTime(content: string): number {
	const text = content.replace(/<[^>]*>/g, ''); // Strip HTML
	const words = text.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / 200));
}

// Extract featured image from RSS item
function extractFeaturedImage(item: any): string | undefined {
	// Try media:content first
	if (item.mediaContent && item.mediaContent.$?.url) {
		return item.mediaContent.$.url;
	}

	// Try enclosure
	if (item.enclosure?.url) {
		return item.enclosure.url;
	}

	// Try to find first image in content
	if (item.contentEncoded || item.content) {
		const content = item.contentEncoded || item.content;
		const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
		if (imgMatch) {
			return imgMatch[1];
		}
	}

	return undefined;
}

// Decode HTML entities
function decodeHtmlEntities(text: string): string {
	const entities: Record<string, string> = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
		'&nbsp;': ' ',
		'&ndash;': '–',
		'&mdash;': '—',
		'&hellip;': '...',
		'&rsquo;': "'",
		'&lsquo;': "'",
		'&rdquo;': '"',
		'&ldquo;': '"'
	};

	let decoded = text;
	// Replace named entities
	for (const [entity, char] of Object.entries(entities)) {
		decoded = decoded.replace(new RegExp(entity, 'g'), char);
	}
	// Replace numeric entities like &#8217;
	decoded = decoded.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
	// Replace hex entities like &#x2019;
	decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

	return decoded;
}

// Extract preview text from content with formatted headers
function extractPreview(content: string, maxLength: number = 250): string {
	// First, preserve headers by converting them to a special format
	let text = content
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
		.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
		.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '<br><strong>$1</strong><br>') // Convert headers to bold with line breaks
		.replace(/<[^>]+>/g, '') // Strip remaining HTML tags
		.replace(/\[.*?\]/g, '') // Remove [bracketed] content
		.replace(/https?:\/\/[^\s]+/g, ''); // Remove URLs

	// Decode HTML entities
	text = decodeHtmlEntities(text);

	// Clean up whitespace but preserve line breaks for headers
	const cleaned = text
		.replace(/\s+/g, ' ') // Normalize whitespace
		.replace(/<br>\s*/g, '<br>') // Clean up breaks
		.replace(/[#*_~`]/g, '') // Remove markdown formatting characters
		.trim();

	// Truncate but try to keep headers intact
	if (cleaned.length > maxLength) {
		let truncated = cleaned.substring(0, maxLength);
		// If we're in the middle of a tag, back up to before it
		const lastTagStart = truncated.lastIndexOf('<');
		const lastTagEnd = truncated.lastIndexOf('>');
		if (lastTagStart > lastTagEnd) {
			truncated = truncated.substring(0, lastTagStart);
		}
		return truncated.trim() + '...';
	}

	return cleaned;
}

export const GET: RequestHandler = async ({ url }) => {
	const substackUrl = url.searchParams.get('url');

	if (!substackUrl) {
		return json({ error: 'Substack URL is required' }, { status: 400 });
	}

	try {
		// Convert publication URL to RSS feed URL
		const feedUrl = substackUrl.endsWith('/feed')
			? substackUrl
			: `${substackUrl.replace(/\/$/, '')}/feed`;

		// Fetch and parse RSS feed
		const feed = await parser.parseURL(feedUrl);

		// Transform RSS items to Article format
		const articles: Article[] = feed.items.map((item, index) => {
			const content = item.contentEncoded || item['content:encoded'] || item.content || '';
			const hashtags = extractHashtags(content);
			const imageUrl = extractFeaturedImage(item);

			// Extract subtitle from RSS description/snippet
			const subtitle = item.contentSnippet
				? decodeHtmlEntities(item.contentSnippet.substring(0, 150))
				: (item.description ? decodeHtmlEntities(item.description.substring(0, 150)) : '');

			// Extract preview from actual article content (first paragraphs)
			const preview = extractPreview(content, 250);

			return {
				id: item.guid || `article-${index}`,
				title: decodeHtmlEntities(item.title || 'Untitled'),
				subtitle: subtitle,
				preview: preview,
				substackUrl: item.link || substackUrl,
				imageUrl,
				hashtags,
				publishedDate: item.pubDate || item.isoDate || new Date().toISOString(),
				rawContent: content,
				readingTime: calculateReadingTime(content)
			};
		});

		return json({
			success: true,
			articles,
			feedTitle: feed.title,
			feedDescription: feed.description
		});

	} catch (error) {
		console.error('Error fetching Substack feed:', error);
		return json(
			{
				error: 'Failed to fetch Substack feed',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
