import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../config'

import { getCollection } from 'astro:content'

export async function get() {
  const posts = await getCollection('posts')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: 'https://mingze-gao.com',
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // post.slug split to lang and slug
      link: post.slug.startsWith('zh')
        ? `/zh/posts/${post.slug.slice('zh'.length)}/`
        : `/posts/${post.slug.slice('en'.length)}/`
    })),
    customData: `<language>en-us</language>`
  })
}
