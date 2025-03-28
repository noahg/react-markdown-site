import { useEffect } from 'react'
import MarkdownRenderer from '../components/MarkdownRenderer'

interface ContentPageProps {
  path: string;
  title: string;
}

function ContentPage({ path, title }: ContentPageProps) {
  // Update document title when page changes
  useEffect(() => {
    document.title = `${title} | Markdown-Driven Site`
  }, [title])

  return (
    <div>
      <MarkdownRenderer path={path} />
    </div>
  )
}

export default ContentPage