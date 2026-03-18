import { useEffect, useRef, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard({ onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentPage = 'dashboard'

  const handleNavigate = (page) => {
    if (page === 'logout') {
      onLogout()
    } else {
      onNavigate(page)
    }
  }

  const barChartData = {
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
  }

  const barChartOptions = {
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
  }

  const donutChartData = {
    labels: ['Active Users', 'Inactive', 'Pending'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#39ab71', '#00305c', '#d4a5b4'],
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  }

  const donutChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', padding: 20 },
      tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' },
    },
  }

  const users = [
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', videos: 12, audios: 10, status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@example.com', videos: 8, audios: 12, status: 'Active' },
    { id: 3, name: 'Priya Kumar', email: 'priya@example.com', videos: 15, audios: 7, status: 'Active' },
    { id: 4, name: 'Aarav Patel', email: 'aarav@example.com', videos: 10, audios: 9, status: 'Active' },
    { id: 5, name: 'Sofia Lee', email: 'sofia@example.com', videos: 20, audios: 8, status: 'Active' },
    { id: 6, name: 'Mohit Singh', email: 'mohit@example.com', videos: 5, audios: 4, status: 'Inactive' },
  ]

  return (
    <div className={`admin-app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="content">
        <Header
          title="Dashboard"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
        />
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
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #00305c, #004a8a)' }}>
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
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">User Status</h5>
                  <div style={{ height: '320px' }}>
                    <Doughnut data={donutChartData} options={donutChartOptions} />
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
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.videos}</td>
                            <td>{user.audios}</td>
                            <td>
                              <span className={`status-${user.status.toLowerCase()}`}>
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <a href="#" className="btn btn-sm btn-success">
                                <i className="bi bi-pencil"></i>
                              </a>
                              {' '}
                              <a href="#" className="btn btn-sm btn-danger">
                                <i className="bi bi-trash"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
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
