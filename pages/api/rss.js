import RSS from 'rss'
import { decode } from 'html-entities'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')
  : 'https://newstamil.tv'

async function buildFeedFromHtml() {
  const siteUrl = SITE_URL
  const html = await fetch(siteUrl).then((r) => r.text())

  const linkRe = /<a[^>]+href=["'](https?:\/\/newstamil\.tv\/article[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gs
  const items = new Map()
  let m
  while ((m = linkRe.exec(html)) && items.size < 30) {
    const url = m[1]
    const titleHtml = m[2].replace(/\s+/g, ' ').trim()
    const title = titleHtml.replace(/<[^>]+>/g, '').trim()
    if (title && !items.has(url)) items.set(url, { title })
  }

  const feed = new RSS({
    title: 'Newstamil - Latest News',
    description: 'Latest headlines from Newstamil',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'ta',
    pubDate: new Date(),
    generator: 'RSS for Node',
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    custom_elements: [
      { 'atom:link': { _attr: { href: `${siteUrl}/rss.xml`, rel: 'self', type: 'application/rss+xml' } } },
    ],
  })

  for (const [url, info] of items) {
    try {
      const page = await fetch(url).then((r) => r.text())
      const metaDesc =
        page.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
        page.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
      const description = metaDesc ? decode(metaDesc[1]) : ''
      feed.item({ title: info.title, description: description || info.title, url, guid: url })
    } catch (e) {
      feed.item({ title: info.title, description: info.title, url, guid: url })
    }
  }

  return { xml: feed.xml({ indent: true }), source: 'html', count: Array.from(items).length }
}

async function buildFeedFromDB() {
  // Connect to MongoDB and fetch stories from last 3 days
  const connectMongoDB = await import('../../../NEWSTAMIL_ADMIN/libs/mongodb.js').then(m => m.default || m)
  await connectMongoDB()

  // Load Stories model (CJS export)
  // Use require to ensure compatibility with module.exports in the model file
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Stories } = require('../../../NEWSTAMIL_ADMIN/models/storiesModel')

  const cutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

  const articles = await Stories.find(
    {
      n_status: 1,
      n_published: 1,
      c_save_type: 'published',
      createdAt: { $gte: cutoff },
    },
    {
      story_desk_created_name: 1,
      story_title_name: 1,
      story_summary_snippet: 1,
      story_details: 1,
      story_cover_image_url: 1,
      createdAt: 1,
    }
  )
    .sort({ createdAt: -1 })
    .limit(500)
    .lean()

  const feed = new RSS({
    title: 'Newstamil - Latest News',
    description: 'Latest headlines from Newstamil',
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'ta',
    pubDate: new Date(),
    generator: 'RSS for Node',
    custom_namespaces: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    custom_elements: [
      { 'atom:link': { _attr: { href: `${SITE_URL}/rss.xml`, rel: 'self', type: 'application/rss+xml' } } },
    ],
  })

  for (const a of articles) {
    const url = a.story_desk_created_name ? `${SITE_URL}/article/${a.story_desk_created_name}` : `${SITE_URL}/article/${a.story_id}`
    const title = a.story_title_name || 'Untitled'
    const description = a.story_summary_snippet || (a.story_details ? decode(String(a.story_details).replace(/<[^>]+>/g, '').slice(0, 400)) : '')
    const guid = `${url}#${a.createdAt ? new Date(a.createdAt).toISOString() : a.story_id}`
    const pubDate = a.createdAt ? new Date(a.createdAt) : undefined

    const item = { title, description: description || title, url, guid }
    if (pubDate) item.date = pubDate
    if (a.story_details) item.custom_elements = [{ 'content:encoded': { _cdata: String(a.story_details) } }]
    if (a.story_cover_image_url) item.enclosure = { url: a.story_cover_image_url }

    feed.item(item)
  }

  return { xml: feed.xml({ indent: true }), source: 'db', count: articles.length }
}

async function buildFeed() {
  // Prefer DB-backed feed; fall back to HTML scrape if DB not available
  try {
    return await buildFeedFromDB()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[rss] DB feed failed, falling back to HTML scrape:', err && err.message)
    return await buildFeedFromHtml()
  }
}

export default async function handler(req, res) {
  // Enable CORS for RSS readers and aggregators
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const result = await buildFeed()
    const xml = result && result.xml ? result.xml : result
    const source = result && result.source ? result.source : 'unknown'
    const count = result && typeof result.count === 'number' ? String(result.count) : '0'

    // Set caching headers for RSS feeds (cache for 1 hour)
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('X-RSS-Source', source)
    res.setHeader('X-RSS-Items', count)

    // Generate ETag for cache validation
    const crypto = require('crypto')
    const etag = `"${crypto.createHash('md5').update(xml).digest('hex')}"`
    res.setHeader('ETag', etag)

    // Check if client has cached version
    if (req.headers['if-none-match'] === etag) {
      res.status(304).end()
      return
    }

    res.status(200).send(xml)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[rss] Error generating feed:', e)
    res.status(500)
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

    // Return a minimal but valid RSS feed indicating error
    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Newstamil - Error</title>
    <link>https://newstamil.tv</link>
    <description>Temporary error generating feed</description>
    <item>
      <title>Feed temporarily unavailable</title>
      <description>Unable to generate RSS feed at this time. Please try again later.</description>
      <link>https://newstamil.tv</link>
    </item>
  </channel>
</rss>`
    res.end(errorFeed)
  }
}
