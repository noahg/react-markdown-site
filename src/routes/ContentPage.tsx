import { useEffect } from 'react'
import MarkdownRenderer from '../components/MarkdownRenderer'

interface ContentPageProps {
  path: string;
  title: string;
}

function ContentPage({ path, title }: ContentPageProps) {
  // Update document title when page changes
  useEffect(() => {
    document.title = `${title} | React Markdown Site`
  }, [title])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <MarkdownRenderer path={path} />
    </div>
  )
}

export default ContentPage