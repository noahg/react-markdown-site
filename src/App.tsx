import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ContentPage from './routes/ContentPage'

// Navigation structure type
export type NavigationItem = {
  title: string;
  path: string;
}

function App() {
  const [navigation, setNavigation] = useState<NavigationItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load the site structure from JSON
    fetch('/content/site-structure.json')
      .then(response => response.json())
      .then(data => {
        setNavigation(data.navigation)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error loading navigation:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading site structure...</div>
  }

  return (
    <Layout navigation={navigation}>
      <Routes>
        {/* Create routes based on navigation items */}
        {navigation.map(item => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <ContentPage 
                path={item.path.replace('/', '') || 'home'} 
                title={item.title} 
              />
            }
          />
        ))}
        
        {/* Default redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App