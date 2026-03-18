import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatBox from '../components/StatBox'
import Chart from '../components/Chart'
import UserTable from '../components/UserTable'

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cv_admin_sidebar_hidden')
    if (saved === '1') {
      setSidebarHidden(true)
    }
  }, [])

  useEffect(() => {
    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (e) => {
      if (window.innerWidth < 992) {
        const sidebar = document.getElementById('sidebar')
        const toggleBtn = document.getElementById('toggleBtn')
        if (sidebar && toggleBtn && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          if (isSidebarOpen) {
            setIsSidebarOpen(false)
          }
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isSidebarOpen])

  const handleToggleSidebar = () => {
    if (window.innerWidth >= 992) {
      const newState = !sidebarHidden
      setSidebarHidden(newState)
      localStorage.setItem('cv_admin_sidebar_hidden', newState ? '1' : '0')
    } else {
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  const stats = [
    {
      title: 'Total User',
      value: '1,248',
      change: '↑ 12% from last month',
      icon: 'bi-person',
      background: 'linear-gradient(135deg, #ff3570, #871835)'
    },
    {
      title: 'Total Videos',
      value: '342',
      change: '↑ 8% from last month',
      icon: 'bi-camera-video',
      background: 'linear-gradient(135deg,#00305c,#004a8a)'
    },
    {
      title: 'Active Audio',
      value: '200',
      change: '↑ 24% from last month',
      icon: 'bi-speaker',
      background: 'linear-gradient(135deg, #39ab71, #21651d)'
    },
    {
      title: 'Total Revenue',
      value: '$567K',
      change: '↑ 5% from last month',
      icon: 'bi-credit-card',
      background: 'linear-gradient(135deg, #FF5722, #9f3b00)'
    }
  ]

  return (
    <div className={`admin-app ${isSidebarOpen ? 'sidebar-open' : ''} ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <Header onToggleSidebar={handleToggleSidebar} title="Dashboard" />
        <main className="container-fluid">
          {/* Stats Grid */}
          <div className="row g-3 mb-3">
            {stats.map((stat, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <StatBox {...stat} />
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Overview video/audio</h5>
                  <div style={{ height: '320px' }}>
                    <Chart type="bar" id="barChart" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">User Status</h5>
                  <div style={{ height: '320px' }}>
                    <Chart type="donut" id="donutChart" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Table Section */}
          <div className="row g-3 mb-3">
            <div className="col-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">User List</h5>
                </div>
                <div className="card-body">
                  <UserTable />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
