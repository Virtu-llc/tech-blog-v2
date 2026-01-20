export const prerender = true;

/**
 * Decap CMS config endpoint.
 *
 * GitHub Pages only serves static assets, so we generate config.yml at build time
 * to inject env vars (PUBLIC_*).
 */
export async function GET() {
	// Reuse the same PUBLIC_API_BASE already used elsewhere in the site.
	// This should point to your OAuth provider origin, e.g. https://tech-blog-service.vercel.app
	const rawBase = (import.meta.env.PUBLIC_API_BASE ?? '').trim();
	const baseUrl = (rawBase || 'https://tech-blog-service.vercel.app').replace(/\/+$/, '');

	const yaml = `backend:
  name: github
  repo: Virtu-llc/tech-blog-v2
  branch: main
  base_url: ${baseUrl}
  # Your OAuth provider login endpoint (relative to base_url).
  # The final login URL will be: {base_url}/{auth_endpoint}?provider=github&site_id=...&scope=...
  auth_endpoint: /api/auth/github

# Media files configuration
media_folder: public/uploads
public_folder: /uploads

# Content collections configuration
collections:
  - name: blog
    label: Blog Posts
    folder: src/content/blog
    create: true
    slug: "{{slug}}"
    extension: md
    format: frontmatter
    fields:
      - { label: "Title", name: "title", widget: "string", required: true }
      - { label: "Description", name: "description", widget: "string", required: true }
      - { label: "Category", name: "category", widget: "string", required: true }
      - { label: "Excerpt", name: "excerpt", widget: "text", required: true }
      - {
          label: "Publish Date",
          name: "pubDate",
          widget: "datetime",
          required: true,
          format: "YYYY-MM-DD",
          date_format: "YYYY-MM-DD",
          time_format: false
        }
      - {
          label: "Updated Date",
          name: "updatedDate",
          widget: "datetime",
          required: false,
          format: "YYYY-MM-DD",
          date_format: "YYYY-MM-DD",
          time_format: false
        }
      - {
          label: "Hero Image",
          name: "heroImage",
          widget: "string",
          required: false,
          hint: "Relative path, e.g.: ../../assets/blog-placeholder-1.jpg or /uploads/image.jpg"
        }
      - {
          label: "Author",
          name: "author",
          widget: "object",
          required: false,
          fields: [
            { label: "Name", name: "name", widget: "string", required: false },
            { label: "Avatar URL", name: "avatarUrl", widget: "string", required: false },
            { label: "Website", name: "website", widget: "string", required: false }
          ]
        }
      - { label: "Body", name: "body", widget: "markdown", required: true }
`;

	return new Response(yaml, {
		headers: {
			'content-type': 'text/yaml; charset=utf-8',
			'cache-control': 'no-store',
		},
	});
}

