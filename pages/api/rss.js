// import RSS from 'rss'
// import { decode } from 'html-entities'
// import axios from 'axios'

// const SITE_URL = 'https://newstamil.tv'
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// export default async function handler(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')

//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}/api/v1/web/rss_xml/list`)
//     const items = response.data?.payloadJson || response.data || []

//     const feed = new RSS({
//       title: 'News Tamil 24x7',
//       description: 'Latest Breaking News in Tamil',
//       feed_url: `${SITE_URL}/rss.xml`,
//       site_url: SITE_URL,
//       language: 'ta',
//       pubDate: new Date(),
//       custom_namespaces: {
//         media: 'http://search.yahoo.com/mrss/',
//         atom: 'http://www.w3.org/2005/Atom',
//         content: 'http://purl.org/rss/1.0/modules/content/',
//       },
//       custom_elements: [
//         { 'atom:link': { _attr: { href: `${SITE_URL}/rss.xml`, rel: 'self', type: 'application/rss+xml' } } },
//       ],
//     })

//     if (Array.isArray(items)) {
//       items.forEach((item) => {
//         const url = `${SITE_URL}/article/${item.story_desk_created_name}`
//         const description = decode(String(item.story_details || '').replace(/<[^>]+>/g, '').slice(0, 400))
//         feed.item({
//           title: item.story_title_name || 'Untitled',
//           description: description || item.story_title_name,
//           url,
//           guid: `${url}#${item.createdAt}`,
//           date: item.createdAt ? new Date(item.createdAt) : new Date(),
//           author: item.author || 'News Tamil',
//           custom_elements: [
//             { 'content:encoded': { _cdata: String(item.story_details || '') } },
//             { 'media:content': { _attr: { url: item.story_cover_image_url || '', medium: 'image' } } },
//           ],
//         })
//       })
//     }

//     res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
//     res.setHeader('Cache-Control', 'public, max-age=3600')
//     res.status(200).send(feed.xml({ indent: true }))
//   } catch (e) {
//     console.error('[rss] Error:', e)
//     res.status(500).setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
//     res.end(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>News Tamil</title><link>${SITE_URL}</link><description>Feed temporarily unavailable</description></channel></rss>`)
//   }
// }

import RSS from 'rss'
import axios from 'axios'

const SITE_URL = 'https://newstamil.tv'
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/web/rss_xml/latest`)
    const items = response.data?.payloadJson

    if (!Array.isArray(items) || items.length === 0) throw new Error('No items')

    const feed = new RSS({
      title: 'News Tamil 24x7',
      description: 'Latest Breaking News in Tamil',
      feed_url: `${SITE_URL}/rss.xml`,
      site_url: SITE_URL,
      language: 'ta',
      pubDate: new Date(),
      custom_namespaces: {
        media: 'http://search.yahoo.com/mrss/',
        atom: 'http://www.w3.org/2005/Atom',
      },
      custom_elements: [
        { 'atom:link': { _attr: { href: `${SITE_URL}/rss.xml`, rel: 'self', type: 'application/rss+xml' } } },
      ],
    })

    items.forEach((item) => {
      if (!item.story_desk_created_name || !item.story_title_name) return
      const url = `${SITE_URL}/article/${item.story_desk_created_name}`
      feed.item({
        title: item.story_title_name,
        description: item.story_sub_title_name || item.story_title_name,
        url,
        guid: `${url}#${item.createdAt}`,
        date: item.createdAt ? new Date(item.createdAt) : new Date(),
        author: item.c_createdName || 'News Tamil',
        custom_elements: [
          { 'media:content': { _attr: { url: item.story_cover_image_url || '', medium: 'image' } } },
        ],
      })
    })

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).send(feed.xml({ indent: true }))
  } catch (e) {
    console.error('[rss] Error:', e)
    res.status(500).end()
  }
}