import { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage({ onNavigate }) {
  const { admin, logout } = useAuth()
  const [adminApp, setAdminApp] = useState(null)
  const barRef = useRef(null)
  const donutRef = useRef(null)

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
      if (href.includes('dashboard') || href === '') {
        l.classList.add('active')
      }
    })

    return () => {
      if (toggleBtn) toggleBtn.removeEventListener('click', handleToggle)
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Initialize charts using React refs - guaranteed DOM is ready
  useEffect(() => {
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded')
      return
    }

    // Destroy old charts if they exist
    if (window.barChartInstance) {
      window.barChartInstance.destroy()
    }
    if (window.donutChartInstance) {
      window.donutChartInstance.destroy()
    }

    // Initialize Bar Chart
    if (barRef.current) {
      window.barChartInstance = new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Videos',
              data: [420, 560, 380, 200, 300, 280],
              backgroundColor: '#3945eb',
              borderColor: '#3945eb',
              borderWidth: 1,
              borderRadius: 8,
              barPercentage: 0.7,
            },
            {
              label: 'Audios',
              data: [42, 38, 35, 80, 90, 100],
              backgroundColor: '#00305c',
              borderColor: '#00305c',
              borderWidth: 1,
              borderRadius: 8,
              barPercentage: 0.7,
            },
          ],
        },
        options: {
          indexAxis: 'x',
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' },
          },
          scales: {
            x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            y: { grid: { display: false } },
          },
        },
      })
    }

    // Initialize Donut Chart
    if (donutRef.current) {
      window.donutChartInstance = new Chart(donutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Active Users', 'Inactive', 'Pending'],
          datasets: [
            {
              data: [65, 25, 10],
              backgroundColor: ['#39ab71', '#00305c', '#d4a5b4'],
              borderColor: '#ffffff',
              borderWidth: 3,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', padding: 20 },
            tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' },
          },
        },
      })
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
              <span>Dashboard</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="dropdown">
                <a className="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  <div className="avatar">{admin?.full_name?.charAt(0)?.toUpperCase() || 'A'}</div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <main className="container-fluid">
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #ff3570, #871835)' }}>
                <div>
                  <h6>Total User</h6>
                  <h3>1,248</h3>
                  <p className="small muted mt-2 mb-0">↑ 12% from last month</p>
                </div>
                <div className="icon-box">
                  <i className="bi bi-person"></i>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg,#00305c,#004a8a)' }}>
                <div>
                  <h6>Total Videos</h6>
                  <h3>342</h3>
                  <p className="small muted mt-2 mb-0">↑ 8% from last month</p>
                </div>
                <div className="icon-box">
                  <i className="bi bi-camera-video"></i>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #39ab71, #21651d)' }}>
                <div>
                  <h6>Active Audio</h6>
                  <h3>200</h3>
                  <p className="small muted mt-2 mb-0">↑ 24% from last month</p>
                </div>
                <div className="icon-box">
                  <i className="bi bi-speaker"></i>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #FF5722, #9f3b00)' }}>
                <div>
                  <h6>Total Revenue</h6>
                  <h3>$567K</h3>
                  <p className="small muted mt-2 mb-0">↑ 5% from last month</p>
                </div>
                <div className="icon-box">
                  <i className="bi bi-credit-card"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Overview video/audio</h5>
                  <div style={{ height: '320px' }}>
                    <canvas ref={barRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">User Status</h5>
                  <div style={{ height: '320px' }}>
                    <canvas ref={donutRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">User List</h5>
                </div>
                <div className="card-body">
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
          </div>
        </main>
      </div>
    </div>
  )
}
