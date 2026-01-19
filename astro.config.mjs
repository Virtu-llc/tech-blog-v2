// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from '@astrojs/react';



// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap(), react()],
    vite: {
        plugins: [tailwindcss()],
      },
    markdown: {
        syntaxHighlight: "prism",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
    },
});