import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/Sidebar.css'

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/user-list', label: 'User List', icon: 'bi-person' },
    { path: '/', label: 'Log Out', icon: 'bi-box-arrow-in-right' }
  ]

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <aside className="sidebar">
      <div className="p-3 sidebar-header d-flex align-items-center gap-2">
        <div className="fw-bold ms-2">Admin</div>
      </div>
      <nav className="p-3">
        {navLinks.map((link) => (
          <a
            key={link.path}
            onClick={() => handleNavigate(link.path)}
            className={`nav-link d-flex align-items-center ${
              location.pathname === link.path ? 'active' : ''
            }`}
            style={{ cursor: 'pointer' }}
          >
            <i className={`bi ${link.icon}`}></i>
            <span className="nav-text">{link.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
