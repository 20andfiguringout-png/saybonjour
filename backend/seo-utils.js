import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// SEO Configuration
export const seoConfig = {
  siteUrl: 'https://saybonjour.com', // Replace with your actual domain
  siteName: 'Say Bonjour',
  defaultTitle: 'Say Bonjour - Learn French Online | Interactive French Learning Platform',
  defaultDescription: 'Master French with Say Bonjour - the comprehensive online French learning platform. Interactive lessons, quizzes, cultural insights, and more.',
  defaultKeywords: 'learn french, french lessons, french language, online french course, french grammar, french vocabulary, french culture',
  author: 'Say Bonjour Team',
  twitterHandle: '@saybonjour',
  facebookPage: 'https://facebook.com/saybonjour',
  instagramPage: 'https://instagram.com/saybonjour'
}

// Generate XML Sitemap
export const generateSitemap = (articles = [], quizzes = []) => {
  const { siteUrl } = seoConfig
  const currentDate = new Date().toISOString().split('T')[0]
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/resources', priority: '0.9', changefreq: 'daily' },
    { url: '/quizzes', priority: '0.9', changefreq: 'daily' },
    { url: '/study-tools', priority: '0.8', changefreq: 'weekly' },
    { url: '/culture', priority: '0.8', changefreq: 'weekly' },
    { url: '/media', priority: '0.8', changefreq: 'weekly' },
    { url: '/memory-boosters', priority: '0.7', changefreq: 'weekly' },
    { url: '/france-map', priority: '0.7', changefreq: 'monthly' },
    { url: '/worksheets', priority: '0.7', changefreq: 'weekly' },
    { url: '/phrase-of-the-day', priority: '0.6', changefreq: 'daily' },
    { url: '/favorites', priority: '0.5', changefreq: 'weekly' }
  ]

  // Dynamic article pages
  const articlePages = articles.flatMap(section => 
    section.items.map(article => ({
      url: `/resources/${article.id}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: article.lastUpdated || currentDate
    }))
  )

  // Dynamic quiz pages
  const quizPages = quizzes.flatMap(section =>
    section.items.map(quiz => ({
      url: `/quizzes/${quiz.id}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: quiz.lastUpdated || currentDate
    }))
  )

  const allPages = [...staticPages, ...articlePages, ...quizPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
}

// Generate robots.txt
export const generateRobotsTxt = () => {
  const { siteUrl } = seoConfig
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /resources
Allow: /quizzes
Allow: /study-tools
Allow: /culture
Allow: /media

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay (be nice to servers)
Crawl-delay: 1`
}

// Generate structured data for articles
export const generateArticleStructuredData = (article, section) => {
  const { siteUrl, siteName, author } = seoConfig
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author || author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": article.createdAt || article.lastUpdated,
    "dateModified": article.lastUpdated,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/resources/${article.id}`
    },
    "articleSection": section?.title || "French Learning",
    "keywords": [
      "French",
      "Language Learning",
      article.difficulty,
      section?.title
    ].filter(Boolean).join(', '),
    "inLanguage": "en",
    "about": {
      "@type": "Thing",
      "name": "French Language Learning"
    },
    "educationalLevel": article.difficulty,
    "learningResourceType": "Article"
  }
}

// Generate structured data for courses/quizzes
export const generateCourseStructuredData = (quiz, section) => {
  const { siteUrl, siteName } = seoConfig
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": quiz.title,
    "description": quiz.description,
    "provider": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl
    },
    "educationalLevel": quiz.difficulty,
    "inLanguage": "fr",
    "teaches": "French Language",
    "courseMode": "online",
    "isAccessibleForFree": true,
    "url": `${siteUrl}/quizzes/${quiz.id}`,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Organization",
        "name": siteName
      }
    },
    "about": {
      "@type": "Thing",
      "name": section?.title || "French Language"
    }
  }
}

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  const { siteUrl } = seoConfig
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteUrl}${crumb.url}`
    }))
  }
}

// Save sitemap to public directory
export const saveSitemap = (articles = [], quizzes = []) => {
  try {
    const sitemap = generateSitemap(articles, quizzes)
    const publicDir = path.join(__dirname, '..', 'public')
    
    // Create public directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
    console.log('✅ Sitemap generated successfully')
    return true
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    return false
  }
}

// Save robots.txt to public directory
export const saveRobotsTxt = () => {
  try {
    const robotsTxt = generateRobotsTxt()
    const publicDir = path.join(__dirname, '..', 'public')
    
    // Create public directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt)
    console.log('✅ Robots.txt generated successfully')
    return true
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error)
    return false
  }
}

// Generate meta tags for social sharing
export const generateSocialMetaTags = (page) => {
  const { siteUrl, siteName, defaultTitle, defaultDescription } = seoConfig
  
  return {
    title: page.title || defaultTitle,
    description: page.description || defaultDescription,
    image: page.image || `${siteUrl}/og-default.jpg`,
    url: `${siteUrl}${page.url || ''}`,
    siteName,
    type: page.type || 'website'
  }
}
