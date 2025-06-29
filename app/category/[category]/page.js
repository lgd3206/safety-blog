import Link from 'next/link'
import { getArticlesByCategory } from '../../../lib/articles'

const categoryNames = {
  'policy': '权威资讯',
  'training': '安全教育培训', 
  'tools': '实用工具',
  'cases': '事故案例',
  'community': '社区交流'
}

export default function CategoryPage({ params }) {
  const articles = getArticlesByCategory(params.category)
  const categoryName = categoryNames[params.category] || '未知分类'

  return (
    <div>
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 返回首页
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">暂无文章</p>
          <p className="text-gray-400 mt-2">请添加一些内容到 content/{params.category}/ 文件夹中</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map(article => (
            <article key={article.slug} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">
                <Link 
                  href={`/category/${params.category}/${article.slug}`}
                  className="text-gray-800 hover:text-blue-600 transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <div className="text-gray-500 text-sm mb-3">
                发布时间: {article.date}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {article.summary || article.content?.substring(0, 150) + '...'}
              </p>
              <Link 
                href={`/category/${params.category}/${article.slug}`}
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                阅读全文 →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

// ================================