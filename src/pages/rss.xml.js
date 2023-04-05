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
      link: `/posts/${post.slug}/`
    })),
    customData: `<language>en-us</language>`
  })
}
