import { useNavigate } from 'react-router-dom'

export default function Header({ onToggleSidebar, title }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <header>
      <div className="header-inner">
        <div className="page-title d-flex align-items-center">
          <button
            id="toggleBtn"
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={onToggleSidebar}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-list"></i>
          </button>
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <a
              className="d-flex align-items-center text-decoration-none dropdown-toggle"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                const menu = document.querySelector('.dropdown-menu')
                menu?.classList.toggle('show')
              }}
            >
              <div className="avatar">A</div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
