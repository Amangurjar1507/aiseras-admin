import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import UserTable from '../components/UserTable'

export default function UserList() {
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

  return (
    <div className={`admin-app ${isSidebarOpen ? 'sidebar-open' : ''} ${sidebarHidden ? 'sidebar-hidden' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <Header onToggleSidebar={handleToggleSidebar} title="User List" />
        <main className="container-fluid">
          <div className="row g-3 mb-3">
            <div className="col-12">
              <div className="page-section">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">User List</h5>
                    </div>
                    <UserTable />
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
