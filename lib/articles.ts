import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content')

interface Article {
  slug: string
  category: string
  title: string
  date: string
  content: string
  [key: string]: any
}

export function getAllArticles(): Article[] {
  const categories = ['policy', 'training', 'tools', 'cases', 'community']
  let allArticles: Article[] = []

  categories.forEach(category => {
    const articles = getArticlesByCategory(category)
    allArticles = [...allArticles, ...articles]
  })

  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticlesByCategory(category: string): Article[] {
  const categoryPath = path.join(articlesDirectory, category)
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }
  
  const filenames = fs.readdirSync(categoryPath)
  
  const articles = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename): Article => {
      const filePath = path.join(categoryPath, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.md$/, ''),
        category,
        ...data,
        content
      } as Article
    })
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(category: string, slug: string): Article | null {
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
  } as Article
}