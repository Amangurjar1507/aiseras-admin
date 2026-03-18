import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UserList from './pages/UserList'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    setCurrentPage('dashboard')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (currentPage === 'users') {
    return <UserList onLogout={handleLogout} onNavigate={setCurrentPage} />
  }

  return <Dashboard onLogout={handleLogout} onNavigate={setCurrentPage} />
}

export default App
