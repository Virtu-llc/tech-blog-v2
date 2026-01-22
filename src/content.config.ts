import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const httpsUrl = z.preprocess(
	(val) => {
		if (typeof val === 'string') {
			const trimmed = val.trim();
			return trimmed === '' ? undefined : trimmed;
		}
		return val;
	},
	z.string().url().startsWith('https://').optional(),
);

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatarImage: z.string().optional(),
			avatarUrl: z.string().optional(),
			website: httpsUrl,
		}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// Category for post classification
			category: z.string(),
			// Excerpt for post preview
			excerpt: z.string(),
			// Authors support (single or multiple)
			// Accepts both single value and array, normalizes to array
			authorIds: z.preprocess(
				(val) => {
					if (val == null) return undefined;
					return Array.isArray(val) ? val : [val];
				},
				z.array(z.string()).optional()
			),
			authors: z.preprocess(
				(val) => {
					if (val == null) return undefined;
					return Array.isArray(val) ? val : [val];
				},
				z
					.array(
						z.object({
							name: z.string().optional(),
							avatarImage: z.string().optional(),
							avatarUrl: z.string().optional(),
							website: httpsUrl,
						})
					)
					.optional()
			),
		}),
});

export const collections = { blog, authors };
