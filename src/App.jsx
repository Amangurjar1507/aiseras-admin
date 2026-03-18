import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UserListPage from './pages/UserListPage'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const page = new URLSearchParams(window.location.search).get('page') || 'dashboard'
    return page
  })

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.history.replaceState(null, '', `?page=${page}`)
  }

  return (
    <>
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
      {currentPage === 'users' && <UserListPage onNavigate={handleNavigate} />}
    </>
  )
}

export default App
