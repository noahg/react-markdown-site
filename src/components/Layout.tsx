// src/components/Layout.tsx
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

  // Check for system preference on initial load
  useEffect(() => {
    // Check for saved theme preference
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

  // Cycle through themes: light -> dark -> cupcake -> light
  const cycleTheme = () => {
    const themeOrder: ThemeType[] = ['light', 'dark', 'caramellatte'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  }

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'caramellatte':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
    }
  };

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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              {getThemeIcon()}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => setTheme('light')} className={theme === 'light' ? 'active' : ''}>Light</a></li>
              <li><a onClick={() => setTheme('dark')} className={theme === 'dark' ? 'active' : ''}>Dark</a></li>
              <li><a onClick={() => setTheme('caramellatte')} className={theme === 'caramellatte' ? 'active' : ''}>Sepia</a></li>
            </ul>
          </div>
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