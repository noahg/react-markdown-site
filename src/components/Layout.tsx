import { ReactNode, useState, useEffect } from 'react'
import Navigation from './Navigation'
import { NavigationItem } from '../App'

interface LayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
}

type ThemeType = 'light' | 'dark' | 'caramellatte';

function Layout({ children, navigation }: LayoutProps) {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && ['light', 'dark', 'caramellatte'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, [])

  // Update HTML data-theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme])

  const getThemeIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* Top navbar - always full width */}
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <button 
            className="btn btn-ghost lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <span className="text-xl font-bold normal-case">My Markdown React Site</span>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              {getThemeIcon()}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => setTheme('light')} className={theme === 'light' ? 'active' : ''}>Light</a></li>
              <li><a onClick={() => setTheme('dark')} className={theme === 'dark' ? 'active' : ''}>Dark</a></li>
              <li><a onClick={() => setTheme('caramellatte')} className={theme === 'caramellatte' ? 'active' : ''}>Paper</a></li>
            </ul>
          </div>
        </div>
      </div>

 {/* Content area with sidebar and main content */}
 <div className="flex flex-1 relative">
        {/* Sidebar - overlay on mobile, fixed on desktop */}
        <aside className={`
          bg-base-200 w-64 transition-all duration-300 ease-in-out overflow-y-auto
          shadow-lg z-20
          lg:relative lg:translate-x-0 lg:min-h-full lg:h-auto
          fixed left-0 top-0 h-full pt-16
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 h-full">
            <ul className="menu p-4 rounded-box">
              <Navigation items={navigation} mobile={false} />
            </ul>
          </div>
        </aside>
        
        {/* Overlay backdrop when sidebar is open on mobile */}
        <div 
          className={`fixed inset-0 bg-gary bg-opacity-50 z-10 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>


        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>© {new Date().getFullYear()} - Nobody</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout