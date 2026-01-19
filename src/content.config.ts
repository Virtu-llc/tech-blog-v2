import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
			// Optional author information
			author: z
				.object({
					name: z.string().optional(),
					avatarUrl: z.string().optional(),
					website: z.string().optional(),
				})
				.optional(),
		}),
});

export const collections = { blog };
