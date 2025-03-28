import ReactMarkdown from 'react-markdown'
import { useMarkdown } from '../hooks/useMarkdown'
import './MarkdownRenderer.css'

interface MarkdownRendererProps {
  path: string;
}

function MarkdownRenderer({ path }: MarkdownRendererProps) {
  const { content, isLoading, error } = useMarkdown(path)

  if (isLoading) {
    return <div className="loading">Loading content...</div>
  }

  if (error) {
    return <div className="error">Error loading content: {error.message}</div>
  }

  return (
    <div className="markdownContainer">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer