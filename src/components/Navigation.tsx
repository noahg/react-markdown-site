import { NavLink } from 'react-router-dom'
import { NavigationItem } from '../App'
import './Navigation.css'

interface NavigationProps {
  items: NavigationItem[];
}

function Navigation({ items }: NavigationProps) {
  return (
    <nav className="navigation">
      <ul className="avList">
        {items.map((item) => (
          <li key={item.path} className="navItem">
            <NavLink 
              to={item.path}
              className={({ isActive }) => 
                isActive ? `${"navLink"} ${"active"}` : "navLink"
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation