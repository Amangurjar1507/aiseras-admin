import { useEffect, useState } from 'react'

export default function Sidebar({ onNavigate, currentPage }) {
  const [adminApp, setAdminApp] = useState(null)

  useEffect(() => {
    // Get reference to admin-app div
    const el = document.querySelector('.admin-app')
    setAdminApp(el)

    if (!el) return

    const toggleBtn = document.getElementById('toggleBtn')
    if (!toggleBtn) return

    const handleToggle = () => {
      if (window.innerWidth >= 992) {
        const hidden = el.classList.toggle('sidebar-hidden')
        try {
          localStorage.setItem('cv_admin_sidebar_hidden', hidden ? '1' : '0')
        } catch (e) { }
        document.body.style.overflowX = hidden ? 'hidden' : ''
      } else {
        el.classList.toggle('sidebar-open')
        document.body.classList.toggle('admin-overlay')
      }
    }

    toggleBtn.addEventListener('click', handleToggle)

    // Close sidebar on outside click
    const handleDocClick = (e) => {
      if (window.innerWidth < 992) {
        const sidebar = document.getElementById('sidebar')
        if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target) && el.classList.contains('sidebar-open')) {
          el.classList.remove('sidebar-open')
          document.body.classList.remove('admin-overlay')
        }
      }
    }

    document.addEventListener('click', handleDocClick)

    // Restore sidebar state
    try {
      const val = localStorage.getItem('cv_admin_sidebar_hidden')
      if (val === '1') {
        el.classList.add('sidebar-hidden')
        document.body.style.overflowX = 'hidden'
      }
    } catch (e) { }

    return () => {
      toggleBtn.removeEventListener('click', handleToggle)
      document.removeEventListener('click', handleDocClick)
    }
  }, [])

  const navItems = [
    { href: '#admin-dashboard', icon: 'bi-speedometer2', label: 'Dashboard', page: 'admin-dashboard' },
    { href: '#user-list', icon: 'bi-person', label: 'User List', page: 'user-list' },
    { href: '#login', icon: 'bi-box-arrow-in-right', label: 'Log Out', page: 'login' }
  ]

  return (
    <aside id="sidebar" className="sidebar">
      <div className="p-3 sidebar-header d-flex align-items-center gap-2">
        <div className="fw-bold ms-2">Admin</div>
      </div>
      <nav className="p-3">
        {navItems.map((item) => (
          <a
            key={item.page}
            href={item.href}
            onClick={() => onNavigate(item.page)}
            className={`nav-link d-flex align-items-center ${currentPage === item.page ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="nav-text">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
