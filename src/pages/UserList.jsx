import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import UserTable from '../components/UserTable'
import '../styles/Dashboard.css'

export default function UserList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false)

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
