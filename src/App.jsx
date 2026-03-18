import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import UserList from './pages/UserList'

export default function App() {
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    // Simple routing based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'login'
      setCurrentPage(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (page) => {
    window.location.hash = page
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'login' && <LoginPage onNavigate={navigate} />}
      {currentPage === 'admin-dashboard' && <AdminDashboard onNavigate={navigate} />}
      {currentPage === 'user-list' && <UserList onNavigate={navigate} />}
    </>
  )
}
