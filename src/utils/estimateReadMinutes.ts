/**
 * Estimate reading time in minutes based on text content
 * Assumes ~200 words per minute reading speed
 */
export function estimateReadMinutesFromText(text: string): number {
	const clean = text.replace(/\s+/g, ' ').trim();
	// Count English words (alphanumeric sequences)
	const englishWords = (clean.match(/[A-Za-z0-9]+/g) ?? []).length;

	// English-only estimate: ~200 words per minute
	const minutes = englishWords / 200;
	return Math.max(1, Math.ceil(minutes));
}

/**
 * Estimate reading time from HTML content
 * Extracts plain text and estimates reading time
 */
export function estimateReadMinutesFromHTML(html: string): number {
	// Remove HTML tags and extract text
	const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	return estimateReadMinutesFromText(text);
}
