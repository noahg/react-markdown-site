import { ReactNode } from 'react'
import Navigation from './Navigation'
import { NavigationItem } from '../App'
import './Layout.css'

interface LayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
}

function Layout({ children, navigation }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Markdown-Driven Site</h1>
        <Navigation items={navigation} />
      </header>
      
      <main className="main">
        {children}
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} - Built with React & Markdown</p>
      </footer>
    </div>
  )
}

export default Layout