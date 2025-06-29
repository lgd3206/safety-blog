import Link from 'next/link'
import { getArticleBySlug } from '../../../../lib/articles'
import { marked } from 'marked'

const categoryNames = {
  'policy': '权威资讯',
  'training': '安全教育培训',
  'tools': '实用工具', 
  'cases': '事故案例',
  'community': '社区交流'
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.category, params.slug)
  const categoryName = categoryNames[params.category] || '未知分类'

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">文章不存在</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline mr-4">首页</Link>
        <span className="text-gray-400">→</span>
        <Link href={`/category/${params.category}`} className="text-blue-600 hover:underline mx-4">
          {categoryName}
        </Link>
        <span className="text-gray-400">→</span>
        <span className="text-gray-600 ml-4">{article.title}</span>
      </div>

      <article className="bg-white rounded-lg shadow-md p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
          <div className="text-gray-500 text-sm flex items-center space-x-4">
            <span>发布时间: {article.date}</span>
            <span>分类: {categoryName}</span>
          </div>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(article.content) }}
        />
      </article>
    </div>
  )
}

// ================================
