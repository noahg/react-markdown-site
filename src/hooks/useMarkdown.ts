import { useState, useEffect } from 'react'

export function useMarkdown(path: string) {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadMarkdown() {
      try {
        setIsLoading(true)
        const response = await fetch(`/content/pages/${path}.md`)
        
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`)
        }
        
        const text = await response.text()
        setContent(text)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
        setContent('')
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkdown()
  }, [path])

  return { content, isLoading, error }
}