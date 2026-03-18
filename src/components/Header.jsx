export default function Header({ title, onNavigate }) {
  return (
    <header>
      <div className="header-inner">
        <div className="page-title d-flex align-items-center">
          <button id="toggleBtn" className="btn btn-sm btn-outline-secondary me-2">
            <i className="bi bi-list"></i>
          </button>
          <span>{title}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <a className="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <div className="avatar">A</div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#" onClick={() => onNavigate('login')}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
