import { useState } from 'react'

export default function Header({ title, onToggleSidebar, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      <div className="header-inner">
        <div className="page-title d-flex align-items-center">
          <button
            id="toggleBtn"
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={onToggleSidebar}
          >
            <i className="bi bi-list"></i>
          </button>
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <a
              className="d-flex align-items-center text-decoration-none"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setDropdownOpen(!dropdownOpen)
              }}
            >
              <div className="avatar">A</div>
            </a>
            {dropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end" style={{ display: 'block', position: 'absolute', right: 0, top: '100%' }}>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      onLogout()
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
