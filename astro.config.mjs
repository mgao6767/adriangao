import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  // https://github.com/natemoo-re/astro-icon/issues/2
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  markdown: {
    // extendDefaultPlugins: true,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      [
        rehypeKatex,
        {
          // Katex plugin options
          macros: {
            '\\E': '\\mathbb{E}',
            '\\C': '\\mathbb{C}',
            '\\R': '\\mathbb{R}',
            '\\N': '\\mathbb{N}',
            '\\Q': '\\mathbb{Q}',
            '\\bigO': '\\mathcal{O}',
            '\\abs': '|#1|',
            '\\set': '\\{ #1 \\}',
            '\\indep': '{\\perp\\mkern-9.5mu\\perp}',
            '\\nindep': '{\\not\\!\\perp\\!\\!\\!\\perp}',
            '\\latex': '\\LaTeX',
            '\\katex': '\\KaTeX'
          }
        }
      ]
    ],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: false
    }
  }
})
