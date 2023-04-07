// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// 2. Define your collection(s)
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    hasTex: z.boolean().optional(),
    hasTranslation: z.boolean().optional(),
    noReadingTime: z.boolean().optional(),
    noComment: z.boolean().optional(),
    draft: z.boolean().optional()
  })
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  posts: postsCollection
}
