import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content')

export function getAllArticles() {
  const categories = ['policy', 'training', 'tools', 'cases', 'community']
  let allArticles = []

  categories.forEach(category => {
    const articles = getArticlesByCategory(category)
    allArticles = [...allArticles, ...articles]
  })

  return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticlesByCategory(category) {
  const categoryPath = path.join(articlesDirectory, category)
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }
  
  const filenames = fs.readdirSync(categoryPath)
  
  const articles = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(categoryPath, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.md$/, ''),
        category,
        ...data,
        content
      }
    })
  
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticleBySlug(category, slug) {
  const filePath = path.join(articlesDirectory, category, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    category,
    ...data,
    content
  }
}

// ================================