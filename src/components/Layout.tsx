import { ReactNode, useState, useEffect } from 'react'
import Navigation from './Navigation'
import { NavigationItem } from '../App'

interface LayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
}

function Layout({ children, navigation }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Check for system preference on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  // Update HTML data-theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <Navigation items={navigation} mobile={true} />
            </ul>
          </div>
          <a className="text-xl font-bold normal-case">Markdown-Driven Site</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Navigation items={navigation} mobile={false} />
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>© {new Date().getFullYear()} - Built with React, Markdown & Daisy UI</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout