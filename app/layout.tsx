import type { ReactNode } from 'react';
import './globals.css'

export const metadata = {
  title: '安全技术研究院',
  description: '聚合权威资讯·实用工具·最新资讯·一站式服务',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center">安全技术研究院</h1>
            <p className="text-center mt-2 text-blue-100">聚合权威资讯·实用工具·最新资讯·一站式服务</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-6 mt-12">
          <p>&copy; 2024 安全技术研究院 - 致力于安全生产知识传播</p>
        </footer>
      </body>
    </html>
  )
}

// ================================