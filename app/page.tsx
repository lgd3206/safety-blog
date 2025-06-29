import Link from 'next/link'
import { getArticlesByCategory } from '../lib/articles'

export default function Home() {
  const categories = [
    { 
      id: 'policy', 
      name: '权威资讯', 
      icon: '📰',
      description: '应急管理部官网、国家安全生产监督管理总局、中国安全生产网、搜狐安全频道'
    },
    { 
      id: 'training', 
      name: '安全教育培训', 
      icon: '🎓',
      description: '中国大学MOOC、网易云课堂、安全生产教育网、学堂在线'
    },
    { 
      id: 'tools', 
      name: '实用工具', 
      icon: '🔧',
      description: '应急预案模板、隐患排查下载、风险评估工具、安全标志下载'
    },
    { 
      id: 'cases', 
      name: '事故案例', 
      icon: '⚠️',
      description: '典型事故分析、事故案例库、事故警示视频'
    },
    { 
      id: 'community', 
      name: '社区交流', 
      icon: '💬',
      description: '知乎安全生产话题、应急管理部论坛、安全生产论坛'
    }
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">欢迎来到安全技术研究院</h2>
        <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="搜索你想要的资源..." 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3 flex items-center text-gray-800">
              <span className="mr-3 text-2xl">{category.icon}</span>
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {category.description}
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-500">最新文章:</div>
              <div className="text-sm text-gray-400">暂无文章，请添加内容</div>
            </div>
            <Link 
              href={`/category/${category.id}`} 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
            >
              查看更多 →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-bold mb-4 text-center">关于我们</h3>
        <p className="text-gray-600 text-center leading-relaxed">
          安全技术研究院致力于整合安全生产相关的权威资讯、实用工具和最新资讯，
          为安全从业者提供一站式的信息服务平台。我们同步公众号最新文章，
          让您随时掌握安全生产领域的动态和知识。
        </p>
      </div>
    </div>
  )
}

// ================================