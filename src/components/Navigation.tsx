import { NavLink } from 'react-router-dom'
import { NavigationItem } from '../App'

interface NavigationProps {
  items: NavigationItem[];
  mobile: boolean;
}

function Navigation({ items, mobile }: NavigationProps) {
  return (
    <>
      {items.map((item) => (
        <li key={item.path}>
          <NavLink 
            to={item.path}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default Navigation