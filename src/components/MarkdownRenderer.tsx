import ReactMarkdown from 'react-markdown'
import { useMarkdown } from '../hooks/useMarkdown'

interface MarkdownRendererProps {
  path: string;
}

function MarkdownRenderer({ path }: MarkdownRendererProps) {
  const { content, isLoading, error } = useMarkdown(path)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading content: {error.message}</span>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="markdown-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default MarkdownRenderer