import { useEffect, useState } from 'react'

export default function UserListPage({ onNavigate }) {
  const [adminApp, setAdminApp] = useState(null)

  useEffect(() => {
    const app = document.querySelector('.admin-app')
    setAdminApp(app)

    const toggleBtn = document.getElementById('toggleBtn')
    const sidebar = document.getElementById('sidebar')

    const handleToggle = () => {
      if (window.innerWidth >= 992) {
        const hidden = app.classList.toggle('sidebar-hidden')
        try {
          localStorage.setItem('cv_admin_sidebar_hidden', hidden ? '1' : '0')
        } catch (e) {}
        document.body.style.overflowX = hidden ? 'hidden' : ''
      } else {
        app.classList.toggle('sidebar-open')
        document.body.classList.toggle('admin-overlay')
      }
    }

    const handleClickOutside = (e) => {
      if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && app.classList.contains('sidebar-open')) {
          app.classList.remove('sidebar-open')
          document.body.classList.remove('admin-overlay')
        }
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        app.classList.remove('sidebar-open')
        document.body.classList.remove('admin-overlay')
      }
    }

    if (toggleBtn) toggleBtn.addEventListener('click', handleToggle)
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', handleResize)

    // Mark active link
    const links = document.querySelectorAll('.sidebar .nav-link')
    links.forEach((l) => {
      l.classList.remove('active')
      const href = (l.getAttribute('href') || '').split('?')[0].toLowerCase()
      if (href.includes('users') || href.includes('user-list')) {
        l.classList.add('active')
      }
    })

    return () => {
      if (toggleBtn) toggleBtn.removeEventListener('click', handleToggle)
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="admin-app">
      <aside id="sidebar" className="sidebar">
        <div className="p-3 sidebar-header d-flex align-items-center gap-2">
          <div className="fw-bold ms-2">Admin</div>
        </div>
        <nav className="p-3">
          <a href="?page=dashboard" className="nav-link d-flex align-items-center">
            <i className="bi bi-speedometer2"></i>
            <span className="nav-text">Dashboard</span>
          </a>
          <a href="?page=users" className="nav-link d-flex align-items-center">
            <i className="bi bi-person"></i>
            <span className="nav-text">User List</span>
          </a>
          <a href="?page=login" className="nav-link d-flex align-items-center">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="nav-text">Log Out</span>
          </a>
        </nav>
      </aside>
      <div className="content">
        <header>
          <div className="header-inner">
            <div className="page-title d-flex align-items-center">
              <button id="toggleBtn" className="btn btn-sm btn-outline-secondary me-2">
                <i className="bi bi-list"></i>
              </button>
              <span>User List</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="dropdown">
                <a className="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  <div className="avatar">A</div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?page=login">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">User List</h5>
                </div>
                <div className="table-responsive">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Videos</th>
                        <th>Audios</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Jane Doe</td>
                        <td>jane@example.com</td>
                        <td>12</td>
                        <td>10</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>John Smith</td>
                        <td>john@example.com</td>
                        <td>8</td>
                        <td>12</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Priya Kumar</td>
                        <td>priya@example.com</td>
                        <td>15</td>
                        <td>7</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Aarav Patel</td>
                        <td>aarav@example.com</td>
                        <td>10</td>
                        <td>9</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Sofia Lee</td>
                        <td>sofia@example.com</td>
                        <td>20</td>
                        <td>8</td>
                        <td>
                          <span className="status-active">Active</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Mohit Singh</td>
                        <td>mohit@example.com</td>
                        <td>5</td>
                        <td>4</td>
                        <td>
                          <span className="status-block">Inactive</span>
                        </td>
                        <td>
                          <a href="#" className="btn btn-sm btn-success">
                            <i className="bi bi-pencil"></i>
                          </a>{' '}
                          <a href="#" className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
