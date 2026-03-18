import { useEffect } from 'react'

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  useEffect(() => {
    const markActive = () => {
      const links = document.querySelectorAll('.sidebar .nav-link')
      links.forEach(link => {
        if (link.dataset.page === currentPage) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      })
    }

    markActive()
  }, [currentPage])

  return (
    <aside id="sidebar" className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header p-3 d-flex align-items-center gap-2">
        <div className="fw-bold ms-2">Admin</div>
      </div>
      <nav className="p-3">
        <button
          className="nav-link d-flex align-items-center"
          data-page="dashboard"
          onClick={() => {
            onNavigate('dashboard')
            onClose()
          }}
        >
          <i className="bi bi-speedometer2"></i>
          <span className="nav-text">Dashboard</span>
        </button>
        <button
          className="nav-link d-flex align-items-center"
          data-page="users"
          onClick={() => {
            onNavigate('users')
            onClose()
          }}
        >
          <i className="bi bi-person"></i>
          <span className="nav-text">User List</span>
        </button>
        <button
          className="nav-link d-flex align-items-center"
          onClick={() => {
            onNavigate('logout')
            onClose()
          }}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="nav-text">Log Out</span>
        </button>
      </nav>
    </aside>
  )
}
