import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'
import { useUsers } from '../hooks/useUsers'

export default function UserListPage({ onNavigate }) {
  const { admin, logout } = useAuth()
  const { users, total, loading: usersLoading } = useUsers(0, 50)
  const [adminApp, setAdminApp] = useState(null)

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })

    if (result.isConfirmed) {
      logout()
      onNavigate('login')
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        timer: 1500,
        timerProgressBar: true,
      })
    }
  }

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
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="nav-link d-flex align-items-center">
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
                  <div className="avatar">{admin?.full_name?.charAt(0)?.toUpperCase() || 'A'}</div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
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
                      {usersLoading ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) : users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.full_name || 'N/A'}</td>
                            <td>{user.email}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>
                              <span className={user.is_email_verified ? 'status-active' : 'status-block'}>
                                {user.is_email_verified ? 'Verified' : 'Not Verified'}
                              </span>
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            No users found
                          </td>
                        </tr>
                      )}
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
